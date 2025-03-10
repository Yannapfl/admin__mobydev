import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../utils/api";

const ProjectsContext = createContext();

export const ProjectsProvider = ({ children }) => {
    const [projects, setProjects] = useState([]);
    

    const fetchData = async () => {
      try {
        const response = await api.get('movies');
        console.log("Ответ от сервера:", response.data.result); 
        setProjects(response.data.result)
      } catch (error) {
        console.error( 'Ошибка загрузки проекта', error)
      }
    }

    useEffect(() => {
      fetchData();
    }, [])

    const getProjectData = async (projectId) => {
        try {
          const mainInfoResponse = await api.get(`movies/${projectId}`);
          const mainInfoData = await mainInfoResponse.data.result;
          return((prev) => ({
            ...prev,
            movieId: mainInfoData.movieId,
            title: mainInfoData.title,
            categories: mainInfoData.categories,
            ageCategories: mainInfoData.ageCategories,
            genres: mainInfoData.genres,
            releaseYear: mainInfoData.releaseYear,
            duration: mainInfoData.duration,
            keywords: mainInfoData.keyWords,
            description: mainInfoData.description,
            director: mainInfoData.director,
            producer: mainInfoData.producer,
            createdAt: mainInfoData.createdAt,
            updatedAt: mainInfoData.updatedAt,
            createdBy: mainInfoData.createdBy,
            images: {
              imageSrc: mainInfoData.imageSrc,
              screenshots: mainInfoData.screenshots,
            },
              views: mainInfoData.views,
            video: {  
              seasonCount: mainInfoData.series.seasonCount,
              episodes: mainInfoData.series.series,
            }
          }))

        } catch (error) {
          console.error('Ошибка получения данных проекта', error)
        }
    }    
    
    const createMovie = async (newProject) => {
      try {
          const response = await api.post("/movies", newProject, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          return response.data; 
      } catch (error) {
          console.error("Ошибка при создании проекта:", error);
          throw error;
      }
  };

    const addProject = async (newProject) => {
      try {
        const movie = await createMovie(newProject);
        const movieId = movie.id;

        await api.post(`movies/${movieId}/images`, newProject, { 
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const episodes = JSON.parse(newProject.get("episodes"));

        for (const episode of episodes) {
            const episodeFormData = new FormData();
            episodeFormData.append("link", episode.videoLink);
            await api.post(
                `movies/${movieId}/season/${episode.seasonId}/series/${episode.episode}/videoLink`,
                episodeFormData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );
        }
        
      } catch (error) {
        console.error(`Ошибка добавления проекта`, error);
      }
    };

    const updateProject = async (updatedProject, id) => {
      try {
        await api.patch(`movies/${id}`, updatedProject, { 
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        await fetchData();
        console.log('updatedProject', updatedProject)
      } catch (error) {
        console.error(`Ошибка добавления проекта`, error);
      }
    };

    const removeProject = async (id) => {
      try {
        await api.delete(`movies/${id}`)
        await fetchData();
    } catch (error) {
        console.error('Ошибка удаления проекта', error)
    }
    }
  
    return (
      <ProjectsContext.Provider value={{ projects, getProjectData,  addProject, updateProject, removeProject }}>
        {children}
      </ProjectsContext.Provider>
    );
};
  
export default ProjectsContext;

ProjectsProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
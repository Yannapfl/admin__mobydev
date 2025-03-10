import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../utils/api";

const FeaturedProjectsContext = createContext();

export const FeaturedProjectsProvider = ({ children }) => {
  const [featuredProjects, setFeaturedProjects] = useState([]);

  const fetchData = async () => {
    try {
      const response = await api.get(`movies/main-page`);
      setFeaturedProjects(response.data.result);
    } catch (error) {
      console.error(`Ошибка загрузки проектов на главной`, error);
    }
  };

  useEffect(() => {
    fetchData()
  }, [])

  const addFeaturedProject = async (formData, movieId, order) => {
    console.log('movieId', movieId)
    try {
      await api.post(`movies/${movieId}/main-page`, formData, {
        params: { order },
        headers: { "Content-Type": "multipart/form-data"}
      })
      fetch

    } catch (error) {
      console.error('Ошибка добавление проекта на главную', error)
    }
  };

  const updateFeaturedProjects = (updatedEntity) => {
    if (!updatedEntity?.id) return;
  
    setFeaturedProjects((prev) => {
      const currentProject = prev.find((project) => project.id === updatedEntity.id);
      if (!currentProject) return prev;
  
      const updatedOrder = updatedEntity.order;
      const oldOrder = currentProject.order;
  
      let updatedProjects = prev.map((project) =>
        project.id === updatedEntity.id ? { ...project, ...updatedEntity } : project
      );
  
      return updatedProjects
        .map((project) => {
          if (project.id !== updatedEntity.id) {
            if (oldOrder < updatedOrder) {
              if (project.order > oldOrder && project.order <= updatedOrder) {
                return { ...project, order: project.order - 1 };
              }
            } else if (oldOrder > updatedOrder) {
              if (project.order < oldOrder && project.order >= updatedOrder) {
                return { ...project, order: project.order + 1 };
              }
            }
          }
          return project;
        })
        .sort((a, b) => a.order - b.order);
    });
  };
  
  const removeFeaturedProject = async (projectId) => {
    try {
      await api.delete(`movies/${projectId}/main-page`)
      await fetchData();
  } catch (error) {
      console.error('Ошибка удаления проекта с главной', error)
  }
  };

  return (
    <FeaturedProjectsContext.Provider
      value={{
        featuredProjects,
        addFeaturedProject,
        updateFeaturedProjects,
        removeFeaturedProject,
      }}
    >
      {children}
    </FeaturedProjectsContext.Provider>
  );
};

FeaturedProjectsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FeaturedProjectsContext;

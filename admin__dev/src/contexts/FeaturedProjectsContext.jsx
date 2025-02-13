import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import { mocksFeaturedProjects } from "../mocks/mocksFeaturedProjects";
import DataContext from "./DataContext";

const FeaturedProjectsContext = createContext();

export const FeaturedProjectsProvider = ({ children }) => {
  const [featuredProjects, setFeaturedProjects] = useState(
    mocksFeaturedProjects
  );
  const { data } = useContext(DataContext);

  const addFeaturedProject = (newEntity) => {
    setFeaturedProjects((prev) => {
      const updatedProjects = prev.map((project) =>
        project.order >= newEntity.order
          ? { ...project, order: project.order + 1 }
          : project
      );

      return [...updatedProjects, newEntity].sort((a, b) => a.order - b.order);
    });
  };

  const updateFeaturedProjects = (updatedEntity) => {
    if (!updatedEntity?.id) return;
  
    setFeaturedProjects((prev) => {
      const currentProject = data.projects.find((project) => project.id === updatedEntity.projectId);
      if (!currentProject) return prev;
  
      const updatedOrder = updatedEntity.order;
      const currentOrder = currentProject.order;
  
      let updatedProjects = prev.map((project) =>
        project.id === updatedEntity.id ? { ...project, ...updatedEntity } : project
      );
  
      if (updatedOrder !== currentOrder) {
        updatedProjects = updatedProjects.map((project) => {
          if (updatedOrder > currentOrder) {
            return project.order > currentOrder && project.order <= updatedOrder
              ? { ...project, order: project.order - 1 }
              : project;
          } else {
            return project.order >= updatedOrder && project.order < currentOrder
              ? { ...project, order: project.order + 1 }
              : project;
          }
        });
      }
  
      return updatedProjects.sort((a, b) => a.order - b.order);
    });
  };

  const removeFeaturedProject = (projectId) => {
    setFeaturedProjects((prev) => {
      const updatedProjects = prev
        .filter((project) => project.projectId !== projectId)
        .map((project, index) => ({ ...project, order: index + 1 }));

      return updatedProjects;
    });
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

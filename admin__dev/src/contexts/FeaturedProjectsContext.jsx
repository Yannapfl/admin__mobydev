import { createContext, useState } from "react";
import PropTypes from "prop-types";
import { mocksFeaturedProjects } from "../mocks/mocksFeaturedProjects";

const FeaturedProjectsContext = createContext();

export const FeaturedProjectsProvider = ({ children }) => {
  const [featuredProjects, setFeaturedProjects] = useState(
    mocksFeaturedProjects
  );

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

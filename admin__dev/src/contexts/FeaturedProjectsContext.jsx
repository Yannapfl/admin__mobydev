import { createContext, useState } from "react";
import PropTypes from "prop-types";
import { mocksFeaturedProjects } from "../mocks/mocksFeaturedProjects";

const FeaturedProjectsContext = createContext();

export const FeaturedProjectsProvider = ({ children }) => {
  const [featuredProjects, setFeaturedProjects] = useState(mocksFeaturedProjects);

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
    setFeaturedProjects((prev) => {
      const currentProject = prev.find((project) => project.projectId === updatedEntity.projectId);
      if (!currentProject) return prev;
  
      const updatedOrder = updatedEntity.order;
      const currentOrder = currentProject.order;
  
      let updatedProjects = prev.filter((project) => project.projectId !== updatedEntity.projectId);
  
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
  
      return [...updatedProjects, updatedEntity].sort((a, b) => a.order - b.order);
    });
  };
  

  const removeFeaturedProject = (projectId) => {
    setFeaturedProjects((prev) => prev.filter((featuredProject) => featuredProject.projectId !== projectId));
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

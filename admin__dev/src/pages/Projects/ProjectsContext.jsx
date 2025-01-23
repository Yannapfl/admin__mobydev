import { createContext, useContext, useState } from "react";
import { mocksProjects } from "../../components/CardProjects/mocksProjects";
import PropTypes from "prop-types";

const ProjectsContext = createContext();

export const ProjectsProvider = ({ children }) => {
    const [projects, setProjects] = useState(mocksProjects);
  
    const addProject = (newProject) => {
      setProjects([...projects, { ...newProject, id: projects.length + 1 }]);
    };
  
    return (
      <ProjectsContext.Provider value={{ projects, addProject }}>
        {children}
      </ProjectsContext.Provider>
    );
  };
  
  export const useProjects = () => useContext(ProjectsContext);

  ProjectsProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };
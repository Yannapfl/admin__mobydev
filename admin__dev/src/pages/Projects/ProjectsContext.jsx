import { createContext, useState } from "react";
import { mocksProjects } from "../../components/CardProjects/mocksProjects";
import PropTypes from "prop-types";

const ProjectsContext = createContext();

export const ProjectsProvider = ({ children }) => {
    const [projects, setProjects] = useState(mocksProjects);
  
    const addProject = (newProject) => {
      setProjects([...projects, { ...newProject, id: projects.length + 1 }]);
    };

    const removeProject = (id) => {
      setProjects(projects.filter((project) => project.id !== id))
    }
  
    return (
      <ProjectsContext.Provider value={{ projects, addProject, removeProject }}>
        {children}
      </ProjectsContext.Provider>
    );
};
  
export default ProjectsContext;

ProjectsProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
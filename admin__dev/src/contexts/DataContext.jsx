import { createContext, useState } from "react";
import { mocksGenres } from "../mocks/mocksGenres";
import PropTypes from "prop-types";
import { mocksCategories } from "../mocks/mocksCategories";
import mocksAges from "../mocks/mocksAges";
import { mocksProjects } from "../mocks/mocksProjects";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [data, setData ] = useState({
        projects: mocksProjects,
        genres: mocksGenres,
        ages: mocksAges,
        categories: mocksCategories,
    })

    const addEntity = (type, newEntity) => {
        setData((prev) => ({
          ...prev,
          [type]: [...prev[type], { ...newEntity, id: prev[type].length + 1 }],
        }));
      };
    
      const updateEntity = (type, updatedEntity) => {
        setData((prev) => ({
          ...prev,
          [type]: prev[type].map((entity) =>
            entity.id === updatedEntity.id ? updatedEntity : entity
          ),
        }));
      };
    
      const deleteEntity = (type, id) => {
        setData((prev) => ({
          ...prev,
          [type]: prev[type].filter((entity) => entity.id !== id),
        }));
      };
    

      return (
        <DataContext.Provider value={{ data, addEntity, updateEntity, deleteEntity }} >
            {children}
        </DataContext.Provider>
      )
}


DataProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DataContext;
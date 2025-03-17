import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../utils/api";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState({
    genres: [],
    ages: [],
    categories: [],
  });

  const fetchData = async (type, endpoint) => {
    try {
      const response = await api.get(`${endpoint}`);
      setData((prev) => ({
        ...prev,
        [type]: response.data.result,
      }));
    } catch (error) {
      console.error(`Ошибка загрузки ${type}:`, error);
    }
  };

  useEffect(() => {
    fetchData("ages", "age-category");
    fetchData("genres", "genre");
    fetchData("categories", "category");
  }, []);

  const addEntity = async (type, newEntity, endpoint) => {
    const isFormData = newEntity instanceof FormData;

    try {
      await api.post(`${endpoint}`, newEntity, isFormData ? { headers: { "Content-Type": "multipart/form-data" } } : {});
      const updatedData = await api.get(endpoint);
      setData((prev) => ({
        ...prev,
        [type]: updatedData.data.result,
      }));
      fetchData(type, endpoint);
    } catch (error) {
      console.error(`Ошибка добавления в ${type}:`, error);
      console.log(error.response?.data)
    }
  };

  const updateEntity = async (type, updatedEntity, endpoint) => {  
    const isFormData = updatedEntity instanceof FormData;
    const entityId = isFormData ? updatedEntity.get("id") : updatedEntity.id;
  
    try {
      await api.patch(
        `${endpoint}/${entityId}`,
        updatedEntity,
        isFormData ? { headers: { "Content-Type": "multipart/form-data" } } : {}
      );
  
      const updatedData = await api.get(endpoint);
      setData((prev) => ({
        ...prev,
        [type]: updatedData.data.result,
      }));
      fetchData(type, endpoint)
    } catch (error) {
      console.error(`Ошибка обновления ${type}:`, error);
    }
  };
  
  const deleteEntity = async (type, id, endpoint) => {
    console.log("Удаляем", id);
    try {
      await api.delete(`${endpoint}/${id}`);
      const updatedData = await api.get(endpoint);

      setData((prev) => ({
        ...prev,
        [type]: updatedData.data.result,
      }));
    } catch (error) {
      console.error(`Ошибка удаления из ${type}:`, error);
    }
  };

  return (
    <DataContext.Provider
      value={{ data, addEntity, updateEntity, deleteEntity }}
    >
      {children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DataContext;

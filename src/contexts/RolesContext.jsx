import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../utils/api";

const RolesContext = createContext();

export function RolesProvider({ children }) {
    const [roles, setRoles] = useState([]);

    const fetchData = async () => {
        try {
            const response = await api.get('role');
            setRoles(response.data.result);
            console.log("Загруженные роли:", response.data.result);
        } catch (error) {
            console.error('Ошибка загрузки ролей:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const addRole = async (newRole) => {
        try {
            console.log("Данные перед отправкой:", newRole);
        const response = await api.post('role', newRole);
        console.log("Ответ сервера:", response.data);
        await fetchData();
        } catch (error) {
            console.error('Ошибка добавления роли:', error);
        }
    };

    const updateRole = async (updatedRole) => {
        try {
            await api.patch(`role/${updatedRole.id}`, updatedRole);
            await fetchData();
        } catch (error) {
            console.error('Ошибка обновления роли:', error);
        }
    };

    const removeRole = async (id) => {
        try {
            await api.delete(`role/${id}`);
            await fetchData();
        } catch (error) {
            console.error('Ошибка удаления роли:', error);
        }
    };

    return (
        <RolesContext.Provider value={{ roles, addRole, updateRole, removeRole }}>
            {children}
        </RolesContext.Provider>
    );
}

export default RolesContext;

RolesProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

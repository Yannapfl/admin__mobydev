import { createContext, useState } from "react";

import PropTypes from "prop-types";
import { mocksRoles } from "../mocks/mocksRoles";

const RolesContext = createContext();

export function RolesProvider({ children }) {
    const [roles, setRoles ] = useState(mocksRoles);

    const addRole = (newRole) => {
        setRoles((prevRoles) => ([
          ...prevRoles,
          newRole,
        ]));
      };

    const updateRole = (updatedRole) => {
        setRoles((prevRoles) =>
            prevRoles.map((role) =>
                role.id === updatedRole.id ? updatedRole : role
            )
        );
    }

    const removeRole = (id) => {
        setRoles((prevRoles) => ([
            ...prevRoles.filter((role) => role.id !== id)
        ]))
    }

    return (
        <RolesContext.Provider 
            value={{ roles, addRole, updateRole, removeRole }}
        >
            {children}
        </RolesContext.Provider>
    )
}

export default RolesContext;

RolesProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
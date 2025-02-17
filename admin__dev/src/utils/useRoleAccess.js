import { useContext } from "react";
import { useSelector } from "react-redux";
import RolesContext from "../contexts/RolesContext";

export default function useRoleAccess() {
    const user = useSelector((state) => state.auth.user);
    const { roles } = useContext(RolesContext);

    if (!user || !user.roleId) return { canEdit: () => false, canRead: () => false };

    const userRole = roles.find((r) => r.id === user.roleId);

    const { editAccess, readAccess } = userRole;

    return {
        canEdit: (page) => editAccess.includes(page),
        canRead: (page) => readAccess.includes(page),
    };
}

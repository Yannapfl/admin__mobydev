import { useContext } from "react";
import { useSelector } from "react-redux";
import RolesContext from "../../contexts/RolesContext";

export default function useAccess(section) {
    const user = useSelector((state) => state.auth.user);
    const { roles } = useContext(RolesContext);

    if (!user || !roles[user.role]) {
        return { canEdit: false, canView: false };
    }
    
    const { editAccess, readAccess } = roles[user.role];

    return {
        canEdit: editAccess.includes(section),
        canView: readAccess.includes(section) || editAccess.includes(section),
    };
}
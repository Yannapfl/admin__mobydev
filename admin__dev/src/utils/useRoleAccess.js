import { useSelector } from "react-redux";

export default function useRoleAccess() {
    const user = useSelector((state) => state.auth.user);

    if (!user || !user.role) return { canEdit: () => false, canRead: () => false };

    const { editAccess, readAccess } = user.role;

    return {
        canEdit: (page) => editAccess.includes(page),
        canRead: (page) => readAccess.includes(page),
    };
}

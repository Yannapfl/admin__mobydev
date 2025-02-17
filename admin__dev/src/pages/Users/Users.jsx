import { useState } from "react";
import CardUser from "../../components/CardUser/CardUser";
import DropdownFilter from "../../components/DropdownFilter/DropdownFilter";
import { ModalFactory } from "../../components/Modals/ModalFactory";
import { useModalManager } from "../../components/Modals/useModalManager";
import { mocksDataUsers } from "../../mocks/mocksDataUsers"
import useRoleAccess from "../../utils/useRoleAccess";

const mocksSortFilter = ["По дате регистрации", "По дате рождения", "В алфавитном порядке"];

export default function Users() {
    const users = mocksDataUsers;
    const { modalType, modalProps, openModal, closeModal } = useModalManager();
    const { canEdit } = useRoleAccess();
    const editKey = "users";

    const [selectedSort, setSelectedSort] = useState(mocksSortFilter[0]);

    const handleFilterChange = (value) => {
        setSelectedSort(value);
    };

    const sortedUsers = [...users].sort((a, b) => {
        if (selectedSort === 'По дате регистрации') 
            return new Date(b.dateRegistration) - new Date(a.dateRegistration);
        if (selectedSort === 'По дате рождения') 
            return new Date(b.dateBirth) - new Date(a.dateBirth);
        if (selectedSort === 'В алфавитном порядке') 
            return a.name.localeCompare(b.name);
        return 0;
    });

    return(
        <div className="users">
            <div className="page-header">
                <div className="page-headline">
                    <h1>Пользователи</h1>
                    <p>{users.length}</p>
                </div>
            </div>
            <div className="filters">
                <DropdownFilter
                    label="Сортировать:"
                    options={mocksSortFilter}
                    selectedOption={mocksSortFilter[0]}
                    onSelect={(value) => handleFilterChange(value)}
                />
            </div>
            <div className="users-cards-group">
                {sortedUsers.map((user) => (
                    <div 
                        key={user.id}className="user-card-block"
                        onClick={canEdit(editKey) ? () => openModal('userCard', {user}) : null}
                    >
                        <CardUser user={user} />
                    </div>
                ))}
            </div>
            {modalType && (
                <ModalFactory
                    type={modalType}
                    modalProps={{
                        ...modalProps,
                        closeModal,
                    }}
                 />
            )}
        </div>
    )
}
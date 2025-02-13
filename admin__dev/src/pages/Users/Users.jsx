import CardUser from "../../components/CardUser/CardUser";
import DropdownFilter from "../../components/DropdownFilter/DropdownFilter";
import { ModalFactory } from "../../components/Modals/ModalFactory";
import { useModalManager } from "../../components/Modals/useModalManager";
import { mocksDataUsers } from "../../mocks/mocksDataUsers"
import useRoleAccess from "../../utils/useRoleAccess";

export default function Users() {
    const users = mocksDataUsers;
    const mocksSortFilter = ["По дате регистрации", "По дате рождения", "В алфавитном порядке"];
    const { modalType, modalProps, openModal, closeModal } = useModalManager();
    const { canEdit } = useRoleAccess();
      const editKey = "users";

    const handleFilterChange = (filterName) => {
        console.log(`Выбран фильтр: ${filterName}`);
      };

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
                    onSelect={(selectedOption) => handleFilterChange(selectedOption)}
                />
            </div>
            <div className="users-cards-group">
                {users.map((user) => (
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
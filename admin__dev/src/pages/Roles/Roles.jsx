import { useContext } from "react";
import plus from "../../assets/icons/math-plus.svg";
import CardRole from "../../components/CardRole/CardRole";
import RolesContext from "../../contexts/RolesContext";
import { useModalManager } from "../../components/Modals/useModalManager";
import { ModalFactory } from "../../components/Modals/ModalFactory";
import useRoleAccess from "../../utils/useRoleAccess";

export default function Roles() {
  const { roles, addRole, updateRole, removeRole } = useContext(RolesContext);
  const { modalType, modalProps, openModal, closeModal } = useModalManager();
  const { canEdit } = useRoleAccess();
  const editKey = "roles";

  return (
    <div className="roles">
      <div className="page-header">
        <div className="page-headline">
          <h1>Роли</h1>
          <p>{roles.length}</p>
        </div>
        <button
          disabled={!canEdit(editKey)}
          style={{ opacity: canEdit(editKey) ? 1 : 0.5 }}
          className="btn btn-headline"
          onClick={() => openModal("roleModal", { mode: "add", role: null })}
        >
          <div className="btn-items-headline">
            <img src={plus} alt="plus" />
            <p>Добавить</p>
          </div>
        </button>
      </div>
      <div className="roles-cards-group">
        {roles.map((role) => (
          <CardRole
            role={role}
            key={role.id}
            onEdit={
              canEdit(editKey)
                ? () => openModal("roleModal", { mode: "edit", role })
                : null
            }
            onDelete={
              canEdit(editKey)
                ? () =>
                    openModal("delete", {
                      label: "роль",
                      onConfirm: () => {
                        removeRole(role.id);
                        closeModal();
                      },
                    })
                : null
            }
          />
        ))}
      </div>
      {modalType && (
        <ModalFactory
          type={modalType}
          modalProps={{
            ...modalProps,
            onAdd: (newRole) => {
              addRole(newRole);
              closeModal();
            },
            onUpdate: (updatedRole) => {
              updateRole(updatedRole);
              closeModal();
            },
            onDelete: () => {
              removeRole(modalProps.role?.id);
              closeModal();
            },
            closeModal,
          }}
        />
      )}
    </div>
  );
}

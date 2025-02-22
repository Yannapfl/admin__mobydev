import { useModalManager } from "../../components/Modals/useModalManager";
import DataContext from "../../contexts/DataContext";
import plus from "../../assets/icons/math-plus.svg";
import ContentCard from "../../components/ContentCard/ContentCard";
import { ModalFactory } from "../../components/Modals/ModalFactory";
import { useContext } from "react";
import useRoleAccess from "../../utils/useRoleAccess";

export default function Ages() {
  const { data, addEntity, updateEntity, deleteEntity } =
    useContext(DataContext);
  const { modalType, modalProps, openModal, closeModal } = useModalManager();
  const { canEdit } = useRoleAccess();
  const editKey = "projects";

  const cardsAges = data.ages.map((item) => ({
    ...item,
    label: `${item.label} жас`,
  }));

  return (
    <div className="ages">
      <div className="page-header">
        <div className="page-headline">
          <h1>Возрасты</h1>
          <p>{data.ages.length}</p>
        </div>
        <button
          disabled={!canEdit(editKey)}
          style={{ opacity: canEdit(editKey) ? 1 : 0.5 }}
          className="btn btn-headline"
          onClick={() => openModal("image", { mode: "add", entity: null })}
        >
          <div className="btn-items-headline">
            <img src={plus} alt="plus" />
            <p>Добавить</p>
          </div>
        </button>
      </div>
      <div className="cards-group">
        {cardsAges.map((age) => (
          <ContentCard
            card={age}
            key={age.id}
            onEdit={
              canEdit(editKey)
                ? () => openModal("image", { mode: "edit", entity: age })
                : null
            }
            onDelete={
              canEdit(editKey)
                ? () =>
                    openModal("delete", {
                      label: "возраст",
                      onConfirm: () => {
                        deleteEntity("ages", age.id);
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
            labelPrepositional: "возраста",
            labelGenetive: "возраст",
            title: "возраст",
            onAdd: canEdit(editKey)
              ? (newAge) => {
                  addEntity("ages", newAge);
                  closeModal();
                }
              : null,
            onUpdate: canEdit(editKey)
              ? (updatedAge) => {
                  updateEntity("ages", updatedAge);
                  closeModal();
                }
              : null,
            onDelete: canEdit(editKey)
              ? () => {
                  deleteEntity("ages", modalProps.entity?.id);
                  closeModal();
                }
              : null,
            closeModal,
          }}
        />
      )}
    </div>
  );
}

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
        {data.ages.map((age) => (
          <ContentCard
            card={age}
            key={age.ageCategoryId}
            onEdit={
              canEdit(editKey)
                ? () =>
                    openModal("image", {
                      mode: "edit",
                      entity: age,
                      id: age.ageCategoryId,
                    })
                : null
            }
            onDelete={
              canEdit(editKey)
                ? () =>
                    openModal("delete", {
                      label: "возраст",
                      onConfirm: () => {
                        deleteEntity("ages", age.ageCategoryId, "age-category");
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
                  addEntity("ages", newAge, "age-category");
                  closeModal();
                }
              : null,
            onUpdate: canEdit(editKey)
              ? (updatedAge) => {
                  updateEntity("ages", updatedAge, "age-category");
                  closeModal();
                }
              : null,
            onDelete: canEdit(editKey)
              ? () => {
                  deleteEntity(
                    "ages",
                    modalProps.entity?.ageCategoryId,
                    "age-category"
                  );
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

import { useContext } from "react";
import DataContext from "../../contexts/DataContext";
import { useModalManager } from "../../components/Modals/useModalManager";
import plus from '.././../assets/icons/math-plus.svg';
import ContentCard from "../../components/ContentCard/ContentCard";
import { ModalFactory } from "../../components/Modals/ModalFactory";
import useRoleAccess from "../../utils/useRoleAccess";

export default function Categories() {
  const { data, addEntity, updateEntity, deleteEntity } = useContext(DataContext);
  const { modalType, modalProps, openModal, closeModal } = useModalManager();
  const { canEdit } = useRoleAccess();
  const editKey = "categories";

  return (
    <div className="categories-page">
      <div className="page-header">
        <div className="page-headline">
          <h1>Категории</h1>
          <p>{data.categories.length}</p>
        </div>
        <button 
          disabled={!canEdit(editKey)}
          style={{ opacity: canEdit(editKey) ? 1 : 0.5 }}
          className="btn btn-headline" 
          onClick={() => openModal('text', { mode: 'add', entity: null })}
        >
          <div className="btn-items-headline">
            <img src={plus} alt="plus" />
            <p>Добавить</p>
          </div>
        </button>
      </div>

      <div className="cards-group">
        {data.categories.map((category) => (
          <ContentCard
            card={category}
            key={category.id}
            onEdit={canEdit(editKey) ? () => openModal('text', { mode: 'edit', entity: category }) : null}
            onDelete={canEdit(editKey) ? () => openModal('delete', { 
              label: 'категорию', 
              onConfirm: () => {
                deleteEntity('categories', category.id);
                closeModal();
              } 
            }) : null}
          />
        ))}
      </div>

      {modalType && (
        <ModalFactory
          type={modalType}
          modalProps={{
            ...modalProps,
            labelPrepositional: 'категории',
            labelGenetive: 'категорию',
            title: "категорию",
            onAdd: canEdit(editKey) ? (newCategory) => {
              addEntity('categories', newCategory);
              closeModal();
            } : null,
            onUpdate: canEdit(editKey) ? (updatedCategory) => {
              updateEntity('categories', updatedCategory);
              closeModal();
            } : null,
            onDelete: canEdit(editKey) ? () => {
              deleteEntity('categories', modalProps.entity?.id);
              closeModal();
            } : null,
            closeModal,
          }}
        />
      )}
    </div>
  );
}

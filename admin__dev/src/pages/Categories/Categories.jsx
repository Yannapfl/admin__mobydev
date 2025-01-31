import { useContext } from "react";
import DataContext from "../../contexts/DataContext";
import { useModalManager } from "../../components/Modals/useModalManager";
import plus from '.././../assets/icons/math-plus.svg'
import ContentCard from "../../components/ContentCard/ContentCard";
import { ModalFactory } from "../../components/Modals/ModalFactory";

export default function Categories() {
  const { data, addEntity, updateEntity, deleteEntity } = useContext(DataContext);
  const { modalType, modalProps, openModal, closeModal } = useModalManager();

  return (
    <div className="categories-page">
      <div className="page-header">
              <div className="page-headline">
                <h1>Категории</h1>
                <p>{data.categories.length}</p>
              </div>
              <button className="btn btn-headline" onClick={() => openModal('text', { mode: 'add', entity: null })}>
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
            onEdit={() => openModal('text', { mode: 'edit', entity: category})}
            onDelete={() => openModal('delete', { label: 'категорию', onConfirm: () => {
              deleteEntity('categories', category.id);
              closeModal();
            } })}
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
          onAdd: (newCategory) => {
            addEntity('categories', newCategory);
            closeModal();
          },
          onUpdate: (updatedCategory) => {
            updateEntity('categories', updatedCategory);
            closeModal();
          },
          onDelete: () => {
            deleteEntity('categories', modalProps.entity?.id);
            closeModal();
          },
          closeModal,
          }}
        />
      )}
    </div>
  );
}
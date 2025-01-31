import { useModalManager } from "../../components/Modals/useModalManager";
import DataContext from "../../contexts/DataContext";
import plus from '../../assets/icons/math-plus.svg'
import ContentCard from "../../components/ContentCard/ContentCard";
import { ModalFactory } from "../../components/Modals/ModalFactory";
import { useContext } from "react";


export default function Ages() {
  const { data, addEntity, updateEntity, deleteEntity } = useContext(DataContext);
  const { modalType, modalProps, openModal, closeModal } = useModalManager();

      return (
        <div className="ages">
          <div className="page-header">
            <div className="page-headline">
              <h1>Возрасты</h1>
              <p>{data.ages.length}</p>
            </div>
            <button className="btn btn-headline" onClick={() => openModal('image', { mode: 'add', entity: null})}>
              <div className="btn-items-headline">
                <img src={plus} alt='plus' />
                <p>Добавить</p>
              </div>
            </button>
          </div>
          <div className="cards-group">
            {data.ages.map((age) => (
              <ContentCard
                card={age}
                key={age.id}
                onEdit={() => openModal('image', { mode: 'edit', entity: age})}
                onDelete={() => openModal('delete', { label: 'возраст', onConfirm: () => {
                  deleteEntity('ages', age.id);
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
              labelPrepositional: 'возраста',
              labelGenetive: 'возраст',
              title: 'возраст',
              onAdd: (newAge) => {
                addEntity('ages', newAge);
                closeModal();
              },
              onUpdate: (updatedAge) => {
                updateEntity('ages', updatedAge);
                closeModal();
              },
              onDelete: () => {
                deleteEntity('ages', modalProps.entity?.id);
                closeModal();
              },
              closeModal,
            }}
            />
          )}
        </div>
      );
}
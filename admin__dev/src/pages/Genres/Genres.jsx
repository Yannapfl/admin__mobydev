import { useContext } from "react";
import plus from "../../assets/icons/math-plus.svg";
import ContentCard from "../../components/ContentCard/ContentCard";
import DataContext from "../../contexts/DataContext";
import { ModalFactory } from "../../components/Modals/ModalFactory";
import { useModalManager } from "../../components/Modals/useModalManager";

export default function Genres() {  
  const { data, addEntity, updateEntity, deleteEntity } = useContext(DataContext);
  const { modalType, modalProps, openModal, closeModal } = useModalManager();

  return (
    <div className="genres">
      <div className="page-header">
        <div className="page-headline">
          <h1>Жанры</h1>
          <p>{data.genres.length}</p>
        </div>
        <button className="btn btn-headline" onClick={() => openModal('image', { mode: 'add', entity: null })}>
          <div className="btn-items-headline">
            <img src={plus} alt="plus" />
            <p>Добавить</p>
          </div>
        </button>
      </div>
      <div className="cards-group">
        {data.genres.map((genre) => (
          <ContentCard
            card={genre}
            key={genre.id}
            onEdit={() => openModal('image', { mode: 'edit', entity: genre })}
            onDelete={() => openModal('delete', { label: 'жанр', onConfirm: () => {
              deleteEntity('genres', genre.id);
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
          labelPrepositional: 'жанра',
          labelGenetive: 'жанр',
          title: "жанр",
          onAdd: (newGenre) => {
            addEntity('genres', newGenre);
            closeModal();
          },
          onUpdate: (updatedGenre) => {
            updateEntity('genres', updatedGenre);
            closeModal();
          },
          onDelete: () => {
            deleteEntity('genres', modalProps.entity?.id);
            closeModal();
          },
          closeModal,
        }}
      />
    )}
      
    </div>

  );
}

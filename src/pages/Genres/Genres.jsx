import { useContext } from "react";
import plus from "../../assets/icons/math-plus.svg";
import ContentCard from "../../components/ContentCard/ContentCard";
import DataContext from "../../contexts/DataContext";
import { ModalFactory } from "../../components/Modals/ModalFactory";
import { useModalManager } from "../../components/Modals/useModalManager";
import useRoleAccess from "../../utils/useRoleAccess";

export default function Genres() {
  const { data, addEntity, updateEntity, deleteEntity } =
    useContext(DataContext);
  const { modalType, modalProps, openModal, closeModal } = useModalManager();
  const { canEdit } = useRoleAccess();
  const editKey = "projects";

  console.log('genres', data.genres);

  return (
    <div className="genres">
      <div className="page-header">
        <div className="page-headline">
          <h1>Жанры</h1>
          <p>{data.genres.length}</p>
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
        {data.genres.map((genre) => (
          <ContentCard
            card={genre}
            key={genre.genreId}
            onEdit={
              canEdit(editKey)
                ? () => openModal("image", { mode: "edit", entity: genre, id: genre.genreId, idName: 'genreId' })
                : null
            }
            onDelete={
              canEdit(editKey)
                ? () =>
                    openModal("delete", {
                      label: "жанр",
                      onConfirm: () => {
                        deleteEntity("genres", genre.genreId);
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
            labelPrepositional: "жанра",
            labelGenetive: "жанр",
            title: "жанр",
            onAdd: canEdit(editKey)
              ? (newGenre) => {
                  addEntity("genres", newGenre, 'genre');
                  closeModal();
                }
              : null,
            onUpdate: canEdit(editKey)
              ? (updatedGenre) => {
                  updateEntity("genres", updatedGenre, 'genre');
                  closeModal();
                }
              : null,
            onDelete: canEdit(editKey)
              ? () => {
                  deleteEntity("genres", modalProps.entity?.genreId, 'genre');
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

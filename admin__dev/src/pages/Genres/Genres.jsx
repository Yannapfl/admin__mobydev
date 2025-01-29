import { useState } from "react";
import { mocksGenres } from "./mocksGenres";
import ContentPageFactory from "../../components/ContentPageFactory/ContentPageFactory";
import { useDeleteModal } from "../../components/Modals/ModalDelete/useDeleteModal";
import { ModalDelete } from "../../components/Modals/ModalDelete/ModalDelete";
import { EditAddModal } from "../../components/Modals/EditAddModalText/EditAddModalText";

export default function Genres() {
  const [genres, setGenres] = useState(mocksGenres);
  const [text, setText] = useState("");
  const [editTarget, setEditTarget] = useState(null);
  const { isOpen, target, openModal, closeModal } = useDeleteModal();
  const [isEditAddModalOpen, setEditAddModalOpen] = useState(false);

  const openAddModal = () => {
    setText("");
    setEditAddModalOpen(true);
  };

  const openEditModal = (genre) => {
    setText(genre.label);
    setEditTarget(genre);
    setEditAddModalOpen(true);
  };
  const handleSaveGenre = () => {
    if (!text.trim()) return;

    if (editTarget) {
      setGenres(
        genres.map((g) =>
          g.label === editTarget.label ? { ...g, label: text } : g
        )
      );
    } else {
      setGenres([...genres, { label: text, image: null }]);
    }

    setEditAddModalOpen(false);
    setEditTarget(null);
    setText("");
  };

  const handleDelete = () => {
    setGenres(genres.filter((g) => g.label !== target.label));
    closeModal();
  };

  const genresWithActions = genres.map((genre) => ({
    ...genre,
    actions: [
      { icon: "edit", handler: () => openEditModal(genre) },
      { icon: "delete", handler: () => openModal(genre) },
    ],
  }));

  return (
    <div className="genres">
      <ContentPageFactory
        title="Жанры"
        cardsContent={genresWithActions}
        addModal={openAddModal}
      />

      {isOpen && (
        <ModalDelete
          label="жанр"
          onConfirm={handleDelete}
          closeModal={closeModal}
        />
      )}

      {isEditAddModalOpen && (
        <EditAddModal
          mode={editTarget ? "edit" : "add"}
          labelGenetive="жанр"
          labelPrepositional="жанра"
          text={text}
          setText={setText}
          onSubmit={handleSaveGenre}
          onClose={() => {
            setEditAddModalOpen(false);
            setEditTarget(null);
          }}
        />
      )}
    </div>
  );
}

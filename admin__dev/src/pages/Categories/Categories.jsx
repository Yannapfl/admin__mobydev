import "../../components/Modals/Modals.css";
import { useContext, useState } from "react";
import CategoriesContext from "./CategoriesContext";
import { useDeleteModal } from "../../components/Modals/ModalDelete/useDeleteModal";
import { ModalDelete } from "../../components/Modals/ModalDelete/ModalDelete";
import { EditAddModal } from "../../components/Modals/EditAddModalText/EditAddModalText";
import ContentPageFactory from "../../components/ContentPageFactory/ContentPageFactory";

export default function Categories() {
  const { categories, addCategory, removeCategory, editCategory } = useContext(CategoriesContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [currentCategory, setCurrentCategory] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const { isOpen, target, openModal, closeModal: closeDeleteModal } = useDeleteModal();

  const closeAllModals = () => {
    setIsModalOpen(false);
    closeDeleteModal();
  };

  const openAddModal = () => {
    setModalMode("add");
    setNewCategoryName("");
    setIsModalOpen(true);
  };

  const openEditModal = (category) => {
    setModalMode("edit");
    setCurrentCategory(category);
    setNewCategoryName(category.label);
    setIsModalOpen(true);
  };

  const handleSubmit = () => {
    if (newCategoryName.trim() === "") {
      alert("Название категории не может быть пустым");
      return;
    }

    if (modalMode === "add") {
      addCategory({
        value: newCategoryName.toLowerCase(),
        label: newCategoryName,
      });
    } else {
      editCategory(currentCategory.value, { label: newCategoryName });
    }

    closeAllModals();
  };

  const cardsContent = categories.map((category) => ({
    ...category,
    actions: [
      {
        icon: "edit",
        handler: () => openEditModal(category),
      },
      {
        icon: "delete",
        handler: () => openModal(category),
      },
    ],
  }));

  return (
    <>
      <ContentPageFactory
        title="Категории"
        cardsContent={cardsContent}
        addModal={openAddModal}
      />
      {isModalOpen && (
        <EditAddModal
          mode={modalMode}
          labelGenetive="категорию"
          labelPrepositional="категории"
          text={newCategoryName}
          setText={setNewCategoryName}
          onSubmit={handleSubmit}
          onClose={closeAllModals}
        />
      )}
      {isOpen && (
        <ModalDelete
          label="категорию"
          onConfirm={() => {
            removeCategory(target.value);
            closeAllModals();
          }}
          closeModal={closeAllModals}
        />
      )}
    </>
  );
}
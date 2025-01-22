import "./Categories.css";
import '../../components/Modals/Modals.css';
import { useContext, useState } from "react";
import plus from "../../assets/icons/math-plus.svg";
import CategoriesContext from "./CategoriesContext";
import camera from "../../assets/icons/camera.svg";
import pencil from "../../assets/icons/edit_pencil.svg";
import wastebasket from "../../assets/icons/wastebasket.svg";
import close from "../../assets/icons/close.svg";
import { useDeleteModal } from "../../components/Modals/ModalDelete/useDeleteModal";
import { ModalDelete } from "../../components/Modals/ModalDelete/ModalDelete";

export default function Categories() {
    const { categories, addCategory, removeCategory, editCategory } =
    useContext(CategoriesContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [currentCategory, setCurrentCategory] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const { isOpen, target, openModal, closeModal: closeDeleteModal } =
    useDeleteModal();

  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      const newCategory = {
        value: newCategoryName.toLowerCase().replace(/\s+/g, "_"),
        label: newCategoryName,
      };
      addCategory(newCategory);
      setNewCategoryName("");
      setIsModalOpen(false);
    } else {
      alert("Введите название категории!");
    }
  };

  const handleEditCategory = () => {
    if (newCategoryName.trim() && currentCategory) {
      editCategory(currentCategory.value, { label: newCategoryName });
      setNewCategoryName("");
      setCurrentCategory(null);
      setIsModalOpen(false);
    } else {
      alert("Введите новое название категории");
    }
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

  const handleDeleteCategory = () => {
    if (target) {
      removeCategory(target.value);
      closeDeleteModal();
    }
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="categories">
      <div className="page-header">
        <div className="page-headline">
          <h1>Категории</h1>
          <p>{categories.length}</p>
        </div>
        <button className="btn btn-headline" onClick={openAddModal}>
          <div className="btn-items-headline">
            <img src={plus} alt="plus" />
            <p>Добавить</p>
          </div>
        </button>
      </div>
      <div className="cards-categories">
        <ul>
          {categories.map((category) => (
            <li key={category.value}>
              <div className="card-category">
                <h2>{category.label}</h2>
                <div className="card-category-img-group m-0">
                  <div className="card-category-img-left">
                    <img src={camera} alt="camera" />
                    <p className="m-0">21</p>
                  </div>
                  <div className="card-category-actions-btn m-0">
                    <button
                      className="btn-img"
                      onClick={() => openEditModal(category)}
                    >
                      <img src={pencil} alt="edit" />
                    </button>
                    <button
                      className="btn-img"
                      onClick={() => openModal(category)}
                    >
                      <img src={wastebasket} alt="delete" />
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <div className="modal-title">
                <h2>
                  {modalMode === "add"
                    ? "Добавить категорию"
                    : "Редактировать категорию"}
                </h2>
                <button className="btn-img" onClick={closeModal}>
                  <img src={close} alt="close" />
                </button>
              </div>
              <div className="border-line m-0"></div>
              <form className="modal-form">
                <input
                  type="text"
                  placeholder="Название категории"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                />
                <div className="modal-btn-group">
                  <button onClick={ modalMode === "add" ? handleAddCategory: handleEditCategory }>
                    {modalMode === "add" ? "Добавить" : "Сохранить"}
                  </button>
                  <button className='btn-grey' onClick={closeModal}>Отмена</button>
                </div>
              </form>
            </div>
          </div>
        )}

{isOpen && (
          <ModalDelete
            label='категорию'
            onConfirm={handleDeleteCategory}
            closeModal={closeDeleteModal}
          />
        )}
      </div>
    </div>
  );
}

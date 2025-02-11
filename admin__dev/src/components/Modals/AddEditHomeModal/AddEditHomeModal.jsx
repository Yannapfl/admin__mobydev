import "./AddEditHomeModal.css";
import "../Modals.css";
import close from ".././../../assets/icons/close.svg";
import PropTypes from "prop-types";
import DropdownList from "../../DropdownList/DropdownList";
import { createArrayTo } from "../../../utils/createArrayTo";
import { UploadImageWindow } from "../../UploadImageWindow/UploadImageWindow";
import { useContext, useState } from "react";
import DataContext from "../../../contexts/DataContext";

export default function AddEditHomeModal({
  entity,
  mode,
  onAdd,
  onUpdate,
  closeModal,
}) {
const { data } = useContext(DataContext);
const projectsTitlesList = data.projects.map((project) => project.title);
const searchProjectId = (title) => {
    if (!title) {
        return '';
    }
    const project = data.projects.find((project) => project.title === title);
    return project.id;
};

const searchProjectTitle = (projectId) => {
    if (!projectId) {
        return null;
    }
    const project = data.projects.find((project) => project.id === projectId);
    return project.title;
}

const [image, setImage] = useState(entity?.image  || "");
const [selectedOrder, setSelectedOrder] = useState(entity?.order || "");
const [selectedProjectTitle, setSelectedProjectTitle] = useState(searchProjectTitle(entity?.projectId) || "");


  const title =
    mode === "add"
      ? `Добавить проект на главную`
      : `Редактировать проект на главной`;

  const buttonText = mode === "add" ? "Добавить" : "Сохранить";

  const maxCountOnHomePage = 7;
  const orderList = createArrayTo(maxCountOnHomePage);

  const handleRemoveImage = () => {
    setImage("");
  };

  const handleSave = () => {
    if (!selectedOrder) {
      alert("Выберете очередность");
      return;
    }
    if (!selectedProjectTitle) {
        alert("Выберете проект");
        return;
      }
    if (!image) {
      alert("Добавьте изображение");
      return;
    }

    const newEntity = { projectId: searchProjectId(selectedProjectTitle), order: selectedOrder, image };
    mode === "edit" ? onUpdate(newEntity) : onAdd(newEntity);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-title">
          <h2>{title}</h2>
          <button className="btn-img" onClick={closeModal}>
            <img src={close} alt="close" />
          </button>
        </div>
        <div className="border-line m-0"></div>
        <form className="modal-form">
          <div className="modal-dropdown-group">
            <DropdownList
              options={projectsTitlesList}
              selectedValue={selectedProjectTitle}
              setSelectedValue={setSelectedProjectTitle}
              placeholder="Выберете проект"
            />
            <DropdownList
              options={orderList}
              selectedValue={selectedOrder}
              setSelectedValue={setSelectedOrder}
              placeholder="Выберете очередность"
            />
          </div>
          {image ? (
            <div className="modal-img-preview">
              <div className="modal-img-preview-contaiiner">
                <img src={image} alt="preview" />
              </div>
              <button
                type="button"
                className="btn-red modal-remove-img-button"
                onClick={handleRemoveImage}
              >
                X
              </button>
            </div>
          ) : (
            <UploadImageWindow onImageUpload={setImage} />
          )}
          <div className="modal-btn-group">
            <button type="button" onClick={handleSave}>
              {buttonText}
            </button>
            <button type="button" className="btn-grey" onClick={closeModal}>
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

AddEditHomeModal.propTypes = {
    mode: PropTypes.oneOf(["add", "edit"]).isRequired,
    onAdd: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
    entity: PropTypes.shape({
            projectId: PropTypes.number,
            order: PropTypes.number,
            image: PropTypes.string,
    }),
}
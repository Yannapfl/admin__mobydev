import "./ImgEditAddModal.css";
import "../Modals.css";
import close from ".././../../assets/icons/close.svg";
import PropTypes from "prop-types";
import { useState } from "react";
import { UploadImageWindow } from "../../UploadImageWindow/UploadImageWindow";

export default function ImgEditAddModal({
  mode,
  entity,
  onAdd,
  onUpdate,
  closeModal,
  labelPrepositional,
  labelGenetive,
}) {
  const [label, setLabel] = useState(entity?.label || "");
  const [image, setImage] = useState(entity?.image || "");

  const title =
    mode === "add"
      ? `Добавить ${labelGenetive}`
      : `Редактировать ${labelGenetive}`;
  const buttonText = mode === "add" ? "Добавить" : "Сохранить";

  const handleSave = () => {
    if (!label.trim()) {
      alert("Название не может быть пустым");
      return;
    }
    if (!image) {
      alert("Добавьте изображение");
      return;
    }

    const newEntity = { id: entity?.id || Date.now(), label, image };
    mode === "edit" ? onUpdate(newEntity) : onAdd(newEntity);
  };

  const handleRemoveImage = () => {
    setImage("");
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
          <input
            type="text"
            placeholder={`Название ${labelPrepositional}`}
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          />
          {image ? (
            <div className="modal-img-preview">
              <div className="modal-img-preview-contaiiner">
                <img src={image} alt="preview" />
              </div>
              <button 
              type='button'
              className="btn-red modal-remove-img-button"
              onClick={handleRemoveImage}
              >X</button>
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

ImgEditAddModal.propTypes = {
  labelGenetive: PropTypes.string.isRequired,
  labelPrepositional: PropTypes.string.isRequired,
  mode: PropTypes.oneOf(["add", "edit"]).isRequired,
  entity: PropTypes.object,
  onAdd: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};

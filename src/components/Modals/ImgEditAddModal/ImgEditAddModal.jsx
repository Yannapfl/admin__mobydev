import "./ImgEditAddModal.css";
import "../Modals.css";
import close from ".././../../assets/icons/close.svg";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { UploadImageWindow } from "../../UploadImageWindow/UploadImageWindow";
import api from "../../../utils/api";
import convertBlobToFile from "../../../utils/convertBlobToFile";

export default function ImgEditAddModal({
  mode,
  id,
  entity,
  onAdd,
  onUpdate,
  closeModal,
  labelPrepositional,
  labelGenetive,
}) {
  const [name, setName] = useState(entity?.name || "");
  const [imageSrc, setImageSrc] = useState(entity?.imageSrc || "");
  const title =
    mode === "add"
      ? `Добавить ${labelGenetive}`
      : `Редактировать ${labelGenetive}`;
  const buttonText = mode === "add" ? "Добавить" : "Сохранить";

  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (!imageSrc) {
      setImageUrl("");
      return;
    }
    if (imageSrc.startsWith("blob:")) {
      setImageUrl(imageSrc);
      return;
    }

    api
      .get(`/${imageSrc}`, { responseType: "blob" })
      .then((response) => {
        const objectUrl = URL.createObjectURL(response.data);
        setImageUrl(objectUrl);
      })
      .catch(() => setImageUrl("../../../assets/images/ages/16-18.png"));
  }, [imageSrc]);

  const handleSave = async () => {
    if (!name.trim()) {
      alert("Название не может быть пустым");
      return;
    }
    if (!imageSrc) {
      alert("Добавьте изображение");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    try {
      const blob = await fetch(imageSrc).then((res) => res.blob());
      const file = convertBlobToFile(blob, `${name}_${imageSrc}__image.png`);

      formData.append("image", file);

      if (mode === "edit") {
        formData.append("id", id);
        onUpdate(formData);
      } else {
        onAdd(formData);
      }
    } catch (error) {
      console.error("Error processing image:", error);
    }
  };

  const handleRemoveImage = () => {
    setImageSrc("");
    setImageUrl("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSave();
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
        <form className="modal-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder={`Название ${labelPrepositional}`}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {imageSrc ? (
            <div className="modal-img-preview">
              <div className="modal-img-preview-contaiiner">
                <img src={imageUrl} alt="preview" key={imageUrl} />
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
            <UploadImageWindow onImageUpload={setImageSrc} />
          )}
          <div className="modal-btn-group">
            <button type="submit">{buttonText}</button>
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
  id: PropTypes.number,
  idName: PropTypes.string,
  onAdd: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};

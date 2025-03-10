import "../Modals.css";
import close from ".././../../assets/icons/close.svg";
import PropTypes from "prop-types";
import DropdownList from "../../DropdownList/DropdownList";
import { createArrayTo } from "../../../utils/createArrayTo";
import { UploadImageWindow } from "../../UploadImageWindow/UploadImageWindow";
import { useContext, useEffect, useState } from "react";
import ProjectsContext from "../../../contexts/ProjectsContext";
import api from "../../../utils/api";
import convertBlobToFile from "../../../utils/convertBlobToFile";
import FeaturedProjectsContext from "../../../contexts/FeaturedProjectsContext";

export default function AddEditHomeModal({
  entity,
  mode,
  closeModal,
}) {
  const { projects } = useContext(ProjectsContext);
  const { addFeaturedProject, updateFeaturedProjects } = useContext(FeaturedProjectsContext);
  const projectsTitlesList =
    projects?.map((project) => project.title) || [];

  const searchProjectId = (title) => {
    if (!title) {
      return "";
    }
    const project = projects.find((project) => project.title === title);
    return project.movieId;
  };

  const searchProjectTitle = (projectId) => {
    if (!projectId) {
      return null;
    }
    const project = projects.find((project) => project.movieId === projectId);
    return project.title;
  };

  const [imageSrc, setImageSrc] = useState(entity?.imageSrc || "");
  const [imageUrl, setImageUrl] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(entity?.order || "");
  const [selectedProjectTitle, setSelectedProjectTitle] = useState(
    searchProjectTitle(entity?.projectId) || ""
  );

  const title =
    mode === "add"
      ? `Добавить проект на главную`
      : `Редактировать проект на главной`;

  const buttonText = mode === "add" ? "Добавить" : "Сохранить";

  const maxCountOnHomePage = 7;
  const orderList = createArrayTo(maxCountOnHomePage);

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

  const handleRemoveImage = () => {
    setImageSrc("");
    setImageUrl("");
  };

  const handleSave = async () => {
    if (!selectedOrder) {
      alert("Выберите очередность");
      return;
    }
    if (!selectedProjectTitle) {
      alert("Выберите проект");
      return;
    }
    if (!imageSrc) {
      alert("Добавьте изображение");
      return;
    }
  
    const formData = new FormData();
    const movieId = searchProjectId(selectedProjectTitle);
  
    try {
      const blob = await fetch(imageSrc).then((res) => res.blob());
      const file = convertBlobToFile(blob, `${movieId}_home_page__image.png`);
  
      formData.append("image", file);
  
      console.log("Отправляемые данные:", { movieId, order: selectedOrder, formData });
  
      if (mode === "edit") {
        updateFeaturedProjects(formData, movieId, selectedOrder);
        closeModal();
      } else {
        addFeaturedProject(formData, movieId, selectedOrder);
        closeModal();
      }
    } catch (error) {
      console.error("Ошибка обработки изображения:", error);
    }
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
          {imageSrc ? (
            <div className="modal-img-preview">
              <div className="modal-img-preview-contaiiner">
                <img src={imageUrl} alt="preview" />
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
  onUpdate: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  entity: PropTypes.shape({
    id: PropTypes.number,
    projectId: PropTypes.number,
    order: PropTypes.number,
    imageSrc: PropTypes.string,
  }),
};

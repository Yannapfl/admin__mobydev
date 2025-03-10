import { useNavigate, useParams } from "react-router-dom";
import "./AddEditProject.css";
import arrowRight from "../../../assets/icons/arrow-right.svg";
import arrowLeft from "../../../assets/icons/arrow-left.svg";
import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import MainSection from "./SectionsAddEdit/MainSection";
import VideoSection from "./SectionsAddEdit/VideoSection";
import MediaSection from "./SectionsAddEdit/MediaSection";
import { emptyProjectStructure } from "../../../mocks/mocksProjectStructure";
import { useModalManager } from "../../../components/Modals/useModalManager";
import { ModalFactory } from "../../../components/Modals/ModalFactory";
import SectionSwitcher from "../../../components/SectionSwitcher/SectionSwitcher";
import ProjectsContext from "../../../contexts/ProjectsContext";
import convertBlobToFile from "../../../utils/convertBlobToFile";

export default function AddEditProject({ mode }) {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [isFilledSection, setIsFilledSection] = useState(false);
  const { getProjectData, addProject, updateProject } = useContext(ProjectsContext);
  const { modalType, openModal, closeModal } = useModalManager();

  const [project, setProject] = useState(emptyProjectStructure);
  const [loading, setLoading] = useState(mode === "edit");

  useEffect(() => {
    if (mode === "edit" && projectId) {
      setLoading(true)
      getProjectData(projectId)
        .then((projectData) => setProject(projectData))
        .finally(() => setLoading(false))
    }
  }, [mode, getProjectData, projectId]);

  const namePath = mode === "edit" ? "Редактировать проект" : "Добавить проект";
  const sections = ["Основная информация", "Видео", "Обложка и скриншоты"];

  const [activeSection, setActiveSection] = useState(sections[0]);
  const pageTitle =
    mode === "edit" ? `Редактировать ${project.title || ""}` : activeSection;

  const handleSkip = () => {
    const currentIndex = sections.indexOf(activeSection);
    setActiveSection(sections[currentIndex + 1]);
  };

  const handleReturn = () => {
    const currentIndex = sections.indexOf(activeSection);
    setActiveSection(sections[currentIndex - 1]);
  };

  const handleSaveProject = () => {
    try {
      const formData = new FormData();
      formData.append("title", project.title);
      formData.append("description", project.description);
      formData.append("releaseYear", project.releaseYear);
      formData.append("duration", project.duration);
      formData.append("director", project.director);
      formData.append("producer", project.producer);
      formData.append("keyWords", project.keyWords || project.keywords || "");

      project.ageCategories.forEach((age) =>
        formData.append("ageCategoryId", Number(age.ageCategoryId))
      );
      project.categories.forEach((category) =>
        formData.append("categoryId", Number(category.categoryId))
      );
      project.genres.forEach((genre) =>
        formData.append("genreId", Number(genre.genreId))
      );

      console.log(
        "FormData before sending:",
        Object.fromEntries(formData.entries())
      );

      updateProject(formData, projectId);

      navigate("/projects");
    } catch (error) {
      console.error("Error saving project:", error);
      alert("Failed to save project. Please try again.");
    }
  };

  const handleAddProject = async () => {
    try {
      console.log("handleAddProject", project);
      const formData = new FormData();
      formData.append("title", project.title);
      formData.append("description", project.description);
      formData.append("releaseYear", project.releaseYear);
      formData.append("duration", project.duration);
      formData.append("director", project.director);
      formData.append("producer", project.producer);
      formData.append("keyWords", project.keyWords || project.keywords || "");

      project.ageCategories.forEach((age) =>
        formData.append("ageCategoryId", Number(age.ageCategoryId))
      );
      project.categories.forEach((category) =>
        formData.append("categoryId", Number(category.categoryId))
      );
      project.genres.forEach((genre) =>
        formData.append("genreId", Number(genre.genreId))
      );

      formData.append("episodes", JSON.stringify(project.video.episodes));

      try {
            const blob = await fetch(project.images.imageSrc).then((res) => res.blob());
            const file = convertBlobToFile(blob, `${project.title}_coverImage__image.png`);
            formData.append("image", file);
      
        } catch (error) {
            console.error("Error processing image", error);
        }

        try {
          const blob = await fetch(project.images.imageSrc).then((res) => res.blob());
          const file = convertBlobToFile(blob, `${project.title}_coverImage.png`);
          formData.append("image", file);
      } catch (error) {
          console.error("Error processing image", error);
      }

        try {
          const screenshotFiles = await Promise.all(
              project.images.screenshots.map(async (screen, id) => {
                  const blob = await fetch(screen).then((res) => res.blob());
                  return convertBlobToFile(blob, `${id}_${project.title}_screenshot.png`);
              })
          );
          screenshotFiles.forEach(file => formData.append("screenshots[]", file));
      } catch (error) {
          console.error("Error processing screenshots", error);
      }

      console.log(
        "FormData before sending:",
        Object.fromEntries(formData.entries())
      );
      addProject(formData);
    } catch (error) {
      console.error("Error adding project:", error);
      alert("Failed to add project. Please try again.");
    }
  };

  if (loading) {
    return <p>Загрузка проекта...</p>; 
  }

  return (
    <div className="add-edit-project">
      <div className="background-grey">
        <div className="project-path">
          <button
            className="btn-text btn-img"
            onClick={() => navigate("/projects")}
          >
            Проекты
          </button>
          <img src={arrowRight} alt="arrow" />
          <h4>{namePath}</h4>
        </div>

        <div className="project-info-content">
          <div className="project-edit-header">
            <button
              className="btn-text btn-img"
              onClick={() => navigate("/projects")}
            >
              <img src={arrowLeft} alt="arrow" />
            </button>
            <h1 className="m-0">{pageTitle}</h1>
          </div>
          {mode === "edit" && (
            <SectionSwitcher sections={sections} onActive={setActiveSection} />
          )}
          <div className="sections-block-project-edit">
            {activeSection === sections[0] && (
              <MainSection
                tempProject={project}
                setTempProject={setProject}
                setIsFilledSection={setIsFilledSection}
              />
            )}

            {activeSection === sections[1] && (
              <VideoSection
                mode={mode}
                tempProject={project}
                setTempProject={setProject}
                setIsFilledSection={setIsFilledSection}
              />
            )}

            {activeSection === sections[2] && (
              <MediaSection
                tempProject={project}
                setTempProject={setProject}
                setIsFilledSection={setIsFilledSection}
                mode={mode}
              />
            )}
          </div>

          {mode === "add" ? (
            <>
              {activeSection === sections[0] && (
                <div className="project-edit-btn-group">
                  <button
                    className={`btn-skip ${
                      !isFilledSection ? "disable" : ""
                    } btn`}
                    disabled={!isFilledSection}
                    onClick={handleSkip}
                  >
                    Далее
                  </button>
                  <button
                    className="btn btn-grey"
                    onClick={() => navigate("/projects")}
                  >
                    Отмена
                  </button>
                </div>
              )}

              {activeSection !== sections[0] &&
                activeSection !== sections[sections.length - 1] && (
                  <div className="project-edit-btn-group g-350">
                    <button className="btn btn-grey" onClick={handleReturn}>
                      Назад
                    </button>
                    <div className="right-btn-group">
                      <button
                        className={`btn-skip ${
                          !isFilledSection ? "disable" : ""
                        } btn`}
                        onClick={handleSkip}
                        disabled={!isFilledSection}
                      >
                        Далее
                      </button>
                      <button
                        className="btn btn-grey"
                        onClick={() => navigate("/projects")}
                      >
                        Отмена
                      </button>
                    </div>
                  </div>
                )}

              {activeSection === sections[sections.length - 1] && (
                <div className="project-edit-btn-group g-350">
                  <button className="btn btn-grey" onClick={handleReturn}>
                    Назад
                  </button>
                  <div className="right-btn-group">
                    {isFilledSection ? (
                      <button
                        className="btn"
                        onClick={() => {
                          handleAddProject();
                          openModal("success");
                        }}
                      >
                        Добавить
                      </button>
                    ) : (
                      <button className={`btn-skip disable btn`} disabled>
                        Далее
                      </button>
                    )}
                    <button
                      className="btn btn-grey"
                      onClick={() => navigate("/projects")}
                    >
                      Отмена
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="project-edit-btn-group">
              <button className="btn" onClick={handleSaveProject}>
                Сохранить
              </button>
              <button
                className="btn btn-grey"
                onClick={() => navigate("/projects")}
              >
                Отмена
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="white-block"></div>
      {modalType && (
        <ModalFactory
          type={modalType}
          modalProps={{
            closeModal,
            navigate,
          }}
        />
      )}
    </div>
  );
}

AddEditProject.propTypes = {
  mode: PropTypes.string.isRequired,
};

import { useNavigate, useParams } from "react-router-dom";
import "./AddEditProject.css";
import arrowRight from "../../../assets/icons/arrow-right.svg";
import arrowLeft from "../../../assets/icons/arrow-left.svg";
import { useContext, useState } from "react";
import PropTypes from "prop-types";
import DataContext from "../../../contexts/DataContext";
import MainSection from "./SectionsAddEdit/MainSection";
import VideoSection from "./SectionsAddEdit/VideoSection";
import MediaSection from "./SectionsAddEdit/MediaSection";
import { emptyProjectStructure } from "../../../mocks/mocksProjectStructure";
import { useModalManager } from "../../../components/Modals/useModalManager";
import { ModalFactory } from "../../../components/Modals/ModalFactory";
import { useSelector } from "react-redux";
import SectionSwitcher from "../../../components/SectionSwitcher/SectionSwitcher";

export default function AddEditProject({ mode }) {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [isFilledSection, setIsFilledSection] = useState(false);
  const { data, addEntity, updateEntity } = useContext(DataContext);
  const { modalType, openModal, closeModal } = useModalManager();
  const user = useSelector((state) => state.auth.user);

  const project =
    mode === "edit"
      ? data.projects.find((proj) => proj.id === parseInt(projectId))
      : {
          ...emptyProjectStructure,
          video:
            emptyProjectStructure.type === "Фильм"
              ? { videoId: "", seasonCount: 0, episodes: [] }
              : { seasonCount: 1, episodes: [] },
        };

  const namePath = mode === "edit" ? "Редактировать проект" : "Добавить проект";
  const sections = ["Основная информация", "Видео", "Обложка и скриншоты"];
  const pageTitle =
    mode === "edit" ? `Редактировать ${project.title || ""}` : sections[0];

  const [activeSection, setActiveSection] = useState(sections[0]);
  const [tempProject, setTempProject] = useState(project);
  const [selectedType, setSelectedType] = useState(tempProject?.type || "");

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
      const updatedProject = {
        ...tempProject,
        updatedAt: Date.now(),
      };
      setTempProject(updatedProject);
      updateEntity("projects", updatedProject);
      navigate("/projects");
    } catch (error) {
      console.error("Error saving project:", error);
      alert("Failed to save project. Please try again.");
    }
  };

  const handleAddProject = () => {
    try {
      const newProject = {
        ...tempProject,
        updatedAt: Date.now(),
        createdAt: Date.now(),
        id: Date.now(),
        createdBy: user.name,
      };
      setTempProject(newProject);
      addEntity("projects", newProject);
    } catch (error) {
      console.error("Error adding project:", error);
      alert("Failed to add project. Please try again.");
    }
  };

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
                tempProject={tempProject}
                setTempProject={setTempProject}
                setType={setSelectedType}
                setIsFilledSection={setIsFilledSection}
              />
            )}

            {activeSection === sections[1] && (
              <VideoSection
                selectedType={selectedType}
                tempProject={tempProject}
                setTempProject={setTempProject}
                setIsFilledSection={setIsFilledSection}
              />
            )}

            {activeSection === sections[2] && (
              <MediaSection
                tempProject={tempProject}
                setTempProject={setTempProject}
                setIsFilledSection={setIsFilledSection}
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

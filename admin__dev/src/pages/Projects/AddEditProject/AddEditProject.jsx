import { useNavigate, useParams } from "react-router-dom";
import "./AddEditProject.css";
import arrowRight from "../../../assets/icons/arrow-right.svg";
import arrowLeft from "../../../assets/icons/arrow-left.svg";
import { useState } from "react";
import { mocksProjects } from "../../../mocks/mocksProjects";

export default function AddEditProject({ mode }) {
    const navigate = useNavigate();
    const { projectId } = useParams();
  
    const project = mocksProjects.find((proj) => proj.id === parseInt(projectId)) || {};
    const namePath = mode === "edit" ? "Редактировать проект" : "Добавить проект";
    const sections = ["Основная информация", "Видео", "Обложка и скриншоты"];
    const pageTitle = mode === "edit" ? `Редактировать ${project.title || ''}` : sections[0];
    const buttonText = mode === 'edit' ? 'Сохранить' : 'Добавить';
  
    const [activeSection, setActiveSection] = useState(sections[0]);
    const [tempProject, setTempProject] = useState(project);
  
    const handleSectionChange = (section) => setActiveSection(section);
  
    const updateField = (field, value) => {
      setTempProject(prev => ({ ...prev, [field]: value }));
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
            <div className="project-info-header">
              <button
                className="btn-text btn-img"
                onClick={() => navigate("/projects")}
              >
                <img src={arrowLeft} alt="arrow" />
              </button>
              <h1 className="m-0">{pageTitle}</h1>
            </div>
            {mode === "edit" && (
              <div className="sections-projects-edit">
                {sections.map((section) => (
                  <button
                    key={section}
                    className={`switcher-section-edit ${activeSection === section ? "active" : ""}`}
                    onClick={() => handleSectionChange(section)}
                  >
                    <h3>{section}</h3>
                  </button>
                ))}
                  {activeSection && (
                      <div className="active-line" style={{
                          left: `${sections.indexOf(activeSection) * (100 / sections.length)}%`,
                          width: `${100 / sections.length}%`
                      }}></div>
                  )}
              </div>
            )}
          <div className="sections-block-project-edit">
          {activeSection === sections[0] && (
              <input type='text' value={tempProject?.title || ''} onChange={(e) => updateField('title', e.target.value)} placeholder="Название проекта" />
          )}
  
          {activeSection === sections[1] && (
              <h3>Видео</h3>
          )}
  
          {activeSection === sections[2] && (
              <h3>Обложка</h3>
          )}
          </div>
  
          <div className="project-edit-btn-group">
              <button className="btn">{buttonText}</button>
              <button className="btn brn-grey" onClick={() => navigate("/projects")}>Отмена</button>
          </div>
          
          </div>
        </div>
        <div className="white-block"></div>
      </div>
    );
  }
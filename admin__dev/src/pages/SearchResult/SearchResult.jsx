import "./SearchResult.css";
import { useLocation } from "react-router-dom";
import SectionSwitcher from "../../components/SectionSwitcher/SectionSwitcher";
import { useContext, useState } from "react";
import DataContext from "../../contexts/DataContext";
import CardProjects from "../../components/CardProjects/CardProjects";
import { ModalFactory } from "../../components/Modals/ModalFactory";
import { useModalManager } from "../../components/Modals/useModalManager";
import useRoleAccess from "../../utils/useRoleAccess";
import { getValues } from "../../utils/getValues";
import ContentCard from "../../components/ContentCard/ContentCard";
import { mocksDataUsers } from "../../mocks/mocksDataUsers";
import CardUser from "../../components/CardUser/CardUser";

export default function SearchResult() {
  const location = useLocation();
  const value = (location.state?.value || "Нет данных").trim();
  const sections = ["Проекты", "Категории", "Пользователи"];
  const { data, deleteEntity } = useContext(DataContext);
  const { modalType, modalProps, openModal, closeModal } = useModalManager();
  const [activeSection, setActiveSection] = useState(sections[0]);
  const { canEdit } = useRoleAccess();

  const isMatch = (values) => {
    return values.some((item) => {
      return item.toLowerCase().includes(value.toLowerCase());
    });
  };

  const filteredProjects = data.projects.filter((project) => {
    const valuesProject = getValues(project);
    return isMatch(valuesProject);
  });

  const filteredCategories = data.categories.filter((category) => {
    const valuesCategories = getValues(category);
    return isMatch(valuesCategories);
  });

  const filteredUsers = mocksDataUsers.filter((user) => {
    const valuesUser = getValues(user);
    return isMatch(valuesUser);
  });

  const resultLength =
    filteredProjects.length + filteredCategories.length + filteredUsers.length;

  return (
    <div className="search-result">
      <div className="page-header">
        <div className="page-headline">
          <h1>Результат поиска</h1>
          <p>{resultLength}</p>
        </div>
      </div>
      <div className="result-switcher">
        <SectionSwitcher sections={sections} onActive={setActiveSection} />
      </div>
      <div className="sections-search">
        {activeSection === sections[0] && (
          <div className="cards-projects-group">
            {filteredProjects.map((project) => (
              <CardProjects
                key={project.id}
                project={project}
                onDelete={
                  canEdit("projects")
                    ? (e) => {
                        e.stopPropagation();
                        openModal("delete", {
                          label: "проект",
                          onConfirm: () => {
                            deleteEntity("projects", project.id);
                            closeModal();
                          },
                        });
                      }
                    : null
                }
              />
            ))}
          </div>
        )}
        {activeSection === sections[1] && (
          <div className="cards-group">
            {filteredCategories.map((category) => (
              <ContentCard
                card={category}
                key={category.id}
                onEdit={
                  canEdit("categories")
                    ? () =>
                        openModal("text", { mode: "edit", entity: category })
                    : null
                }
                onDelete={
                  canEdit("categories")
                    ? () =>
                        openModal("delete", {
                          label: "категорию",
                          onConfirm: () => {
                            deleteEntity("categories", category.id);
                            closeModal();
                          },
                        })
                    : null
                }
              />
            ))}
          </div>
        )}
        {activeSection === sections[2] && (
          <div className="users-cards-group">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className="user-card-block"
                onClick={
                  canEdit("users")
                    ? () => openModal("userCard", { user })
                    : null
                }
              >
                <CardUser user={user} />
              </div>
            ))}
          </div>
        )}
      </div>
      {modalType && (
        <ModalFactory
          type={modalType}
          modalProps={{
            ...modalProps,
            onDelete: () => {
              closeModal();
            },
            closeModal,
          }}
        />
      )}
    </div>
  );
}

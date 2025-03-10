import { useContext, useEffect, useState } from "react";
import plus from ".././../assets/icons/math-plus.svg";
import FeaturedProjectsContext from "../../contexts/FeaturedProjectsContext";
import FeaturedCard from "../../components/FeaturedCard/FeaturedCard";
import { useModalManager } from "../../components/Modals/useModalManager";
import { ModalFactory } from "../../components/Modals/ModalFactory";
import useRoleAccess from "../../utils/useRoleAccess";
import api from "../../utils/api";

export default function HomeProjects() {
  const { removeFeaturedProject } = useContext(FeaturedProjectsContext);
  const { modalType, modalProps, openModal, closeModal } = useModalManager();
  const { canEdit } = useRoleAccess();
  const editKey = "projects";
  const [loading, setLoading] = useState(false);
  const [featuredProjects, setFeaturedProjects] = useState([]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await api.get("movies/main-page");
      setFeaturedProjects(response.data.result);
    } catch (error) {
      console.error("Ошибка загрузки проекта на главную", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRemove = (id) => {
    removeFeaturedProject(id);
    fetchData();
  };

  if (loading) {
    return <p>Загрузка проекта...</p>;
  }

  return (
    <div className="main_home">
      <div className="page-header">
        <div className="page-headline">
          <h1>Проекты на главной</h1>
          <p>{featuredProjects.length}</p>
        </div>
        <button
          disabled={!canEdit(editKey)}
          style={{ opacity: canEdit(editKey) ? 1 : 0.5 }}
          className="btn btn-headline"
          onClick={() => openModal("dropdown", { mode: "add", entity: null })}
        >
          <div className="btn-items-headline">
            <img src={plus} alt="plus" />
            <p>Добавить</p>
          </div>
        </button>
      </div>
      <div className="featured-cards-group">
        {featuredProjects.map((featuredProject) => (
          <FeaturedCard
            key={featuredProject.projectId}
            entity={featuredProject}
            onEdit={
              canEdit(editKey)
                ? () =>
                    openModal("dropdown", {
                      mode: "edit",
                      entity: featuredProject,
                    })
                : null
            }
            onDelete={
              canEdit(editKey)
                ? () =>
                    openModal("delete", {
                      label: "проект на главной",
                      onConfirm: () => {
                        handleRemove(featuredProject.projectId);
                        closeModal();
                      },
                    })
                : null
            }
          />
        ))}
      </div>

      {modalType && (
        <ModalFactory
          type={modalType}
          modalProps={{
            ...modalProps,
            onDelete: canEdit(editKey)
              ? () => {
                  handleRemove(modalProps.entity?.projectId);
                  closeModal();
                }
              : null,
            closeModal,
          }}
        />
      )}
    </div>
  );
}

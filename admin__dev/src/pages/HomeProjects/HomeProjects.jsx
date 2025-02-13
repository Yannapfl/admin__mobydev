import { useContext } from "react";
import plus from ".././../assets/icons/math-plus.svg";
import FeaturedProjectsContext from "../../contexts/FeaturedProjectsContext";
import FeaturedCard from "../../components/FeaturedCard/FeaturedCard";
import { useModalManager } from "../../components/Modals/useModalManager";
import { ModalFactory } from "../../components/Modals/ModalFactory";
import useRoleAccess from "../../utils/useRoleAccess";

export default function HomeProjects() {
  const {
    featuredProjects,
    addFeaturedProject,
    updateFeaturedProjects,
    removeFeaturedProject,
  } = useContext(FeaturedProjectsContext);
  const { modalType, modalProps, openModal, closeModal } = useModalManager();
  const { canEdit } = useRoleAccess();
  const editKey = "projects";

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
                        removeFeaturedProject(featuredProject.projectId);
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
            onAdd: canEdit(editKey)
              ? (newFeatured) => {
                  addFeaturedProject(newFeatured);
                  closeModal();
                }
              : null,
            onUpdate: canEdit(editKey)
              ? (updatedFeatured) => {
                  updateFeaturedProjects(updatedFeatured);
                  closeModal();
                }
              : null,
            onDelete: canEdit(editKey)
              ? () => {
                  removeFeaturedProject(modalProps.entity?.projectId);
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

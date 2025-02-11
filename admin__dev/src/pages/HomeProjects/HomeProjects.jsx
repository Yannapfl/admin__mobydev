import { useContext } from 'react'
import plus from '.././../assets/icons/math-plus.svg'
import FeaturedProjectsContext from '../../contexts/FeaturedProjectsContext'
import FeaturedCard from '../../components/FeaturedCard/FeaturedCard';
import { useModalManager } from '../../components/Modals/useModalManager';
import { ModalFactory } from '../../components/Modals/ModalFactory';

export default function HomeProjects() {
    const { featuredProjects, addFeaturedProject, updateFeaturedProjects, removeFeaturedProject } = useContext(FeaturedProjectsContext);
    const { modalType, modalProps, openModal, closeModal } = useModalManager();

    return(
        <div className="main_home">
            <div className="page-header">
                <div className="page-headline">
                    <h1>Проекты на главной</h1>
                    <p>{featuredProjects.length}</p>
                </div>
                <button className="btn btn-headline">
                    <div className="btn-items-headline" onClick={() => openModal('dropdown', { mode: 'add', entity: null})}>
                        <img src={plus} alt="plus" />
                        <p>Добавить</p>
                    </div>
                </button>
            </div>
            <div className='featured-cards-group'>
            {featuredProjects.map((featuredProject) => (
                <FeaturedCard
                    key={featuredProject.projectId}
                    entity={featuredProject}
                    onEdit={() => openModal('dropdown', { mode: 'edit', entity: featuredProject})}
                    onDelete={() => openModal('delete', { label: 'проект на главной', onConfirm: () => {
                        removeFeaturedProject(featuredProject.projectId);
                        closeModal();
                      } })}
                />
            ))}
            </div>

            {modalType && (
                <ModalFactory
                    type={modalType}
                    modalProps={{
                        ...modalProps,
                        onAdd: (newFeatured) => {
                            addFeaturedProject(newFeatured);
                            closeModal();
                        },
                        onUpdate: (updatedFeatured) => {
                            updateFeaturedProjects(updatedFeatured);
                            closeModal();
                        },
                        onDelete: () => {
                            removeFeaturedProject(modalProps.entity?.projectId);
                            closeModal();
                        },
                        closeModal,
                    }}
                />
            )}
        </div>
    )
}
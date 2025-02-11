import './FeaturedCard.css'
import pencil from '../../assets/icons/edit_pencil.svg'
import wastebasket from '../../assets/icons/wastebasket.svg'
import PropTypes from "prop-types";
import { useContext } from 'react';
import DataContext from '../../contexts/DataContext';

export default function FeaturedCard({ entity, onEdit, onDelete }) {
    const { data } = useContext(DataContext);
    const project = data.projects.find((p) => p.id === entity.projectId)

 return (
    <div className='content-featured-card'>
        <div className='img-contaner-featured-card'>
            <img src={entity.image} alt='cover image' />
        </div>
        <div className='card-title'>
            <h2>{project.title}</h2>
            <div className='project-card-category'>
                {project.categories.length > 0 && (
                    <p>
                        {project.categories.length === 1
                        ? project.categories[0]
                        : project.categories.join(' • ')
                        }
                    </p>
                )}
            </div>
        </div>
        <div className='card-img-group m-0'>
            <div className='featured-order-text'>
                <p className='m-0'>{`Проект на главной #${entity.order}`}</p>
            </div>
            <div className='card-actions-btn m-0'>
                <button className="btn-img" onClick={onEdit}>
                    <img src={pencil} alt='edit' />
                </button>
                <button className="btn-img" onClick={onDelete}>
                    <img src={wastebasket} alt='delete' />
                </button>
            </div>
        </div>
    </div>
 )
}

FeaturedCard.propTypes = {
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    entity: PropTypes.shape({
        projectId: PropTypes.number,
        order: PropTypes.number,
        image: PropTypes.string,
    }),
};
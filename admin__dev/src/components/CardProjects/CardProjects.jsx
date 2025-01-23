import './CardProjects.css'
import eye from '../../assets/icons/eye.svg'
import pencil from '../../assets/icons/edit_pencil.svg'
import wastebasket from '../../assets/icons/wastebasket.svg'
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';


export default function CardProjects({ project }) {
    const navigate = useNavigate();
    const title = project.title;
    const episodesCount = project.video.episodes.length;
    const coverImage = project.media.coverImage;
    const categories = project.categories;
    const views = project.stats.views;

    const handleCardClick = () => {
        navigate(`/projects/${project.id}`)
    }

    return (
        <div className='card-project' onClick={handleCardClick}>
            <div className='cover-image'>
                {episodesCount > 0 && (
                    <div className='episodes-count'>
                        <p className='m-0'>{episodesCount} бөлім</p>
                    </div>
                )}
                <div className='img-container'>
                    <img src={coverImage} alt='cover' />
                </div>
            </div>
            <h2>{title}</h2>
            <div className='project-card-category'>
                {categories.length > 0 && (
                    <p>
                        {categories.length === 1
                        ? categories[0]
                        : categories.join(' • ')
                        }
                    </p>
                )}
            </div>
            <div className='card-category-img-group m-0'>
                <div className="card-category-img-left">
                    <img src={eye} alt="eye" />
                    <p className="m-0">{views.toLocaleString('ru-RU')}</p>
                </div>
                <div className="card-category-actions-btn m-0">
                    <button className="btn-img">
                        <img src={pencil} alt="edit" />
                    </button>
                    <button className="btn-img">
                        <img src={wastebasket} alt="delete" />
                    </button>
                </div>
            </div>
        </div>
    )
}

CardProjects.propTypes = {
    project: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        video: PropTypes.shape({
            episodes: PropTypes.array.isRequired,
        }).isRequired,
        media: PropTypes.shape({
            coverImage: PropTypes.string.isRequired,
        }).isRequired,
        categories: PropTypes.arrayOf(PropTypes.string).isRequired,
        stats: PropTypes.shape({
            views: PropTypes.number.isRequired,
        }).isRequired,
    }).isRequired,
};
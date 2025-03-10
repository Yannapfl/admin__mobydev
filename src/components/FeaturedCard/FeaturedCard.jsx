import './FeaturedCard.css'
import pencil from '../../assets/icons/edit_pencil.svg'
import wastebasket from '../../assets/icons/wastebasket.svg'
import PropTypes from "prop-types";
import { useEffect, useState } from 'react';
import api from '../../utils/api';

export default function FeaturedCard({ entity, onEdit, onDelete }) {
const [imageUrl, setImageUrl] = useState("");

const categories = entity.categories.map((category) => category.name);
    
useEffect(() => {
        api
          .get(`${entity.imageSrc}`, { responseType: "blob" })
          .then((response) => setImageUrl(URL.createObjectURL(response.data)))
          .catch(() => setImageUrl("/default-image.jpg"));
      }, [entity.imageSrc]);

 return (
    <div className='content-featured-card'>
        <div className='img-contaner-featured-card'>
            <img src={imageUrl} alt='cover image' />
        </div>
        <div className='card-title'>
            <h2>{entity.title}</h2>
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
        title: PropTypes.string,
        projectId: PropTypes.number,
        order: PropTypes.number,
        imageSrc: PropTypes.string,
        categories: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string,
        })),
    }),
};
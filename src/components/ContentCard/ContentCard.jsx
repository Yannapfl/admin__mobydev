import "./ContentCard.css";
import camera from "../../assets/icons/camera.svg";
import pencil from "../../assets/icons/edit_pencil.svg";
import wastebasket from "../../assets/icons/wastebasket.svg";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import api from "../../utils/api";

export default function ContentCard({ card, onEdit, onDelete }) {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    api.get(`/${card.imageSrc}`, { responseType: 'blob' })
       .then(response => setImageUrl(URL.createObjectURL(response.data)))
       .catch(() => setImageUrl("/default-image.jpg"));
}, [card.imageSrc]);

  return (
    <>
    <div className="content-card-factory">
        {card.imageSrc && 
        <div className="img-container-card-factory">
          <img src={imageUrl} alt='card image' />
        </div>
        }
      <div className="card-title">
        <h2>{card.name}</h2>
        <div className="card-img-group m-0">
          <div className="card-img-left">
            <img src={camera} alt="camera" />
            <p className="m-0">{card.countOfMovies}</p>
          </div>
          <div className="card-actions-btn m-0">
              <button className="btn-img" onClick={onEdit}>
                <img src={pencil} alt='edit' />
              </button>
              <button className="btn-img" onClick={onDelete}>
                <img src={wastebasket} alt='delete' />
              </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

ContentCard.propTypes = {
  card: PropTypes.shape({
    name: PropTypes.string.isRequired,
    countOfMovies: PropTypes.number,
    imageSrc: PropTypes.string,
}).isRequired,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
};

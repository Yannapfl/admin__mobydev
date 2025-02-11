import "./ContentCard.css";
import camera from "../../assets/icons/camera.svg";
import pencil from "../../assets/icons/edit_pencil.svg";
import wastebasket from "../../assets/icons/wastebasket.svg";
import PropTypes from "prop-types";

export default function ContentCard({ card, onEdit, onDelete }) {

  return (
    <>
    <div className="content-card-factory">
        {card.image && 
        <div className="img-container-card-factory">
        <img src={card.image} alt='card image' />
        </div>
        }
      <div className="card-title">
        <h2>{card.label}</h2>
        <div className="card-img-group m-0">
          <div className="card-img-left">
            <img src={camera} alt="camera" />
            <p className="m-0">21</p>
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
    label: PropTypes.string.isRequired,
    image: PropTypes.string,
}).isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

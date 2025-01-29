import "./ContentCard.css";
import camera from "../../assets/icons/camera.svg";
import pencil from "../../assets/icons/edit_pencil.svg";
import wastebasket from "../../assets/icons/wastebasket.svg";
import PropTypes from "prop-types";

const icons = {
  edit: pencil,
  delete: wastebasket,
};

export default function ContentCard({ card }) {
  return (
    <div className="content-card-factory">
      <div className="card-title">
        <h2>{card.label}</h2>
        <div className="card-img-group m-0">
          <div className="card-img-left">
            <img src={camera} alt="camera" />
            <p className="m-0">21</p>
          </div>
          <div className="card-actions-btn m-0">
            {card.actions?.map((action, index) => (
              <button key={index} className="btn-img" onClick={action.handler}>
                <img src={icons[action.icon]} alt={action.icon} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

ContentCard.propTypes = {
  card: PropTypes.shape({
    label: PropTypes.string.isRequired,
    actions: PropTypes.arrayOf(
      PropTypes.shape({
        icon: PropTypes.oneOf(["edit", "delete"]).isRequired,
        handler: PropTypes.func.isRequired,
      })
    ),
  }).isRequired,
};

import "./ContentPageFactory.css";
import plus from "../../assets/icons/math-plus.svg";
import ContentCard from "../ContentCard/ContentCard";
import PropTypes from "prop-types";

export default function ContentPageFactory({ title, cardsContent, addModal }) {
  return (
    <div className="page-factory">
      <div className="page-header">
        <div className="page-headline">
          <h1>{title}</h1>
          <p>{cardsContent.length}</p>
        </div>
        <button className="btn btn-headline" onClick={addModal}>
          <div className="btn-items-headline">
            <img src={plus} alt="plus" />
            <p>Добавить</p>
          </div>
        </button>
      </div>
      <div className="cards-group">
        {cardsContent.map((card) => (
          <ContentCard card={card} key={card.name} />
        ))}
      </div>
    </div>
  );
}

ContentPageFactory.propTypes = {
  title: PropTypes.string.isRequired,
  cardsContent: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      actions: PropTypes.arrayOf(
        PropTypes.shape({
          icon: PropTypes.oneOf(["edit", "delete"]).isRequired,
          handler: PropTypes.func.isRequired,
        })
      ),
    })
  ).isRequired,
  addModal: PropTypes.func.isRequired,
};

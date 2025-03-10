import "./CardProjects.css";
import eye from "../../assets/icons/eye.svg";
import pencil from "../../assets/icons/edit_pencil.svg";
import wastebasket from "../../assets/icons/wastebasket.svg";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import useRoleAccess from "../../utils/useRoleAccess";
import { useEffect, useState } from "react";
import api from "../../utils/api";

export default function CardProjects({ project, onDelete }) {
  const navigate = useNavigate();
  const { canEdit } = useRoleAccess();
  const editKey = "projects";
  const [imageUrl, setImageUrl] = useState("");

  const title = project.title;
  const categories = project.categories.map((category) => category.name);
  const views = project.views;

  useEffect(() => {
    api
      .get(`${project.imageSrc}`, { responseType: "blob" })
      .then((response) => setImageUrl(URL.createObjectURL(response.data)))
      .catch(() => setImageUrl("/default-image.jpg"));
  }, [project.imageSrc]);

  const handleCardClick = (e) => {
    e.preventDefault();
    navigate(`/projects/${project.movieId}`);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/projects/edit/${project.movieId}`);
  };

  return (
    <div className="card-project" onClick={handleCardClick}>
      <div className="cover-image">
        {project.seriesCount > 1 && (
          <div className="episodes-count">
            <p className="m-0">{project.seriesCount} бөлім</p>
          </div>
        )}
        <div className="img-container">
          <img src={imageUrl} alt="cover" />
        </div>
      </div>
      <h2>{title}</h2>
      <div className="project-card-category">
        {categories.length > 0 && (
          <p>
            {categories.length === 1 ? categories[0] : categories.join(" • ")}
          </p>
        )}
      </div>
      <div className="card-projects-img-group m-0">
        <div className="card-projects-img-left">
          <img src={eye} alt="eye" />
          <p className="m-0">{views.toLocaleString("ru-RU")}</p>
        </div>
        <div className="card-projects-actions-btn m-0">
          <button
            disabled={!canEdit(editKey)}
            style={{ opacity: canEdit(editKey) ? 1 : 0.5 }}
            className="btn-img"
            onClick={handleEdit}
          >
            <img src={pencil} alt="edit" />
          </button>
          <button className="btn-img" onClick={onDelete}>
            <img src={wastebasket} alt="delete" />
          </button>
        </div>
      </div>
    </div>
  );
}

CardProjects.propTypes = {
  project: PropTypes.shape({
    movieId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    seriesCount: PropTypes.number.isRequired,
    imageSrc: PropTypes.string.isRequired,
    categories: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
      })
    ),
    views: PropTypes.number.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

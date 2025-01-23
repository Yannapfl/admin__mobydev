import { useParams } from "react-router-dom";
import "./ProjectInfo.css";
import { mocksProjects } from "../../../components/CardProjects/mocksProjects";
import clock from "../../../assets/icons/black_clock.svg";
import television from "../../../assets/icons/info_categories.svg";
import clapperBoard from "../../../assets/icons/clapper-board.svg";
import { getPluralForm } from "../../../utils/pluralForm";
import { formatDate } from "../../../utils/formateDate";

export default function ProjectInfo() {
  const { projectId } = useParams();
  const project = mocksProjects.find((proj) => proj.id === parseInt(projectId));

  const seasonsText = `${project.video.seasons} ${getPluralForm(
    project.video.seasons,
    "сезон",
    "сезона",
    "сезонов"
  )}`;

  const episodesText = `${project.video.episodes.length} ${getPluralForm(
    project.video.episodes.length,
    "серия",
    "серии",
    "серий"
  )}`;

  return (
    <div className="project">
      <div className="background-grey">
        <h1>{project.title}</h1>
        <p>Просмотры: {project.stats.views.toLocaleString("ru-RU")}</p>
      </div>
      <div className="project-info">
        <div className="short-info">
          <div className="img-data-project">
            <img src={clock} alt="clock" />
            <h4>{project.year} год</h4>
          </div>
          <div className="img-data-project">
            <img src={television} alt="television" />
            {project.categories.length > 0 && (
              <h4>
                {project.categories.length === 1
                  ? project.categories[0]
                  : project.categories.join(", ")}
              </h4>
            )}
          </div>
          <div className="img-data-project">
            <img src={clapperBoard} alt="clapper board" />
            {project.type === "Series" ? (
              <h4>
                {seasonsText}, {episodesText}, {project.duration} мин
              </h4>
            ) : (
              <h4>{project.duration} мин</h4>
            )}
          </div>
          <img className="img-container" src={project.media.coverImage} alt='cover image' />
        <div className="moderation-data">
            <div className="string-moderation-data">
                <h4 className="h4-grey">Добавил: </h4>
                <h4>{project.createdBy}</h4>
            </div>
            <div className="string-moderation-data">
                <h4 className="h4-grey">Дата добавления: </h4>
                <h4>{formatDate(project.createdAt)}</h4>
            </div>
            <div className="string-moderation-data">
                <h4 className="h4-grey">Дата обновления: </h4>
                <h4>{formatDate(project.updatedAt)}</h4>
            </div>
        </div>
        </div>
      </div>
    </div>
  );
}

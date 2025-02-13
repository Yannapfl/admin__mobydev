import { useNavigate, useParams } from "react-router-dom";
import "./ProjectInfo.css";
import clock from "../../../assets/icons/black_clock.svg";
import television from "../../../assets/icons/info_categories.svg";
import clapperBoard from "../../../assets/icons/clapper-board.svg";
import { getPluralForm } from "../../../utils/pluralForm";
import { formatDate } from "../../../utils/formateDate";
import arrowRight from "../../../assets/icons/arrow-right.svg";
import eye from "../../../assets/icons/eye.svg";
import star from "../../../assets/icons/star.svg";
import share from "../../../assets/icons/share.svg";
import wastebasket from "../../../assets/icons/wastebasket_white.svg";
import { useContext, useState } from "react";
import VideoPlayer from "../../../components/VideoPlayer/VideoPlayer";
import DataContext from "../../../contexts/DataContext";
import { useModalManager } from "../../../components/Modals/useModalManager";
import { ModalFactory } from "../../../components/Modals/ModalFactory";
import useRoleAccess from "../../../utils/useRoleAccess";

export default function ProjectInfo() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { data, deleteEntity } = useContext(DataContext);
  const { modalType, modalProps, openModal, closeModal } = useModalManager();
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [selectedEpisode, setSelectedEpisode] = useState(1);
  const { canEdit } = useRoleAccess();
  const editKey = "projects";

  const project = data.projects.find((proj) => proj.id === parseInt(projectId));
  const maxCountEpisodesInLine = 10;

  const seasonsText = `${project.video.seasonCount} ${getPluralForm(
    project.video.seasonCount,
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

  const handleSeasonChange = (season) => {
    setSelectedSeason(season);
    setSelectedEpisode(1);
  };

  const handleEpisodeChange = (episode) => {
    setSelectedEpisode(episode);
  };

  return (
    <div className="project">
      <div className="background-grey">
        <div className="project-path">
          <button
            className="btn-text btn-img"
            onClick={() => navigate("/projects")}
          >
            Проекты
          </button>
          <img src={arrowRight} alt="arrow" />
          <h4>{project.title}</h4>
        </div>

        {/* Основная карточка */}
        <div className="project-info-content">
          <div className="project-info-header">
            <div className="title-with-stats">
              <h1 className="m-0">{project.title}</h1>
              <div className="project-info-stats">
                <div className="project-info-stat">
                  <img src={eye} alt="eye" />
                  <h4>{project.stats.views.toLocaleString("ru-RU")}</h4>
                </div>
                <div className="project-info-stat">
                  <img src={star} alt="star" />
                  <h4>{project.stats.favorites.toLocaleString("ru-RU")}</h4>
                </div>
                <div className="project-info-stat">
                  <img src={share} alt="share" />
                  <h4>{project.stats.shares.toLocaleString("ru-RU")}</h4>
                </div>
              </div>
            </div>
            <div className="project-info-btn-group">
              <button
                disabled={!canEdit(editKey)}
                style={{ opacity: canEdit(editKey) ? 1 : 0.5 }}
                className="btn-grey"
                onClick={() => navigate(`/projects/edit/${projectId}`)}
              >
                Редактировать
              </button>
              <button
                disabled={!canEdit(editKey)}
                style={{ opacity: canEdit(editKey) ? 1 : 0.5 }}
                className="btn-red"
                onClick={() =>
                  openModal("delete", {
                    label: "проект",
                    onConfirm: () => {
                      deleteEntity("projects", project.id);
                      closeModal();
                      navigate("/projects");
                    },
                  })
                }
              >
                <img src={wastebasket} alt="wastebasket" />
              </button>
            </div>
          </div>

          {/* video and switchers */}
          {(() => {
            switch (project.type) {
              case "Фильм":
                return (
                  <div className="project-video-block">
                    <VideoPlayer videoId={project.video.videoId} />
                  </div>
                );
              case "Сериал":
                return (
                  <div className="switcher-block">
                    <div className="project-video-block">
                      {
                        <VideoPlayer
                          videoId={
                            project.video.episodes.find(
                              (ep) =>
                                ep.season === selectedSeason &&
                                ep.episode === selectedEpisode
                            )?.videoId
                          }
                        />
                      }
                    </div>
                    <div className="switcher-seasons">
                      {Array.from({ length: project.video.seasonCount }).map(
                        (_, index) => (
                          <button
                            key={index}
                            className={`btn-season${
                              selectedSeason === index + 1 ? " active" : ""
                            }`}
                            onClick={() => handleSeasonChange(index + 1)}
                          >
                            {index + 1} сезон
                          </button>
                        )
                      )}
                    </div>
                    <div className="switcher-episodes">
                      {project.video.episodes
                        .filter((ep) => ep.season === selectedSeason)
                        .map((ep, index) => (
                          <button
                            key={index}
                            className={`btn-img btn-episode ${
                              selectedEpisode === index + 1 ? "active" : ""
                            }`}
                            onClick={() => handleEpisodeChange(ep.episode)}
                          >
                            {ep.episode} серия
                          </button>
                        ))}
                    </div>
                    <div className="project-info-line">
                      {selectedEpisode && (
                        <div className="wrapper-active-line">
                          <div
                            className="active-line"
                            style={{
                              left: `${
                                ((selectedEpisode - 1) %
                                  maxCountEpisodesInLine) *
                                (100 / maxCountEpisodesInLine)
                              }%`,
                            }}
                          ></div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              default:
                throw new Error("Error project.type");
            }
          })()}

          {/* description and info */}
          <div className="project-info-description">
            <h1>Описание</h1>
            <h3>{project.description}</h3>
          </div>
          <div className="project-info-authors">
            <div className="project-info-author">
              <p>Режиссер:</p>
              <h3>{project.director}</h3>
            </div>
            <div className="project-info-author">
              <p>Продюсер:</p>
              <h3>{project.producer}</h3>
            </div>
          </div>
          <div className="project-info-line"></div>

          <div className="project-info-screenshots">
            <h1>Скриншоты</h1>
            <div className="project-info-screenshots-group">
              {project.media.screenShots.map((screenshotObj) => (
                <div key={screenshotObj.id} className="img-container">
                  <img
                    key={screenshotObj.id}
                    className="project-info-screenshot"
                    src={screenshotObj.image}
                    alt="screenshot"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Белое инфо сбоку */}
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
            {project.type === "Сериал" ? (
              <h4>
                {seasonsText}, {episodesText}, {project.duration} мин
              </h4>
            ) : (
              <h4>{project.duration} мин</h4>
            )}
          </div>
          <div className="project-img-container">
            <img src={project.media.coverImage} alt="cover image" />
          </div>
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
      {modalType && (
        <ModalFactory
          type={modalType}
          modalProps={{
            ...modalProps,
            label: "проект",
            onDelete: () => {
              deleteEntity("projects", modalProps.entity?.id);
              closeModal();
            },
            closeModal,
          }}
        />
      )}
    </div>
  );
}

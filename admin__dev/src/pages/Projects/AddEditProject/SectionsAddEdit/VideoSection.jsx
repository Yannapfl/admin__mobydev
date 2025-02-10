import { useState, useEffect, useCallback } from "react";
import NumericStepperInput from "../../../../components/NumericStepperInput/NumericStepperInput";
import SeasonRender from "../../../../components/SeasonRender/SeasonRender";
import { createArrayTo } from "../../../../utils/createArrayTo";
import VideoPlayer from "../../../../components/VideoPlayer/VideoPlayer";
import wastebasket from '../../../../assets/icons/wastebasket.svg';
import PropTypes from 'prop-types';
import { checkFilled } from "../../../../utils/checkFilled";

export default function VideoSection({
  selectedType,
  tempProject,
  setTempProject,
  setIsFilledSection,
}) {
  const [selectedCountSeasons, setSelectedCountSeasons] = useState(tempProject.video?.seasonCount || 0);
  const [selectedCountEpisodes, setSelectedCountEpisodes] = useState(tempProject.video?.episodes || []);
  const [movieVideoId, setMovieVideoId] = useState('');

  const checkIfFilled = useCallback(() => {
    if (selectedType === 'Фильм') {
      setIsFilledSection(checkFilled(movieVideoId));
    } else if (selectedType === 'Сериал') {
      const areAllEpisodesFilled = selectedCountEpisodes.every(episode => checkFilled(episode.videoId));
      setIsFilledSection(areAllEpisodesFilled);
    }
  }, [movieVideoId, selectedType, selectedCountEpisodes, setIsFilledSection]);

  useEffect(() => {
    if (selectedType === 'Фильм') {
      setMovieVideoId(tempProject.video?.videoId || "");
      setSelectedCountSeasons(0);
      setSelectedCountEpisodes([]);
    } else if (selectedType === 'Сериал') {
      setMovieVideoId("");
      setSelectedCountSeasons(tempProject.video?.seasonCount || 1);
      setSelectedCountEpisodes(tempProject.video?.episodes || [{ season: 1, episode: 1, videoId: '', id: Date.now() }]);
    }
    checkIfFilled();
  }, [selectedType, tempProject.video, checkIfFilled]);

  const arraySeasonsCount = createArrayTo(selectedCountSeasons);

  const handleChangeVideoId = (value) => {
    setMovieVideoId(value);
    setTempProject((prev) => ({
      ...prev,
      video: {
        ...prev.video,
        videoId: value,
      },
    }));
  };

  const handleSeasonCountChange = (value) => {
    setSelectedCountSeasons(value);
    setTempProject((prev) => ({
      ...prev,
      video: {
        ...prev.video,
        seasonCount: value,
      },
    }));
  };

  const handleEpisodesChange = useCallback((seasonNumber, newEpisodes) => {
    setSelectedCountEpisodes((prevEpisodes) => {
      const otherEpisodes = prevEpisodes.filter(episode => episode.season !== seasonNumber);
      const updatedEpisodes = [...otherEpisodes, ...newEpisodes];

      setTempProject((prev) => ({
        ...prev,
        video: {
          ...prev.video,
          episodes: updatedEpisodes,
        },
      }));
      return updatedEpisodes;
    });
  }, [setTempProject]);

  return (
    <div className="video-section-block">
      {selectedType === "Сериал" && selectedCountSeasons > 0 && (
        <>
          <div className="wrapper-video-input">
            <NumericStepperInput
              placeholder="Количество сезонов"
              selectedValue={selectedCountSeasons}
              setSelectedValue={handleSeasonCountChange}
            />
          </div>
          <div className="wrapper-season-render">
            {arraySeasonsCount.map((seasonNumber, index) => {
              const isLastSeason = index === arraySeasonsCount.length - 1;
              return (
                <SeasonRender
                  seasonNumber={seasonNumber}
                  episodes={selectedCountEpisodes.filter(ep => ep.season === seasonNumber)}
                  key={seasonNumber}
                  isLastSeason={isLastSeason}
                  onEpisodesChange={(newEpisodes) => handleEpisodesChange(seasonNumber, newEpisodes)}
                />
              );
            })}
          </div>
        </>
      )}

      {selectedType === "Фильм" && (
        <div className="wrapper-movie-video">
          <div className="video-input-flex">
            <div className="input-wrapper-main-info">
              <input
                type="text"
                value={movieVideoId || ""}
                onChange={(e) => handleChangeVideoId(e.target.value)}
                className={`input-main-info ${!movieVideoId ? "" : "filled"}`}
                placeholder={`Youtube Video ID`}
              />
              {movieVideoId !== "" && (
                <p className="input-label-projects">Youtube Video ID</p>
              )}
            </div>
            <button className="btn-img" onClick={() => handleChangeVideoId("")}>
              <img src={wastebasket} alt="wastebasket" />
            </button>
          </div>
          {movieVideoId !== "" && (
            <div className="wrapper-preview-video-episode">
              <VideoPlayer videoId={movieVideoId} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

VideoSection.propTypes = {
  selectedType: PropTypes.string,
  tempProject: PropTypes.shape({
    video: PropTypes.shape({
      seasonCount: PropTypes.number,
      videoId: PropTypes.string,
      episodes: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          season: PropTypes.number,
          episode: PropTypes.number,
          videoId: PropTypes.string,
        })
      ),
    }),
  }).isRequired,
  setTempProject: PropTypes.func.isRequired,
  setIsFilledSection: PropTypes.func.isRequired,
};

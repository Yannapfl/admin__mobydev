import { useState, useEffect, useCallback } from "react";
import NumericStepperInput from "../../../../components/NumericStepperInput/NumericStepperInput";
import SeasonRender from "../../../../components/SeasonRender/SeasonRender";
import PropTypes from 'prop-types';
import { checkFilled } from "../../../../utils/checkFilled";
import { createArrayTo } from "../../../../utils/createArrayTo";

export default function VideoSection({
  tempProject,
  setTempProject,
  setIsFilledSection,
}) {
  
  const [selectedCountSeasons, setSelectedCountSeasons] = useState(tempProject.video?.seasonCount || 1);
  const [selectedCountEpisodes, setSelectedCountEpisodes] = useState(tempProject.video?.episodes || []);

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

  useEffect(() => {
    const areAllEpisodesFilled = (tempProject.video?.episodes || []).every(episode => checkFilled(episode.videoLink));
    setIsFilledSection(areAllEpisodesFilled);
}, [ tempProject.video, setIsFilledSection]);

const handleEpisodesChange = useCallback((seasonNumber, newEpisodes) => {
  setSelectedCountEpisodes((prevEpisodes) => {
    const updatedEpisodes = prevEpisodes.filter(episode => episode.seasonId !== seasonNumber)
      .concat(newEpisodes);

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

  const arraySeasonsCount = createArrayTo(selectedCountSeasons);

  return (
    <div className="video-section-block">
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
                  episodes={selectedCountEpisodes.filter(ep => ep.seasonId === seasonNumber)}
                  key={seasonNumber}
                  isLastSeason={isLastSeason}
                  onEpisodesChange={(newEpisodes) => handleEpisodesChange(seasonNumber, newEpisodes)}
                />
              );
            })}
          </div>
        </>
    </div>
  );
}

VideoSection.propTypes = {
   tempProject: PropTypes.shape({
    video: PropTypes.shape({
      seasonCount: PropTypes.number,
      episodes: PropTypes.arrayOf(
        PropTypes.shape({
          seasonId: PropTypes.number,
          episode: PropTypes.number,
          videoLink: PropTypes.string,
        })
      ),
    }),
  }).isRequired,
  setTempProject: PropTypes.func.isRequired,
  setIsFilledSection: PropTypes.func.isRequired,
};
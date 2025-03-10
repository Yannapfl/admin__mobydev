import { useEffect, useState } from 'react';
import './SeasonRender.css';
import wastebasket from '../../assets/icons/wastebasket.svg';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import PropTypes from "prop-types";

export default function SeasonRender({ seasonNumber, episodes, isLastSeason, onEpisodesChange }) {
  const [tempEpisodes, setEpisodes] = useState(
    episodes.length > 0 ? episodes : [{ seasonId: seasonNumber, episode: 1, videoLink: '' }]
  );

  const seasonEpisodes = tempEpisodes.filter((episode) => episode.seasonId === seasonNumber);

  const handleChangeVideoId = (id, value) => {
    const updatedEpisodes = tempEpisodes.map((episode) =>
      episode.episode === id ? { ...episode, videoLink: value } : episode
    );
    setEpisodes(updatedEpisodes);
  };

  const handleRemoveEpisode = (id) => {
    const updatedSeasonEpisodes = seasonEpisodes.filter((episode) => episode.episode !== id);
    
    if (updatedSeasonEpisodes.length === 0) {
      alert('В сезоне должна быть хотя бы 1 серия');
      return;
    }

    const reorderedEpisodes = updatedSeasonEpisodes.map((episode, index) => ({
      ...episode,
      episode: index + 1,
    }));

    const updatedEpisodes = [
      ...tempEpisodes.filter((episode) => episode.seasonId !== seasonNumber),
      ...reorderedEpisodes,
    ];

    setEpisodes(updatedEpisodes);
  };

  const handleAddEpisode = () => {
    const nextEpisodeNumber =
      seasonEpisodes.length > 0 ? Math.max(...seasonEpisodes.map((ep) => ep.episode)) + 1 : 1;

    const newEpisode = {
      seasonId: seasonNumber,
      episode: nextEpisodeNumber,
      videoLink: '',
    };

    setEpisodes([...tempEpisodes, newEpisode]);
  };

  useEffect(() => {
    if (JSON.stringify(tempEpisodes) !== JSON.stringify(episodes)) {
      onEpisodesChange(tempEpisodes);
    }
  }, [tempEpisodes, episodes, onEpisodesChange]);

  return (
    <div className='season-render'>
      <h1>{seasonNumber} сезон</h1>
      {seasonEpisodes.map((item) => (
        <div className='episodes-block' key={item.episode}>
          <div className='video-episode-block'>
            <div className='video-input-flex'>
              <div className='input-wrapper-main-info'>
                <input
                  type="text"
                  value={item.videoLink}
                  onChange={(e) => handleChangeVideoId(item.episode, e.target.value)}
                  className={`input-main-info ${
                    !item.videoLink ? "" : "filled"
                  }`}
                  placeholder={`${item.episode} серия / Youtube Video ID`}
                />
                {item.videoLink && (
                  <p className="input-label-projects">{item.episode} серия / Youtube Video ID</p>
                )}
              </div>
              <button className='btn-img' onClick={() => handleRemoveEpisode(item.episode)}>
                <img src={wastebasket} alt='wastebasket' />
              </button>
            </div>
            {item.videoLink && (
              <div className='wrapper-preview-video-episode'>
                <VideoPlayer videoId={item.videoLink} />
              </div>
            )}
          </div>
        </div>
      ))}
      <button className='btn-text-blue btn-img' onClick={handleAddEpisode}>Добавить серию</button>
      {!isLastSeason && <div className='project-info-line'></div>}
    </div>
  );
}

SeasonRender.propTypes = {
  seasonNumber: PropTypes.number.isRequired,
  episodes: PropTypes.arrayOf(
    PropTypes.shape({
      seasonId: PropTypes.number.isRequired,
      episode: PropTypes.number.isRequired,
      videoLink: PropTypes.string
    })
  ).isRequired,
  isLastSeason: PropTypes.bool.isRequired,
  onEpisodesChange: PropTypes.func.isRequired,
};

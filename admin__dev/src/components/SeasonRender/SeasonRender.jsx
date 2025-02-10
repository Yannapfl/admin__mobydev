import { useEffect, useState } from 'react';
import './SeasonRender.css';
import wastebasket from '../../assets/icons/wastebasket.svg';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import PropTypes from "prop-types";

export default function SeasonRender({ seasonNumber, episodes, isLastSeason, onEpisodesChange }) {
  const [tempEpisodes, setEpisodes] = useState(
    episodes.length > 0 ? episodes : [{ season: seasonNumber, episode: 1, videoId: '', id: Date.now() }]
  );

  const seasonEpisodes = tempEpisodes.filter((episode) => episode.season === seasonNumber);

  const handleChangeVideoId = (id, value) => {
    const updatedEpisodes = tempEpisodes.map((episode) =>
      episode.id === id ? { ...episode, videoId: value } : episode
    );
    setEpisodes(updatedEpisodes);
  };

  const handleRemoveEpisode = (id) => {
    const updatedSeasonEpisodes = seasonEpisodes.filter((episode) => episode.id !== id);
    
    if (updatedSeasonEpisodes.length === 0) {
      alert('В сезоне должна быть хотя бы 1 серия');
      return;
    }

    const reorderedEpisodes = updatedSeasonEpisodes.map((episode, index) => ({
      ...episode,
      episode: index + 1,
    }));

    const updatedEpisodes = [
      ...tempEpisodes.filter((episode) => episode.season !== seasonNumber),
      ...reorderedEpisodes,
    ];

    setEpisodes(updatedEpisodes);
  };

  const handleAddEpisode = () => {
    const nextEpisodeNumber =
      seasonEpisodes.length > 0 ? Math.max(...seasonEpisodes.map((ep) => ep.episode)) + 1 : 1;

    const newEpisode = {
      season: seasonNumber,
      episode: nextEpisodeNumber,
      videoId: '',
      id: Date.now(),
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
        <div className='episodes-block' key={item.id}>
          <div className='video-episode-block'>
            <div className='video-input-flex'>
              <div className='input-wrapper-main-info'>
                <input
                  type="text"
                  value={item.videoId}
                  onChange={(e) => handleChangeVideoId(item.id, e.target.value)}
                  className={`input-main-info ${
                    !item.videoId ? "" : "filled"
                  }`}
                  placeholder={`${item.episode} серия / Youtube Video ID`}
                />
                {item.videoId && (
                  <p className="input-label-projects">{item.episode} серия / Youtube Video ID</p>
                )}
              </div>
              <button className='btn-img' onClick={() => handleRemoveEpisode(item.id)}>
                <img src={wastebasket} alt='wastebasket' />
              </button>
            </div>
            {item.videoId && (
              <div className='wrapper-preview-video-episode'>
                <VideoPlayer videoId={item.videoId} />
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
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      season: PropTypes.number.isRequired,
      episode: PropTypes.number.isRequired,
      videoId: PropTypes.string
    })
  ).isRequired,
  isLastSeason: PropTypes.bool.isRequired,
  onEpisodesChange: PropTypes.func.isRequired,
};

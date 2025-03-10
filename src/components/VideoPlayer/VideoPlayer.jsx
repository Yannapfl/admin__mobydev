import { useRef, useState } from 'react'
import './VideoPlayer.css'
import PropTypes from "prop-types";

export default function VideoPlayer({ videoId }) {
    const [isPlaying, setIsPlaying ] = useState(false);
    const videoRef = useRef(null);

    const handlePlayVideo = () => {
        if (videoRef.current) {
          if (isPlaying) {
            videoRef.current.pause();
          } else {
            videoRef.current.play();
          }
          setIsPlaying(!isPlaying);
        }
    };

    return (
        <div className='video-player-block'>
            {videoId ? (
                <>
                    <div className='video-player'>{videoId}</div>
                    <button className='btn-play' onClick={handlePlayVideo}>
                        {isPlaying ? '⏸' : '🞂'}
                    </button>
                </>
            ) : (
                <p>Видео не найдено</p>
            )}
        </div>
    )
}

VideoPlayer.propTypes = {
    videoId: PropTypes.string,
  };
  
  VideoPlayer.defaultProps = {
    videoId: "",
  };
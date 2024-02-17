import React, { useEffect, useRef, memo } from 'react'
import PropTypes from 'prop-types'

function PlayPauseAnimatedButton({ isVideoPlaying }) {
  const iconContainerRef = useRef(null);
  const avoidFirstRender = useRef(true)

  useEffect(() => {
    console.log(avoidFirstRender.current, 'avoidFirstRender.current')
    if(avoidFirstRender.current){
      avoidFirstRender.current = false
      return ;
    }

    if (iconContainerRef.current) {
      iconContainerRef.current.style.display = "flex";
    }

    const timerId = setTimeout(() => {
      if (iconContainerRef.current) {
        iconContainerRef.current.style.display = "none";
      }
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [isVideoPlaying]);


  return (
    <div ref={iconContainerRef} className='video-w-10 video-hidden video-h-10 video-items-center video-justify-center video-p-3 video-bg-opacity-50 video-bg-black video-rounded-full  video-animate-fadeout'>
      {isVideoPlaying ? (
        <picture>
          <source srcSet={require('../images/webp/pauseButton.webp')} type="image/webp" />
          <img
            src={require('../images/png/pauseButton.png')}
            width={'32px'}
            height={'32px'}
            alt={`pauseButton`}
          />
        </picture>
      ) : (
        <picture>
          <source srcSet={require('../images/webp/playButton.webp')} type="image/webp" />
          <img
            src={require('../images/png/playButton.png')}
            width={'32px'}
            height={'32px'}
            alt={`playButton`}
          />
        </picture>
      )}
    </div>
  )
}

PlayPauseAnimatedButton.propTypes = {}

export default memo(PlayPauseAnimatedButton)

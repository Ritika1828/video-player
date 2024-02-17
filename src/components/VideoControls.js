import React, {useState} from 'react'
import formatTime from '../utils/formatTime'
import { DEFAULT_PLAYBACK_SPEED, PLAY_BACK_SPEED } from '../constant/videoControl'
import PropTypes from 'prop-types'
import SeekBar from './SeekBar'

const getTimeFormatUI = (videoCurrentTime) => {
        const timeFormat = formatTime(videoCurrentTime)
        return `${timeFormat.minutes > 9 ? timeFormat.minutes : `0${timeFormat.minutes}` } : ${timeFormat.seconds > 9 ? timeFormat.seconds : `0${timeFormat.seconds}`}`
}

const PlayBackPopUp = ({handlePlayBack, selectedPlayBack=DEFAULT_PLAYBACK_SPEED}) => {
    return (
        <div className=' video-absolute video-py-1 video-bg-black video-w-24 video-bottom-10 video-h-32 lg:video-h-auto video-overflow-auto video-left-[-60px]'>
            {
                PLAY_BACK_SPEED.map((data, index)=> {
                    return (
                    <div  key={index} onClick={()=> handlePlayBack(data)} className=' hover:video-bg-slate-400 video-relative video-text-white video-p-3 video-text-center '>
                        {data.text}
                        {
                           selectedPlayBack ===  data.text ? (<div className='video-absolute video-w-2 video-h-2 video-rounded-full video-bg-fuchsia-500 video-right-3 video-top-4'></div>) : (null)
                        }
                    </div>
                    )
                   
                })
            }
        </div>
    )
}

function VideoControls({videoCurrentTime, totalVideoduration, videoBufferedTime, updateSeek, videoPlayBackRate, handlePlayBack,  updateVideoCurrentTime, isVideoPlaying, togglePlay}) {
    const [showPlayBackPopup, setShowPlayBackPopup] = useState(false)

  return (
    <div className=' video-bg-transparent video-w-full video-flex video-flex-col video-justify-end'>
        <div className=' video-flex video-justify-between'>
            <SeekBar videoCurrentTime={videoCurrentTime} totalVideoduration={totalVideoduration} updateSeek={updateSeek} updateVideoCurrentTimer={updateVideoCurrentTime} videoBufferedTime={videoBufferedTime}/>
        </div>
       
        <div className=' video-py-2 video-flex video-justify-between video-px-3'>
        <div className=' video-flex'>
            <div onClick={togglePlay} className=' video-cursor-pointer'>
            {isVideoPlaying ? (
              <picture>
              <source srcSet={require('../images/webp/pauseButton.webp')} type="image/webp" />
              <img
                  src={require('../images/png/pauseButton.png')}
                  width={'16px'}
                  height={'16px'}
                  alt={`pauseButton`}
              />
          </picture>
        ) :(
            <picture>
            <source srcSet={require('../images/webp/playButton.webp')} type="image/webp" />
            <img
                src={require('../images/png/playButton.png')}
                width={'16px'}
                height={'16px'}
                alt={`playButton`}
            />
        </picture>
        ) }
            </div>

            <div className=' video-ml-1 video-text-xs video-text-white '>
                {getTimeFormatUI(videoCurrentTime)} / {getTimeFormatUI(totalVideoduration)}
            </div>
        </div>
        <div>
            <div className=' video-relative video-text-xs video-text-black video-bg-white video-w-12 video-text-center video-py-1 video-font-bold video-cursor-pointer' onClick={()=> setShowPlayBackPopup((prev)=> !prev)}>
                {videoPlayBackRate.text}
                {
                    showPlayBackPopup ? ( <PlayBackPopUp handlePlayBack={handlePlayBack} selectedPlayBack={videoPlayBackRate.text}/>
                    ): null
                }
            </div>
        </div>
        </div>
        
    </div>
  )
}

VideoControls.propTypes = {
    videoCurrentTime: PropTypes.number,
    totalVideoduration: PropTypes.number,
    videoBufferedTime: PropTypes.number,

}

export default VideoControls

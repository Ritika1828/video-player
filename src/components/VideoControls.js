import React, { useState } from "react";
import SeekBar from "./SeekBar";
import StaticImageLoader from "../shared/StaticImageLoader";
import VolumeControl from "./VolumeControl";
import formatTime from "../utils/formatTime";
import {
  DEFAULT_PLAYBACK_SPEED,
  PLAY_BACK_SPEED,
} from "../constant/videoControl";
import PropTypes from "prop-types";

/**
 *
 * @param {*} time  - provide time in seconds
 * @returns - return time format as xx:xx
 */
const getTimeFormatUI = (time) => {
  const timeFormat = formatTime(time);
  return `${
    timeFormat.minutes > 9 ? timeFormat.minutes : `0${timeFormat.minutes}`
  } : ${
    timeFormat.seconds > 9 ? timeFormat.seconds : `0${timeFormat.seconds}`
  }`;
};

/**
 *
 * @param {handlePlayBack}  - click handler to select play back speed
 * @param {selectedPlayBack}  - have information about the selected play back speed
 * @returns - JSX
 */

const PlayBackPopUp = ({
  handlePlayBack,
  selectedPlayBack = DEFAULT_PLAYBACK_SPEED,
}) => {
  return (
    <div className=" video-absolute video-py-1 video-bg-black video-w-24 video-bottom-10 video-h-32 lg:video-h-auto video-overflow-auto video-left-[-60px]">
      {PLAY_BACK_SPEED.map((data, index) => {
        return (
          <div
            key={index}
            onClick={() => handlePlayBack(data)}
            className=" hover:video-bg-slate-400 video-relative video-text-white video-p-3 video-text-center "
          >
            {data.text}
            {selectedPlayBack === data.text ? (
              <div className="video-absolute video-w-2 video-h-2 video-rounded-full video-bg-fuchsia-500 video-right-3 video-top-4"></div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

function VideoControls({
  videoCurrentTime,
  totalVideoduration,
  videoBufferedTime,
  updateSeek,
  videoPlayBackRate,
  handlePlayBack,
  updateVideoCurrentTime,
  isVideoPlaying,
  togglePlay,
  videoVolume,
  updateVideoVolumeProgress,
  updateVideoVolume,
  toggleVolumeState,
  isFullScreen = false,
  toggleFullScreen,
}) {
  const [showPlayBackPopup, setShowPlayBackPopup] = useState(false);

  return (
    <div className=" video-bg-transparent video-w-full video-flex video-flex-col video-justify-end">
      <div className=" video-flex video-justify-between">
        <SeekBar
          videoCurrentTime={videoCurrentTime}
          totalVideoduration={totalVideoduration}
          updateSeek={updateSeek}
          updateVideoCurrentTimer={updateVideoCurrentTime}
          videoBufferedTime={videoBufferedTime}
        />
      </div>

      <div className=" video-pb-2 video-flex video-justify-between video-px-3">
        <div className=" video-flex video-items-center">
          <div onClick={togglePlay} className=" video-cursor-pointer">
            {isVideoPlaying ? (
              // <picture>
              //     <source srcSet={require('../../public/webp/pauseButton.webp')} type="image/webp" />
              //     <img
              //         src={require('../../public/png/pauseButton.png')}
              //         width={'16px'}
              //         height={'16px'}
              //         alt={`pauseButton`}
              //     />
              // </picture>
              <StaticImageLoader
                source="pauseButton"
                width={"16px"}
                height={"16px"}
              />
            ) : (
              //   <picture>
              //     <source
              //       srcSet={require("../../public/webp/playButton.webp")}
              //       type="image/webp"
              //     />
              //     <img
              //       src={require("../../public/png/playButton.png")}
              //       width={"16px"}
              //       height={"16px"}
              //       alt={`playButton`}
              //     />
              //   </picture>
              <StaticImageLoader
                source="playButton"
                width={"16px"}
                height={"16px"}
              />
            )}
          </div>

          <div className=" video-select-none video- video-ml-1 video-w-24 video-text-xs video-text-white ">
            {getTimeFormatUI(videoCurrentTime)} /{" "}
            {getTimeFormatUI(totalVideoduration)}
          </div>
          <div>
            <VolumeControl
              videoVolume={videoVolume}
              updateVideoVolumeProgress={updateVideoVolumeProgress}
              updateVideoVolume={updateVideoVolume}
              toggleVolumeState={toggleVolumeState}
            />
          </div>
        </div>
        <div className=" video-flex video-items-center">
          <div
            className=" video-relative video-text-xs video-text-black video-bg-white video-w-12 video-text-center video-py-1 video-font-bold video-cursor-pointer"
            onClick={() => setShowPlayBackPopup((prev) => !prev)}
          >
            {videoPlayBackRate.text}
            {showPlayBackPopup ? (
              <PlayBackPopUp
                handlePlayBack={handlePlayBack}
                selectedPlayBack={videoPlayBackRate.text}
              />
            ) : null}
          </div>
          <div
            onClick={toggleFullScreen}
            className=" video-ml-2 video-cursor-pointer video-select-none"
          >
            {isFullScreen ? (
              //   <picture>
              //     <source
              //       srcSet={require("../../public/webp/minimizeScreen.webp")}
              //       type="image/webp"
              //     />
              //     <img
              //       src={require("../../public/png/minimizeScreen.png")}
              //       width={"16px"}
              //       height={"16px"}
              //       alt={`minimizeScreen`}
              //     />
              //   </picture>
              <StaticImageLoader
                source="minimizeScreen"
                width={"16px"}
                height={"16px"}
              />
            ) : (
              //   <picture>
              //     <source
              //       srcSet={require("../../public/webp/fullScreenIcon.webp")}
              //       type="image/webp"
              //     />
              //     <img
              //       src={require("../../public/png/fullScreenIcon.png")}
              //       width={"16px"}
              //       height={"16px"}
              //       alt={`fullScreenIcon`}
              //     />
              //   </picture>
              <StaticImageLoader
                source="fullScreenIcon"
                width={"16px"}
                height={"16px"}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

VideoControls.propTypes = {
  videoCurrentTime: PropTypes.number, // give information about video current running time
  totalVideoduration: PropTypes.number, // give information about video total duration
  videoBufferedTime: PropTypes.number, // give information about video buffered duration
  updateSeek: PropTypes.func, // action to update the seek state
  videoPlayBackRate: PropTypes.shape({
    text: PropTypes.string, // used to show playback Speed in UI
    multiplier: PropTypes.number, // used to update the playback Speed of video
  }),
  handlePlayBack: PropTypes.func, // action to handle the video play speed
  updateVideoCurrentTime: PropTypes.func, // action to update video current running time,
  isVideoPlaying: PropTypes.bool, // provide check on whether the video is playing or not
  togglePlay: PropTypes.func, // action to play/pause the video
  videoVolume: PropTypes.number, // information about current volume of state of video,
  updateVideoVolumeProgress: PropTypes.func, // action to update the volume progress state,
  updateVideoVolume: PropTypes.func, // action to update the volume of the video,
  toggleVolumeState: PropTypes.func, // toggle between mute/unmute video,
  isFullScreen: PropTypes.bool, // give information about is video viewed in full screen or not
  toggleFullScreen: PropTypes.func, // action to toggle b/w normal/full screen
};

export default VideoControls;

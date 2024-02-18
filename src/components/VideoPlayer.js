import React, { useEffect, useState, useRef, useCallback } from "react";
import VideoControls from "./VideoControls";
import Loader from "../shared/Loader";
import PlayPauseAnimatedButton from "./PlayPauseAnimatedButton";
import { DEFAULT_PLAYBACK_SPEED } from "../constant/videoControl";
import { localStorageSave } from "../utils/storage";
import { useDeviceInfo } from "../customHook/useDeviceInfo";
import  throttle  from "lodash/throttle";
import PropTypes from "prop-types";

function VideoPlayer({
  videoUrl,
  id,
  thumb,
  handleNextVideoPlay,
  seekAt = null,
}) {
  const videoRef = useRef(null);
  const videoContainerRef = useRef(null);
  const [videoLoading, setVideoLoading] = useState(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [showVideoControl, setShowVideoControl] = useState(false);
  const [showPlayAnimation, setShowPlayAnimation] = useState(false);
  const [totalVideoduration, setTotalVideoDuration] = useState(0);
  const [videoCurrentTime, setVideoCurrentTime] = useState(0);
  const [videoBufferedTime, setVideoBufferedTime] = useState(0);
  const [videoPlayBackRate, setVideoPlayBackRate] = useState(
    DEFAULT_PLAYBACK_SPEED
  );
  const [seekProgress, setSeekProgress] = useState(0);
  const [volumeProgress, setVolumeProgress] = useState(0);
  const [videoEnded, setVideoEnded] = useState(false);
  const [isTouchActivated, setIsTouchActivated] = useState(false);
  const [isDisableClick, setDisableClick] = useState(true);
  const [videoVolume, setVideoVolume] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const { isMobile } = useDeviceInfo();

  /**
   * function used to toggle b/w play/pause of video
   */
  const handlePlayPause = useCallback(() => {
    setShowPlayAnimation(true);
    if (isVideoPaused()) {
      videoRef.current.play();
      setIsVideoPlaying(true);
    } else {
      videoRef.current.pause();
      setIsVideoPlaying(false);
    }
  }, [videoRef.current]);

  /**
   * function used to update the slider progress and video current running time
   * @param {Number} percent
   * @param {Boolean} isDragged
   */
  const updateSeek = (percent, isDragged) => {
    setSeekProgress(percent);
    if (isDragged) {
      videoRef.current.pause();
      setVideoCurrentTime((percent * totalVideoduration) / 100);
    }
  };

  /**
   * function used to set the total video play duration
   */
  const handleDurationChange = () => {
    const videoPlayer = videoRef.current;
    setTotalVideoDuration(videoPlayer.duration);
  };

  /**
   *  function used to set the video current running time
   */
  const handleTimeUpdate = () => {
    const videoPlayer = videoRef.current;
    setVideoCurrentTime(videoPlayer.currentTime);
  };

  /**
   * function used to set the progress of buffered video stream.
   */
  const handleProgress = () => {
    const videoPlayer = videoRef.current;
    let bufferedEnd = 0;
    if (videoPlayer?.buffered.length > 0) {
      bufferedEnd = videoPlayer?.buffered?.end(0);
    }
    setVideoBufferedTime(bufferedEnd);
  };

  /**
   *  function used to set the playback video rate
   * @param {Number} val
   */
  const handlePlayBack = useCallback(
    (val) => {
      setVideoPlayBackRate(val);
      videoRef.current.playbackRate = val.multiplier;
    },
    [videoRef.current]
  );

  /**
   * function used to set the currentTime of video on mouseEnd
   */
  const updateVideoCurrentTime = () => {
    if (videoRef.current) {
      videoRef.current.play();
      videoRef.current.currentTime = (seekProgress * totalVideoduration) / 100;
    }
  };

  /**
   * function used to handle the video loading state
   */
  const handleVideoWaiting = useCallback(() => {
    setVideoLoading(true);
  }, [videoRef.current]);

  /**
   * check weather video is paused or not.
   * @returns - Boolean
   */

  const isVideoPaused = () => {
    if (videoRef.current)
      return videoRef.current.paused || videoRef.current.ended;
  };

  /**
   * function used to hide the video control
   * @returns
   */
  const handleHideControl = () => {
    if (isVideoPaused()) {
      return;
    }
    setShowVideoControl(false);
  };

  /**
   * function used to set state when  video is  Ended
   */
  const vidEnded = useCallback(() => {
    setVideoEnded(true);
  }, [videoRef.current]);

  /**
   * function used to update the slider progress and update video volume
   * @param {Number} percent
   * @param {Boolean} isDragged
   */
  const updateVideoVolumeProgress = (percent, isDragged) => {
    setVolumeProgress(percent);
    if (isDragged) {
      setVideoVolume(percent / 100);
    }
  };

  /**
   * function used to update video volume on mouse End Event
   */

  const updateVideoVolume = () => {
    videoRef.current.volume = volumeProgress / 100;
    setVideoVolume(volumeProgress / 100);
  };

  /**
   * function used to toggle b/w  normal and full screen
   */
  function toggleFullScreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else if (document.webkitFullscreenElement) {
      document.webkitExitFullscreen();
    } else if (
      videoContainerRef.current &&
      videoContainerRef.current.webkitRequestFullscreen
    ) {
      videoContainerRef.current.requestFullscreen();
      videoContainerRef.current &&
        videoContainerRef.current.webkitRequestFullscreen();
    } else {
      videoContainerRef.current &&
        videoContainerRef.current.requestFullscreen();
    }
  }

  /**
   * function used to toggle b/w muted and unmuted video
   */
  const toggleVolumeState = () => {
    if (videoRef.current.volume == 0) {
      videoRef.current.volume = 1;
      setVideoVolume(1);
    } else {
      videoRef.current.volume = 0;
      setVideoVolume(0);
    }
  };

  /**
   * function used to handle some keyboardEvent
   */
  function keyboardShortcuts(event) {
    const { key } = event;
    setShowVideoControl(true);
    switch (key) {
      case "k":
        handlePlayPause();
        break;
      case "m":
        toggleVolumeState();
        break;
      case "f":
        toggleFullScreen();
        break;
      default:
        break;
    }
  }

  /**
   * function used to call to set the current video state on browser close
   */
  const handleBeforeUnload = () => {
    if (videoRef.current) {
      const selectedVideo = localStorageSave("currentVideoPlayed");
      localStorageSave("currentVideoPlayed", {
        ...selectedVideo,
        seekAt: videoRef.current.currentTime,
      });
    }
  };
  /**
   * function used to toggle b/w video full scrren changed state
   */
  const fullscreenchanged = () => {
    if (document.fullscreenElement) {
      setIsFullScreen(true);
    } else {
      setIsFullScreen(false);
    }
  };

  const handleVideoPlay = useCallback(() => {
    setIsVideoPlaying(true);
    setVideoLoading(false);
  }, [videoRef.current]);

  useEffect(() => {
    let timeOut = null;
    if (videoEnded) {
      timeOut = setTimeout(() => {
        handleNextVideoPlay && handleNextVideoPlay(id);
        setVideoEnded(false);
      }, 1500);
    }
    return () => {
      clearTimeout(timeOut);
    };
  }, [videoEnded]);

  useEffect(() => {
    const videoPlayer = videoRef.current;
    if (videoPlayer) {
      setVideoPlayBackRate(DEFAULT_PLAYBACK_SPEED);
      videoPlayer.addEventListener("contextmenu", (e) => {
        e.preventDefault();
      });
      if (localStorageSave("videoVolume") != null) {
        videoPlayer.volume = Number(localStorageSave("videoVolume"));
        setVideoVolume(Number(localStorageSave("videoVolume")));
      } else {
        videoPlayer.volume = 1;
        setVideoVolume(1);
      }
      if (seekAt) {
        videoRef.current.currentTime = seekAt;
      }
      videoPlayer.addEventListener("play", handleVideoPlay);
      videoPlayer.addEventListener("durationchange", handleDurationChange);
      videoPlayer.addEventListener("timeupdate", handleTimeUpdate);
      videoPlayer.addEventListener("progress", handleProgress);
      videoPlayer.addEventListener("waiting", handleVideoWaiting);
      videoPlayer.addEventListener("playing", handleVideoPlay);
      videoPlayer.addEventListener("ended", vidEnded);
      window.addEventListener("beforeunload", handleBeforeUnload);
    }
    return () => {
      videoPlayer.removeEventListener("play", handleVideoPlay);
      videoPlayer.removeEventListener("durationchange", handleDurationChange);
      videoPlayer.removeEventListener("timeupdate", handleTimeUpdate);
      videoPlayer.removeEventListener("progress", handleProgress);
      videoPlayer.removeEventListener("waiting", handleVideoWaiting);
      videoPlayer.addEventListener("playing", handleVideoPlay);
      videoPlayer.removeEventListener("ended", vidEnded);
      window.addEventListener("beforeunload", handleBeforeUnload);
    };
  }, [videoUrl, videoRef.current]);

  useEffect(() => {
    let timeOut = null;
    if (!isTouchActivated && isMobile) {
      timeOut = setTimeout(() => {
        handleHideControl();
      }, 5000);
    }
    return () => {
      clearTimeout(timeOut);
    };
  }, [isTouchActivated, isMobile]);

  useEffect(() => {
    if (!showVideoControl && isMobile) {
      setDisableClick(true);
    }
  }, [showVideoControl, isMobile]);

  useEffect(() => {
    if (videoVolume != null) {
      localStorageSave("videoVolume", videoVolume);
    }
  }, [videoVolume]);

  useEffect(() => {
    document.addEventListener("keyup", keyboardShortcuts);
    document.addEventListener("fullscreenchange", fullscreenchanged);

    return () => {
      document.removeEventListener("keyup", keyboardShortcuts);
      document.removeEventListener("fullscreenchange", fullscreenchanged);
    };
  }, []);

  return (
    <div
      className="videoContainer video-relative video-w-full video-aspect-video"
      ref={videoContainerRef}
      onMouseEnter={() => setShowVideoControl(true)}
      onMouseLeave={handleHideControl}
      onTouchStart={() => {
        setIsTouchActivated(true);
        setShowVideoControl(true);
      }}
      onTouchEnd={() => setIsTouchActivated(false)}
    >
      <video
        ref={videoRef}
        className=" lg:video-rounded-xl "
        src={videoUrl}
        poster={thumb}
        autoPlay={true}
        onLoadStart={() => setVideoLoading(true)}
        onLoadedData={() => {
          setVideoLoading(false);
        }}
      ></video>
      <div className="video-w-full video-absolute video-h-full">
        {videoLoading ? (
          <div className="video-w-full  video-h-full video-flex video-items-center video-justify-center">
            <Loader width={80} height={80} />
          </div>
        ) : videoEnded ? (
          <div className="video-w-full video-flex-col  video-bg-white lg:video-text-xl video-text-base video-text-black  video-h-full video-flex video-items-center video-justify-center">
            <Loader width={80} height={80} />
            Next Video Loading....
          </div>
        ) : (
          <div
            className={` video-w-full lg:video-rounded-xl video-h-full ${
              showVideoControl
                ? ""
                : " video-hidden video-opacity-0 video-pointer-events-none video-touch-none"
            }`}
          >
            <div
              className={`video-w-full lg:video-h-3/4 video-h-2/3 video-flex video-items-center video-justify-center video-touch-none ${
                !showVideoControl ? "video-pointer-events-none" : ""
              }`}
              onClick={showVideoControl ? handlePlayPause : null}
            >
              {showPlayAnimation ? (
                <PlayPauseAnimatedButton isVideoPlaying={isVideoPlaying} />
              ) : null}
            </div>
            <div className="video-w-full lg:video-h-1/4 video-h-1/3 video-flex video-items-end">
              <VideoControls
                videoCurrentTime={videoCurrentTime}
                totalVideoduration={totalVideoduration}
                videoBufferedTime={videoBufferedTime}
                videoPlayBackRate={videoPlayBackRate}
                updateSeek={updateSeek}
                handlePlayBack={handlePlayBack}
                seekProgress={seekProgress}
                updateVideoCurrentTime={updateVideoCurrentTime}
                isVideoPlaying={isVideoPlaying}
                togglePlay={handlePlayPause}
                videoVolume={videoVolume}
                updateVideoVolumeProgress={updateVideoVolumeProgress}
                updateVideoVolume={updateVideoVolume}
                toggleVolumeState={toggleVolumeState}
                isFullScreen={isFullScreen}
                toggleFullScreen={toggleFullScreen}
              />
            </div>
            <div></div>
          </div>
        )}
      </div>
      {isDisableClick && isMobile ? (
        <div
          className="video-w-full video-absolute video-h-full video-z-50"
          onClick={() => setDisableClick(false)}
        ></div>
      ) : null}
    </div>
  );
}

VideoPlayer.propTypes = {
  videoUrl: PropTypes.string, // video url
  id: PropTypes.string || PropTypes.number, // video id
  thumb: PropTypes.string, // video thumbnail url
  handleNextVideoPlay: PropTypes.func, // hnadler to play the next video
  seekAt: PropTypes.number, // video starting time on ready state
};

export default VideoPlayer;

import React, { useEffect, useState, useRef } from "react";
import  throttle from "lodash/throttle";
import VideoControls from "./VideoControls";
import Loader from "../shared/Loader";
import PlayPauseAnimatedButton from "./PlayPauseAnimatedButton";
import { DEFAULT_PLAYBACK_SPEED } from "../constant/videoControl";
import { useDeviceInfo } from "../customHook/useDeviceInfo";

function VideoPlayer({
  videoUrl,
  id,
  thumb = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg",
  handleNextVideoPlay,
}) {
  const videoRef = useRef(null);
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
  const [videoEnded, setVideoEnded] = useState(false);
  const [isTouchActivated, setIsTouchActivated] = useState(false);
  const [isDisableClick, setDisableClick] = useState(true);
  const { isMobile } = useDeviceInfo();

  const handlePlayPause = () => {
    setShowPlayAnimation(true);
    if (isVideoPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsVideoPlaying(!isVideoPlaying);
  };

  const updateSeek = (percent, isDragged) => {
    setSeekProgress(percent);
    if (isDragged) {
      videoRef.current.pause();
      setVideoCurrentTime((percent * totalVideoduration) / 100);
    }
  };

  const handleDurationChange = () => {
    const videoPlayer = videoRef.current;
    setTotalVideoDuration(videoPlayer.duration);
  };

  const handleTimeUpdate = () => {
    const videoPlayer = videoRef.current;

    setVideoCurrentTime(videoPlayer.currentTime);
  };

  const handleProgress = () => {
    const videoPlayer = videoRef.current;
    let bufferedEnd = 0;
    if (videoPlayer?.buffered.length > 0) {
      bufferedEnd = videoPlayer?.buffered?.end(0);
    }
    setVideoBufferedTime(bufferedEnd);
  };

  const handlePlayBack = (val) => {
    setVideoPlayBackRate(val);
    videoRef.current.playbackRate = val.multiplier;
  };

  const resetUpdateSeek = () => {
    setSeekProgress(0);
  };

  const updateVideoCurrentTime = () => {
    if (videoRef.current) {
      videoRef.current.play();
      videoRef.current.currentTime = (seekProgress * totalVideoduration) / 100;
    }
  };

  const handleVideoWaiting = () => {
    setVideoLoading(true);
  };

  const isVideoPaused = () => {
    if (videoRef.current)
      return videoRef.current.paused || videoRef.current.ended;
  };

  const handleHideControl = () => {
    if (isVideoPaused()) {
      return;
    }
    setShowVideoControl(false);
  };

  const vidEnded = () => {
    setVideoEnded(true);
  };

  const updateVideoSize = () => {
    if (videoRef.current) {
      document.body.style.setProperty(
        "--video-height-container",
        `${videoRef.current.offsetHeight}px`
      );
    }
  };

  useEffect(() => {
    const throttledUpdateLayout = throttle(updateVideoSize, 100);
    updateVideoSize();
    window.addEventListener("resize", throttledUpdateLayout);

    return () => {
      window.removeEventListener("resize", throttledUpdateLayout);
    };
  }, []);
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
      document.body.style.setProperty(
        "--video-height-container",
        `${videoPlayer.offsetHeight}px`
      );
      setVideoPlayBackRate(DEFAULT_PLAYBACK_SPEED);
      videoPlayer.addEventListener("contextmenu", (e) => {
        e.preventDefault();
      });

      videoPlayer.addEventListener("play", () => {
        setIsVideoPlaying(true);
        setVideoLoading(false);
      });
      videoPlayer.addEventListener("durationchange", handleDurationChange);
      videoPlayer.addEventListener("timeupdate", handleTimeUpdate);
      videoPlayer.addEventListener("progress", handleProgress);
      videoPlayer.addEventListener("waiting", handleVideoWaiting);
      videoPlayer.addEventListener("playing", () => {
        setVideoLoading(false);
        setIsVideoPlaying(true);
      });
      videoPlayer.addEventListener("ended", vidEnded);
    }
    return () => {
      videoPlayer.removeEventListener("durationchange", handleDurationChange);
      videoPlayer.removeEventListener("timeupdate", handleTimeUpdate);
      videoPlayer.removeEventListener("progress", handleProgress);
      videoPlayer.addEventListener("waiting", handleVideoWaiting);
      videoPlayer.addEventListener("ended", vidEnded);
    };
  }, [videoUrl, videoRef.current]);

  useEffect(() => {
    let timeOut = null;
    if (!isTouchActivated && isMobile) {
      timeOut = setTimeout(() => {
        handleHideControl();
      }, 3000);
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

  return (
    <div
      className="videoContainer video-relative video-w-full video-aspect-video"
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
                resetUpdateSeek={resetUpdateSeek}
                updateVideoCurrentTime={updateVideoCurrentTime}
                isVideoPlaying={isVideoPlaying}
                togglePlay={handlePlayPause}
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


export default VideoPlayer;

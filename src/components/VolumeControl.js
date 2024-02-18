import React from "react";
import StaticImageLoader from "../shared/StaticImageLoader";
import Slider from "../shared/Slider";
import PropTypes from "prop-types";

function VolumeControl({
  videoVolume,
  updateVideoVolumeProgress,
  updateVideoVolume,
  toggleVolumeState,
}) {
  return (
    <div className=" video-select-none lg:video-ml-2 video-ml-1 video-flex video-items-center ">
      <div onClick={toggleVolumeState} className=" video-cursor-pointer">
        {Math.floor(videoVolume * 100) ? (
          //      <picture>
          //      <source srcSet={require('../../public/webp/volumeIcon.webp')} type="image/webp" />
          //      <img
          //          src={require('../../public/png/volumeIcon.png')}
          //          width={'16px'}
          //          height={'16px'}
          //          alt={`volumeIcon`}
          //      />
          //  </picture>
          <StaticImageLoader
            source="volumeIcon"
            width={"16px"}
            height={"16px"}
          />
        ) : (
          //   <picture>
          //     <source
          //       srcSet={require("../../public/webp/muteIcon.webp")}
          //       type="image/webp"
          //     />
          //     <img
          //       src={require("../../public/png/muteIcon.png")}
          //       width={"16px"}
          //       height={"16px"}
          //       alt={`muteIcon`}
          //     />
          //   </picture>
          <StaticImageLoader source="muteIcon" width={"16px"} height={"16px"} />
        )}
      </div>
      <div className=" video-w-16">
        <Slider
          silderbgColor={" video-bg-white"}
          sliderPosition={videoVolume}
          getSliderMovedPercentage={updateVideoVolumeProgress}
          getUpdatedStateOfSlider={updateVideoVolume}
        />
      </div>
    </div>
  );
}

VolumeControl.propTypes = {
  videoVolume: PropTypes.number, // information about current volume of state of video
  updateVideoVolumeProgress: PropTypes.func, // action to update the volume progress state,
  updateVideoVolume: PropTypes.func, // action to update the volume of the video
  toggleVolumeState: PropTypes.func, // toggle between mute/unmute video
};

export default VolumeControl;

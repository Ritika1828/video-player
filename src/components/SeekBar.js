import React from 'react'
import Slider from '../shared/Slider'
import PropTypes from 'prop-types'

function SeekBar({ videoCurrentTime, totalVideoduration, updateSeek, updateVideoCurrentTimer, videoBufferedTime }) {
    return (
        <Slider sliderPosition={videoCurrentTime/totalVideoduration} progressBarPosition={videoBufferedTime/totalVideoduration} silderbgColor={' video-bg-red-500'} progressBarbgColor={'video-stone-red-500'} getSliderMovedPercentage={updateSeek} getUpdatedStateOfSlider={updateVideoCurrentTimer}/>
    )
}

SeekBar.propTypes = {
    videoCurrentTime: PropTypes.number , // give information about video current running time
    totalVideoduration: PropTypes.number, // give information about video total duration
    updateSeek: PropTypes.func, // action to update the seek state
    updateVideoCurrentTimer: PropTypes.func, // action to update video current running time
    videoBufferedTime: PropTypes.number, // give information about video buffered duration
}

export default SeekBar

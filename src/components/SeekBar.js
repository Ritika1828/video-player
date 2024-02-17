import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Slider from '../shared/Slider'

function SeekBar({ videoCurrentTime, totalVideoduration, updateSeek, updateVideoCurrentTimer, videoBufferedTime }) {









    return (
        <Slider sliderPosition={videoCurrentTime/totalVideoduration} progressBarPosition={videoBufferedTime/totalVideoduration} silderbgColor={' video-bg-red-500'} progressBarbgColor={'video-stone-red-500'} getSliderMovedPercentage={updateSeek} getUpdatedStateOfSlider={updateVideoCurrentTimer}/>
    )
}

SeekBar.propTypes = {}

export default SeekBar

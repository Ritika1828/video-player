import React, { useState } from 'react'
import PropTypes from 'prop-types'

function Slider({ sliderPosition, progressBarPosition, silderbgColor, progressBarbgColor, getSliderMovedPercentage, getUpdatedStateOfSlider }) {

    const [isMouseDragged, setIsMouseDragged] = useState(false)

    /**
     * function used to set the current mouse condition on slider 
     * @param {*} e 
     */
    const handleContainerMouseDown = (e) => {
        setIsMouseDragged(true)
    }

    /**
     * function called when mouse leave from slider
     * @param {*} e 
     */
    const handleContainerMouseUp = (e) => {
        setIsMouseDragged(false)
        getUpdatedStateOfSlider && getUpdatedStateOfSlider()
    }

    /**
     * function called when mouse move on slider
     * @param {*} e 
     */
    const handleMouseMove = (e) => {
        const { clientX, target } = e;
        const rect = target.getBoundingClientRect();
        const { clientWidth } = target;
        let percent = Math.min(((clientX || e?.touches?.[0]?.clientX) - rect.left) * 100 / clientWidth, 100);
        percent = percent <= 0 ? 0 : percent
        getSliderMovedPercentage &&  getSliderMovedPercentage(percent, isMouseDragged)
    }

    return (
        <div
            className=' video-py-2.5 video-px-3 video-w-full video-cursor-pointer '
            onMouseMove={(e) => handleMouseMove(e)}
            onMouseDown={(e) => handleContainerMouseDown(e)}
            onMouseUp={(e) => handleContainerMouseUp(e)}
            onMouseLeave={ isMouseDragged ? (e)=>handleContainerMouseUp(e) : null}
            onTouchMove={(e) => handleMouseMove(e)}
            onTouchStart={(e) => handleContainerMouseDown(e)}
            onTouchEnd={(e) => handleContainerMouseUp(e)}
        >
            <div className='video-relative  video-w-full md:video-h-2 video-h-1.5 video-rounded-2xl video-bg-stone-500 video-pointer-events-none'>
                <div className={`video-absolute video-w-full md:video-h-2 video-h-1.5 video-rounded-2xl ${silderbgColor} video-origin-left video-left-0 video-pointer-events-none video-z-50`} style={{
                    transform: `scaleX(${sliderPosition})`
                }}>
                </div>
                <div className={`video-absolute video-w-3  video-h-3  video-rounded-full ${silderbgColor} video-origin-left video-left-0 video-z-50`} style={{
                    left: `${sliderPosition * 100}%`,
                    transform: `translate(-50%, -20%)`

                }}>
                </div>
                {
                    progressBarPosition ? (
                        <div className={`video-absolute md:video-h-2 video-h-1.5 video-rounded-2xl video-w-full ${progressBarbgColor} video-origin-left video-left-0`} style={{
                            transform: `scaleX(${progressBarPosition})`
                        }}></div>
                    ) : null
                }

            </div>

        </div>
    )
}

Slider.propTypes = {
    sliderPosition : PropTypes.number,  // current slider position
    progressBarPosition : PropTypes.number,  // current progressBar position
    silderbgColor: PropTypes.string,   // background color of silder
    progressBarbgColor: PropTypes.string,    // background color of progress Bar
    getSliderMovedPercentage: PropTypes.func, // action called slider is moved
    getUpdatedStateOfSlider: PropTypes.func, // action called to update slider state when mouse is Up.
}

export default Slider

import React, { useEffect, useState } from 'react'
import VideoPlayList from './VideoPlayList'
import VideoPlayer from './VideoPlayer'
import VIDEO_PLAYLIST from '../constant/videoList'
import PropTypes from 'prop-types'

function VideoContentBody() {
    const [videoPlaylist , setVideoPlaylist] = useState(VIDEO_PLAYLIST)
    const [selectedVideo, setSelectedVideo] = useState({})

    const handleOrderItemList = (reorderList) => {
        setVideoPlaylist(reorderList)
    }

    const handleNextVideoPlay = (id) => {
        let index = videoPlaylist.findIndex((item) => item.id === id) + 1
        index = index === videoPlaylist.length - 1 ? 0 : index;
        setSelectedVideo(videoPlaylist[index])
    }

    const handleItemClick = (item) => {
        setSelectedVideo(item)
    }


    useEffect(()=> {
        if(localStorage.getItem('currentVideoPlayed')){
            setSelectedVideo(JSON.parse(localStorage.getItem('currentVideoPlayed')))
        } else {
            setSelectedVideo(VIDEO_PLAYLIST[0])
        }
        // setTimeout(()=> {
        //     setSelectedVideo(VIDEO_PLAYLIST[1])
        // },10000)
    },[])








    return (
        <div className=" video-flex video-pt-16 video-h-full video-w-full video-flex-col lg:video-flex-row">
            <div className=" lg:video-w-2/3 lg:video-p-4 video-w-full video-overflow-hidden video-touch-none">
                <VideoPlayer {...selectedVideo} handleNextVideoPlay={handleNextVideoPlay}/>
            </div>
            <div className=" lg:video-w-1/3 videoPlayList   lg:video-p-4 video-w-full">
                <VideoPlayList items={videoPlaylist} handleOrderItemList={handleOrderItemList} selectedID={selectedVideo.id} handleItemClick={handleItemClick}  />
            </div>
        </div>
    )
}

VideoContentBody.propTypes = {}

export default VideoContentBody

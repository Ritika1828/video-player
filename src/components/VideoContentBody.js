import React, { useEffect, useState } from 'react'
import VideoPlayList from './VideoPlayList'
import VideoPlayer from './VideoPlayer'
import VIDEO_PLAYLIST from '../constant/videoList'
import { localStorageSave } from '../utils/storage'

function VideoContentBody() {
    const [videoPlaylist, setVideoPlaylist] = useState(VIDEO_PLAYLIST)
    const [selectedVideo, setSelectedVideo] = useState({})


    /**
     * function used to set the new reorder list
     * @param {Array} reorderList   
     */
    const handleOrderItemList = (reorderList) => {
        setVideoPlaylist(reorderList)
    }

    /**
     * function used to set new selected video on playing next video 
     * @param {String } id 
     */
    const handleNextVideoPlay = (id) => {
        let index = videoPlaylist.findIndex((item) => item.id === id) + 1
        index = index === videoPlaylist.length - 1 ? 0 : index;
        setSelectedVideo(videoPlaylist[index])
        localStorageSave('currentVideoPlayed', videoPlaylist[index])

    }

    /**
     * function used to set new selected video on item click 
     * @param {Object} item 
     */
    const handleItemClick = (item) => {
        setSelectedVideo(item)
        localStorageSave('currentVideoPlayed', item)
    }


    useEffect(() => {
        if (localStorageSave('currentVideoPlayed')) {
            setSelectedVideo(localStorageSave('currentVideoPlayed'))
        } else {
            setSelectedVideo(VIDEO_PLAYLIST[0])
            localStorageSave('currentVideoPlayed', VIDEO_PLAYLIST[0])
        }
    }, [])

    return (
        <div className=" video-flex video-pt-16 video-h-full video-w-full video-flex-col lg:video-flex-row">
            <div className=" lg:video-w-2/3 lg:video-p-4 video-w-full video-overflow-hidden video-touch-none">
                <VideoPlayer {...selectedVideo} handleNextVideoPlay={handleNextVideoPlay} />
            </div>
            <div className=" lg:video-w-1/3 videoPlayList   lg:video-p-4 video-w-full">
                <VideoPlayList items={videoPlaylist} handleOrderItemList={handleOrderItemList} selectedID={selectedVideo.id} handleItemClick={handleItemClick} />
            </div>
        </div>
    )
}


export default VideoContentBody

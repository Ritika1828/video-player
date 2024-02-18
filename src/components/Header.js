import React from 'react'
import StaticImageLoader from '../shared/StaticImageLoader'


export default function Header() {
  return (
    <header className='header-contain video-w-full video-fixed video-top-0 video-h-16 video-bg-white video-z-10 backdrop-header video-flex video-px-5 video-items-center video-justify-between'>
        <div className='header-name video-flex video-items-center '>
                <StaticImageLoader  width={'40'} height={'40'}/>
            <h1 className=' video-tracking-widest video-ml-2 video-text-base video-font-bold md:video-text-xl '>RIGI VIDEO PLAYER</h1>
        </div>
    </header>
  )
}

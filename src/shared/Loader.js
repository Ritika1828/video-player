import React from 'react';

const Loader = ({width = 40, height = 40}) => {
  return (
    <div className="video-flex video-items-center justify-center h-screen">
      <div className="video-animate-spin video-rounded-full video-border-b-2 video-border-gray-900"
        style={{
            width: `${width}px`,
            height: `${height}px`
        }}
      >

      </div>
    </div>
  );
};

export default Loader;
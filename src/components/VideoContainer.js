import React, {useState} from 'react';

function VideoContainer({ children }){
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="videoContainer video-relative video- video-w-full video-aspect-video"  onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}>
      {children}
    </div>
  );
};

export default VideoContainer;
import React, { useState } from "react";

export default function Header() {
  return (
    <header className="header-contain video-w-full video-fixed video-top-0 video-h-16 video-bg-white video-z-10 backdrop-header video-flex video-px-5 video-items-center video-justify-between">
      <div className="header-name video-flex video-items-center ">
        <picture>
          <source
            srcSet={require("../images/webp/rigiLogo.webp")}
            type="image/webp"
          />
          <img
            // loading={loading}
            src={require("../images/png/rigiLogo.png")}
            width='40'
            height='40'
            alt="rigi-logo"
            
          />
        </picture>
        <h1 className=" video-tracking-widest video-ml-2 video-text-base video-font-bold md:video-text-xl ">
          RIGI VIDEO PLAYER
        </h1>
      </div>
    </header>
  );
}

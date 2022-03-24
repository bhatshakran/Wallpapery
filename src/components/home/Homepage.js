import React from "react";
import iphone from "../../images/iphone-ipad.png";
import wave from "../../images/wave.svg";
import hd from "../../images/hd.png";
import free from "../../images/free.png";
import screen from "../../images/screen.png";
import iphone6 from "../../images/iPhone6+.png";

const Homepage = () => {
  return (
    <>
      {/* hero section */}
      <div className="flex flex-wrap w-full h-auto mt-16 gap-y-20 panes-container lg:h-72 centerafterlg">
        <div className="w-full lg:w-1/2 pane-a lg:flex lg:items-center lg:flex-wrap">
          <div className="text-wrapper">
            <h1 className="w-full">Connecting all your screen needs!</h1>
            <p className="w-full mt-8 opacity-60">
              Get high quality stock pictures free of cost.
            </p>
          </div>
        </div>
        {/* image */}
        <div className="flex justify-center w-full h-full lg:justify-end lg:w-1/2 pane-b">
          <img src={iphone} alt="" className="h-full " />
        </div>
      </div>
      {/* wave */}
      <div className="hidden w-full waves lg:block">
        <img src={wave} alt="" className="w-full" />
      </div>
      {/* highlights section */}
      <div className="hlts centerafterlg">
        <div className=" pane">
          <img src={hd} alt="" className="mini-img" />
          <h3>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat,
            odio?
          </h3>
        </div>
        <div className=" pane">
          <img src={screen} alt="" className="mini-img" />
          <h3>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat,
            odio?
          </h3>
        </div>
        <div className=" pane">
          <img src={free} alt="" className="mini-img" />
          <h3>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat,
            odio?
          </h3>
        </div>
      </div>

      <div className="w-full h-auto py-20 mt-56 about bg-text-primary lg:h-screen">
        <div className="flex flex-col h-full gap-10 lg:flex-row centerafterlg">
          <div className="text-white lg:w-2/3 section">
            <h2 className="opacity-90 lg:text-5xl xl:text-6xl 2xl:text-7xl">
              Walleezy offers over 100k wallpapers from different categories to
              choose from.From nature to tech it has got every kind of wallpaper
              you need to style your device. Want to explore our collections?
            </h2>
            <button className="px-4 py-4 mt-10 text-xl border lg:text-3xl xl:text-5xl font-vistol">
              Explore
            </button>
          </div>
          <div className="w-auto lg:w-1/3 section">
            <img
              src={iphone6}
              alt=""
              className="w-auto mx-auto h-80 lg:h-full"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;

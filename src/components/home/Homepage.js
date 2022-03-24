import React from "react";
import iphone from "../../images/iphone-ipad.png";
import wave from "../../images/wave.svg";
import hd from "../../images/hd.png";
import free from "../../images/free.png";
import screen from "../../images/screen.png";

const Homepage = () => {
  return (
    <div className="">
      {/* hero section */}
      <div className="flex flex-wrap w-full h-auto px-5 mt-16 gap-y-20 panes-container lg:h-72 centerafterlg">
        <div className="w-full lg:w-1/2 pane-a lg:flex lg:items-center lg:flex-wrap">
          <div className="text-wrapper">
            <h1 className="w-full">Connecting all your screen needs!</h1>
            <p className="w-full mt-8 opacity-60">
              Get high quality stock pictures free of cost.
            </p>
          </div>
        </div>
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
    </div>
  );
};

export default Homepage;

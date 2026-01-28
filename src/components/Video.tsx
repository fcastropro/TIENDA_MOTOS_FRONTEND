 
import React, { useState } from "react";
import ModalVideo from "react-modal-video";
import bgimg from "../assets/img/video/1.jpg";

const VideoData = {
  title: "Watch This Video",
  bgimg: bgimg,
  videoid: "snvzakfcTmY",
};
const Video = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <div
        className="khalif-video-wrape text-center video-bg bg-center bg-cover relative h-[768px] bg-[#1a2b3c] bg-no-repeat before:content-[''] before:absolute before:left-0 before:top-0 before:bg-[rgb(0,0,0/60%)] before:w-full before:h-full"
        style={{ backgroundImage: `url(${VideoData.bgimg})` }}
      >
        <div className="videos-icon-text absolute top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2">
          <h3
            className="text-[58px] capitalize font-semibold mb-[50px] pb-[70px]"
            data-aos="fade-down"
            data-aos-duration="500"
          >
            {VideoData.title}
          </h3>
          <button
            className="popup-video inline-block relative rounded-[50%] h-[127px] w-[127px] text-[#fa6501] bg-white text-[62px] leading-[62px] duration-[0.3s] animate-[heartbeat_1s_infinite_alternate] before:content-[''] before:inline-block before:absolute before:-top-[23px] before:-right-[23px] before:-bottom-[23px] before:-left-[23px] before:bg-[#ffffff66] before:-z-[1] before:rounded-full before:animate-[btnIconRipple_3s_cubic-bezier(0.23,1,0.32,1)_both_infinite] after:content-[''] after:inline-block after:absolute after:-top-[46px] after:-right-[46px] after:-bottom-[46px] after:-left-[46px] after:bg-[#ffffff4d] after:-z-[1] after:rounded-full after:animate-[btnIconRipple_2s_cubic-bezier(0.23,1,0.32,1)_both_infinite] cursor-pointer"
            onClick={() => setOpen(true)}
          >
            <i className="fa fa-play"></i>
          </button>
        </div>
      </div>
      <ModalVideo
        channel="youtube"
        youtube={{ mute: 0, autoplay: 0 }}
        isOpen={isOpen}
        videoId={VideoData.videoid}
        onClose={() => setOpen(false)}
      />
    </>
  );
};

export default Video;

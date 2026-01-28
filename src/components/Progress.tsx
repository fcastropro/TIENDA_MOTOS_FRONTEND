import React from "react";
import { Link } from "react-router-dom";
import Progressbar from "./Progressbar";
const ProgressData = {
  title: "we develop our skills regularly to keep us updated",
  brief:
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  btntext: "view more",
  btnlink: "#",
  progressbarlist: [
    {
      title: "idea",
      percent: 70,
      delay: 200,
    },
    {
      title: "photoshop",
      percent: 95,
      delay: 400,
    },
    {
      title: "frontend",
      percent: 85,
      delay: 500,
    },
  ],
};
const Progress = () => {
  return (
    <>
      <div className="khalif-progress-wrape mt-[100px] py-[100px]">
        <div className="container">
          <div className="grid grid-cols-12 gap-x-6">
            <div className="xl:col-span-6 lg:col-span-7 md:col-span-12 sm:col-span-12">
              <div
                className="progress-left-content sm:mb-[50px]"
                data-aos="zoom-in"
                data-aos-delay="500"
              >
                <h2 className="text-[54px] font-semibold leading-[72px] capitalize sm:text-[38px] sm:leading-[50px]">
                  {ProgressData.title}
                </h2>
                <p className="my-[35px] mx-0">{ProgressData.brief}</p>
                <Link to="#" className="btn-3 text-center uppercase">
                   
                  {ProgressData.btntext} 
                  <span>
                    <svg
                      data-name="Layer 1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 128 95.91"
                    >
                      <path
                        d="M259.88 468.09l-52 45.93-5.1-5.52 43.33-38.41H131.88v-8h114.21l-43.25-38.36 5-5.62 52.06 46z"
                        transform="translate(-131.88 -418.11)"
                      />
                    </svg>
                  </span>
                </Link>
              </div>
            </div>
            <div className="xl:col-start-8 lg:col-span-5 md:col-span-12 sm:col-span-12">
              {ProgressData.progressbarlist.map((item, i) => (
                <div
                  className="single-progress-bar mb-[60px]"
                  data-aos="fade-up"
                  data-aos-delay={item.delay}
                  key={i}
                >
                  <Progressbar
                    value={item.percent}
                    autoplay={true}
                    titleContent={item.title}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Progress;

import React from "react";
import Tilt from "react-parallax-tilt";
import CountUp from "react-countup";
import { Parallax } from "react-scroll-parallax";
import aboutimg from "../assets/img/about/1.jpg";
import aboutimg2 from "../assets/img/about/2.jpg";
import { Link } from "react-router-dom";

const AboutData = {
  bigtitle:
    'we run agency <span class="text-[#ff5100]">smartly</span> with our <span class="text-[#ff5100]">team</span> member. ',
  title: "khalif",
  title2: "experience",
  year: "years",
  count: "18",
  aboutimg: aboutimg,
  aboutimg2: aboutimg2,
  brief:
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit, do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  btntext: "learn more",
  btnlink: "#",
};

const About = () => {
  return (
    <>
      <div className="khalif-about-wrape mb-[100px]">
        <div className="container">
          <div className="grid grid-cols-12 gap-x-6">
            <div className="xl:col-span-7 lg:col-span-6 md:col-span-12 sm:col-span-12">
              <div className="about-left-img-wrape flex items-center gap-[26px] sm:flex-col-reverse">
                <Parallax translateY={["-50px", "0px"]}>
                  <div className="about-img1 relative">
                    <div
                      className="about-exprience mb-5 text-[32px] text-white capitalize font-normal font-antonio leading-[62px]"
                      data-aos="fade-up"
                      data-aos-anchor-placement="center-bottom"
                      data-aos-duration="2000"
                    >
                      {AboutData.title2}
                      <h3 className="font-semibold font-jost text-[45px]">
                        <span className="font-bold text-[#ff5100]">
                          <CountUp start={0} end={AboutData.count} delay={0}>
                            {({ countUpRef }) => (
                              <b className="counter" ref={countUpRef} />
                            )}
                          </CountUp>
                          +
                        </span>
                        {AboutData.year}
                      </h3>
                    </div>
                    <img
                      data-aos="fade-right"
                      data-aos-duration="1500"
                      src={AboutData.aboutimg}
                      alt="about-img"
                    />
                    <div className="about-style-title uppercase my-stroke2 text-[120px] leading-[100px] opacity-[0.50] text-transparent font-antonio font-semibold absolute -left-[60%] bottom-[26%] -rotate-90 -z-[1] animate-[leftright_3s_infinite_alternate]">
                      {AboutData.title}
                    </div>
                  </div>
                </Parallax>
                <div
                  className="about-img2"
                  data-aos="fade-right"
                  data-aos-duration="1000"
                >
                  <img src={AboutData.aboutimg2} alt="about-img" />
                </div>
              </div>
            </div>
            <div className="xl:col-span-5 lg:col-span-6 md:col-span-12 sm:col-span-12">
              <Parallax translateY={["-70px", "0px"]}>
                <div className="about-short-brief ml-[60px]">
                  <h2
                    className="uppercase font-semibold text-[58px] xl:-ml-[150px] mb-[70px] md:mx-0 md:mt-0 md:mb-[30px] sm:mx-0 sm:mt-0 sm:mb-[30px] sm:text-[40px]"
                    dangerouslySetInnerHTML={{ __html: AboutData.bigtitle }}
                  ></h2>
                  <p className="mb-[50px]">{AboutData.brief}</p>

                  <Tilt className="inline-block" scale={1.1}>
                    <Link
                      to={AboutData.btnlink}
                      className="btn-2 bgc-2 text-center uppercase"
                    >
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
                      {AboutData.btntext}
                    </Link>
                  </Tilt>
                </div>
              </Parallax>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;

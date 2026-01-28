import React from "react";
import Tilt from "react-parallax-tilt";
import { Parallax } from "react-scroll-parallax";
import bgimg from "../assets/img/hero/1.jpg";
import { Link } from "react-router-dom";

const HeroData = {
  title: "Metamorfosis",
  title2: "<h1>Aros & Llantas <br> Metamorfosis</h1>",
  brief:
    "Somos una empresa dedicada a asesorar y comercializar las mejores marcas originales de aros y llantas deportivas, además brindamos servicios, ABC sistema de frenos, ABC sistema distribución, ABC sistema eléctrico, ABC sistema de suspensión.",
  btntext: "Nuestras Marcas",
  btnlink: "#",
  bgimg: bgimg,
  social: [
    {
      title: "facebook",
      link: "https://www.facebook.com/arosyllantasmetamorfosis",
    },
    {
      title: "Tiktok",
      link: "https://www.tiktok.com/@arosyllantasmetamorfosis",
    },
    {
      title: "instagram",
      link: "https://www.instagram.com/arosyllantasmetamorfosis/",
    },
  ],
};
const Hero = () => {
  return (
    <>
      <div
        className="khalif-hero-wrape hero-bg bg-center bg-cover relative min-h-[100vh] bg-[#1a2b3c] bg-no-repeat z-[1] before:content-[''] before:absolute before:left-0 before:top-0 before:right-0 before:bottom-0 before:bg-[#000000cc] before:-z-[1]"
        style={{ backgroundImage: `url(${HeroData.bgimg})` }}
      >
        <div className="hero-content py-[250px] px-0">
          <div className="container">
            <div className="grid grid-cols-12 gap-x-6 items-center">
              <div className="xl:col-start-3 xl:col-span-10 lg:col-start-2 lg:col-span-10 md:col-span-12 sm:col-span-12">
                <ul className="khalif-hero-social -rotate-90 absolute -left-[5%] top-[46%] xl:inline-block lg:inline-block md:inline-block sm:hidden">
                  {HeroData.social.map((item, i) => (
                    <li className="inline-block m-0 group" key={i}>
                      <Link
                        className="text-xl text-white capitalize block pr-[50px] font-jost relative after:content-[''] after:absolute after:w-[30px] after:right-[10px] after:top-2/4 after:translate-y-[50%] after:bg-white after:h-[1px] group-hover:text-[#ff5100]"
                        to={item.link}
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
                <h2 className="style-title my-stroke absolute left-[24%] top-[15%] bottom-0 right-0 uppercase text-transparent text-[440px] -z-[1] md:left-[12%] md:text-[250px] sm:left-[2%] sm:text-[150px]">
                  {HeroData.title}
                </h2>

                <Parallax
                  className="text-[100px] font-bold uppercase md:text-[70px] sm:text-[60px]"
                  translateY={["-70px", "0px"]}
                  dangerouslySetInnerHTML={{ __html: HeroData.title2 }}
                ></Parallax>

                <div className="hero-btn-para-wrape flex items-center gap-[100px] mt-[100px] ml-[100px] mr-0 mb-0 md:gap-[50px] md:mt-[30px] md:mx-0 md:mb-0 sm:gap-[50px] sm:mt-[30px] sm:mx-0 sm:mb-0 sm:flex-col-reverse">
                  <div className="hero-btn">
                    <Tilt className="inline-block" scale={1.1}>
                      <Link
                        to={HeroData.btnlink}
                        className="btn-2 text-center uppercase bgc-3 btn-tilt"
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
                        {HeroData.btntext}
                      </Link>
                    </Tilt>
                  </div>
                  <div className="hero-para text-2xl font-semibold sm:text-[18px] sm:leading-[30px]">
                    <p>{HeroData.brief}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;

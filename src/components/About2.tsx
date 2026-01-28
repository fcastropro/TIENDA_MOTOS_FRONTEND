import React from "react";
import { Accordion } from "flowbite-react"; 
import CountUp from "react-countup";
import { Parallax } from "react-scroll-parallax";
import aboutimg3 from "../assets/img/about/3.jpg";
import aboutimg4 from "../assets/img/about/4.jpg";
import aboutimg5 from "../assets/img/about/5.png";
const AboutData = {
  bigtitle:
    'we run agency <span class="text-[#ff5100]">smartly</span> with our <span class="text-[#ff5100]">team</span> member. ',
  brief:
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit, do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  title: "khalif",
  title2: "experience",
  year: "years",
  count: "18",
  aboutimg3: aboutimg3,
  aboutimg4: aboutimg4,
  aboutimg5: aboutimg5,
  btntext: "learn more",
  btnlink: "#",
  AccordionList: [
    {
      title: "how to buy this?",
      brief:
        "is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout",
    },
    {
      title: "it is refundable?",
      brief:
        "is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout",
    },
    {
      title: "can i use free",
      brief:
        "is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout",
    },
    {
      title: "24 / 7 supports",
      brief:
        "is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout",
    },
  ],
};
const About2 = () => {
  return (
    <>
      <div className="khalif-about2-wrape pt-[100px] -mb-[300px]">
        <div className="container">
          <div className="grid grid-cols-12 gap-x-6">
            <div className="xl:col-span-7 lg:col-span-6 md:col-span-12 sm:col-span-12">
              <div className="about2-left-img-wrape flex items-center sm:flex-col-reverse">
                <Parallax
                  className="about2-img1 position-relative -mb-[250px] sm:mb-[50px]"
                  translateY={["-50px", "0px"]}
                >
                  <img src={AboutData.aboutimg3} alt="about-img" />
                  <div className="about2-style-title text-uppercase text-[120px] leading-[100px] stroke-[1px] stroke-[#595959] opacity-[0.50] text-transparent font-antonio font-semibold absolute -left-[50%] top-[18%] -rotate-90 -z-[1] animate-[leftright_3s_infinite_alternate]">
                    {AboutData.title}
                  </div>
                </Parallax>
                <div className="about2-img2 position-relative -ml-[100px] -z-[1] sm:ml-0">
                  <img src={AboutData.aboutimg4} alt="about-img" />
                  <Parallax
                    className="about2-style-shape absolute top-0 -left-5 -z-[1]"
                    translateX={["-50px", "0px"]}
                  >
                    <img src={AboutData.aboutimg5} alt="about-shape" />
                  </Parallax>
                  <div
                    className="about2-exprience text-[32px] text-white capitalize font-normal font-antonio leading-[62px] mt-[15px] mr-0 mb-0 ml-[150px]"
                    data-aos="fade-right"
                    data-aos-delay="200"
                  >
                    experience
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
                </div>
              </div>
            </div>
            <div className="xl:col-span-5 lg:col-span-6 md:col-span-12 sm:col-span-12">
              <div className="about2-short-brief z-[1] relative sm:ml-0 xl:ml-[60px] lg:ml-[60px]">
                <Parallax translateX={["-50px", "0px"]}>
                  <h2
                    className="text-uppercase text-[50px] font-semibold mb-0 xl:w-full xl:-ml-[150px] md:w-[85%] md:ml-0 sm:ml-[8px] sm:w-[80%] sm:text-[32px] sm:leading-[48px]"
                    dangerouslySetInnerHTML={{ __html: AboutData.bigtitle }}
                  ></h2>
                </Parallax>
                <p className="my-[50px] mx-0">{AboutData.brief}</p>

                <div
                  className="khalif-accordion-wrapper sm:mt-10"
                  data-aos="fade-right"
                  data-aos-delay="100"
                >
                  <Accordion>
                    {AboutData.AccordionList.map((item, i) => (
                      <Accordion.Panel key={i}>
                        <Accordion.Title>{item.title}</Accordion.Title>
                        <Accordion.Content>
                          <p>{item.brief}</p>
                        </Accordion.Content>
                      </Accordion.Panel>
                    ))}
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About2;

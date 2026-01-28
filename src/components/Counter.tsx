 
import React from "react";
import CountUp from "react-countup";
import bgimg from "../assets/img/counter/bg.png";

const CounterData = {
  bgimg: bgimg,
  CounterList: [
    {
      title: "Project Done",
      number: "35",
      symbol: "k",
      delay: "100",
    },
    {
      title: "Experience",
      number: "18",
      symbol: "+",
      delay: "300",
    },
    {
      title: "Team Member",
      number: "60",
      symbol: "+",
      delay: "500",
    },
    {
      title: "Awards",
      number: "14",
      symbol: "",
      delay: "700",
    },
  ],
};
const Counter = () => {
  return (
    <>
      <div
        className="khalif-counter-wrape counter-bg bg-center bg-cover bg-no-repeat pt-[550px] px-0 pb-[100px]"
        style={{ backgroundImage: `url(${CounterData.bgimg})` }}
      >
        <div className="container">
          <div className="grid grid-cols-12 gap-x-6">
            {CounterData.CounterList.map((item, i) => (
              <div
                className="xl:col-span-3 lg:col-span-3 md:col-span-6 sm:col-span-12"
                key={i}
              >
                <div
                  className="khalif-single-counter relative mt-0 mx-6 mb-6 text-center"
                  data-aos="fade-right"
                  data-aos-delay={item.delay}
                >
                  <div className="single-count-box after:content-[''] after:absolute after:left-0 after:top-0 after:right-0 after:bottom-0 after:bg-[#111111] after:-z-[1] after:-skew-x-6 block relative bg-[#ff5100] py-[50px] px-0 skew-x-6 z-[1] md:mt-0 sm:mt-0">
                    <h3 className="text-[115px] font-semibold uppercase -skew-x-6">
                      <CountUp start={0} end={item.number} delay={0}>
                        {({ countUpRef }) => (
                          <span className="counter" ref={countUpRef} />
                        )}
                      </CountUp>

                      {item.symbol}
                    </h3>
                    <div className="counter-circle"></div>
                  </div>
                  <h4 className="count-name font-semibold text-[30px] capitalize mt-[30px] mx-0 mb-0">
                    {item.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Counter;

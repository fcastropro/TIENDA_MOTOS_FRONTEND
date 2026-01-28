 
import { useState, useEffect } from "react";

const Colorswitcher = {
  title: "color switcher",
  Colorbglist: [
    {
      bg: "sbgc-1",
      colortype: "color-1",
    },
    {
      bg: "sbgc-2",
      colortype: "color-2",
    },
    {
      bg: "sbgc-3",
      colortype: "color-3",
    },
    {
      bg: "sbgc-4",
      colortype: "color-4",
    },
    {
      bg: "sbgc-5",
      colortype: "color-5",
    },
    {
      bg: "sbgc-6",
      colortype: "color-6",
    },
    {
      bg: "sbgc-7",
      colortype: "color-7",
    },
    {
      bg: "sbgc-8",
      colortype: "color-8",
    },
    {
      bg: "sbgc-9",
      colortype: "color-9",
    },
    {
      bg: "sbgc-10",
      colortype: "color-10",
    },
  ],
};

const Switcher = () => {
  const [activeButton, setActiveButton] = useState(
    // Set default activeButton to "color-1"
    Colorswitcher.Colorbglist[0].colortype
  );

  useEffect(() => {
    if (activeButton !== null) {
      document.body.classList.add(`${activeButton}`);
      return () => {
        document.body.classList.remove(`${activeButton}`);
      };
    }
  }, [activeButton]);

  const handleClick = (buttonId) => {
    document.body.classList.remove(`${activeButton}`);
    setActiveButton(buttonId);
  };

  // color swatcher open and close function
  const [activeElement, setActiveElement] = useState(1);
  const handle2Click = (id) => {
    setActiveElement(id);
  };

  return (
    <>
      <div
        id="switcher"
        className={`bg-white fixed hidden top-[150px] right-0 z-[99] w-[300px] ml-0 rounded-t-[5px] rounded-l-[5px] shadow-[0px_0px_4px_0px_rgba(51,51,51,0.2)] -mr-[500px] ${
          activeElement === 2 ? "switcheropen2" : "switcherclose2"
        } `}
      >
        <div className="content-switcher p-4">
          <h4 className="text-center text-[#333333] py-[5px] px-0 uppercase text-base font-bold mb-[10px]">
            {Colorswitcher.title}
          </h4>
          <ul className="text-center !p-0 !mt-[25px] !mx-0 !mb-[5px]">
            {Colorswitcher.Colorbglist.map((item, i) => (
              <li
                className="uppercase text-xs inline-block ml-0 m-[0_10px_15px_0]"
                key={i}
              >
                <div
                  onClick={() => handleClick(item.colortype)}
                  className={`rounded-[50%] cursor-pointer w-10 h-10 bg-black inline-flex items-center justify-center ${
                    item.bg
                  } ${activeButton === item.colortype ? "selected" : ""}`}
                >
                  <i className="fa fa-check text-white invisible opacity-0 transition-all duration-[0.3s]"></i>
                </div>
              </li>
            ))}
          </ul>
          <div
            id="hideSwitcher"
            className="cursor-pointer mb-0 absolute w-[50px] h-[50px] text-center rounded-[50%] leading-[40px] -left-[25px] -top-[25px] text-[38px] text-[#999999] border-[1px] border-solid border-[#eeeeee] !bg-[#ff5100]"
            onClick={() => handle2Click(1)}
          >
            &times;
          </div>
        </div>
      </div>
      <div
        id="showSwitcher"
        className={`styleSecondColor z-[11111] right-0 bg-white block cursor-pointer ml-0 fixed top-[150px] shadow-[#ccc_0_0_2px] border-l-0 text-[18px] rounded-bl-[3px] rounded-tl-[4px] py-[10px] pr-4 pl-[14px] ${
          activeElement === 1 ? "switcherclose" : "switcheropen"
        } `}
        onClick={() => handle2Click(2)}
      >
        <i className="fa fa-cog fa-spin text-[25px] text-[#222222]"></i>
      </div>
    </>
  );
};
export default Switcher;

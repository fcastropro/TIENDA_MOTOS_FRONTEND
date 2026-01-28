import React from "react";

const BigData = {
  brief:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore",
};
const Bigtitle = () => {
  return (
    <>
      <div
        className="khalif-big-title-wrape text-center mt-[100px]"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <div className="container">
          <div className="grid grid-cols-12 gap-x-6">
            <div className="xl:col-start-2 xl:col-end-12 lg:col-start-2 lg:col-span-12 md:col-span-12 sm:col-span-12">
              <div className="khalif-big-title-content bgc-2">
                <h2 className="text-[58px] leading-[80px] p-[60px] font-semibold capitalize sm:text-[26px] sm:leading-[50px] sm:p-[30px]">
                  {BigData.brief}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Bigtitle;

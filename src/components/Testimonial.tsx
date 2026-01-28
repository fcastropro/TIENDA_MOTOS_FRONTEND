 
import React from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import bgimg from "../assets/img/testimonial/1.jpg";
const TestimonialData = {
  bgimage: bgimg,
  Slider: [
    {
      icon: '<svg class="!w-20 !inline-block fill-[#ff5100]"viewBox="0 0 512 512"x=0px xmlns=http://www.w3.org/2000/svg xmlSpace=preserve y=0px><path d="M228 119c5.523 0 10-4.478 10-10V77c0-27.57-22.43-50-50-50H50C22.43 27 0 49.43 0 77v119.988c0 27.57 22.43 50 50 50h64.692c-2.276 74.706-30.621 113.542-86.459 118.622a10 10 0 00-9.094 9.959V475a10 10 0 0010.561 9.984c68.908-3.876 121.511-27.591 156.349-70.487C220.521 372.051 238 310.029 238 230.152v-35.819c0-5.522-4.477-10-10-10s-10 4.478-10 10v35.819c0 146.644-58.535 223.331-178.86 234.097v-79.836c30.411-4.73 53.934-18.886 70.007-42.161 17.049-24.691 25.694-60.106 25.694-105.264 0-5.522-4.477-10-10-10H50c-16.542 0-30-13.458-30-30V77c0-16.542 13.458-30 30-30h138c16.542 0 30 13.458 30 30v32c0 5.522 4.477 10 10 10zM462 27H324c-27.57 0-50 22.43-50 50v119.988c0 27.57 22.43 50 50 50h64.692c-2.276 74.706-30.621 113.542-86.459 118.622a10 10 0 00-9.094 9.959V475a10 10 0 0010.561 9.984c68.908-3.876 121.511-27.591 156.349-70.487C494.521 372.052 512 310.029 512 230.152V77c0-27.57-22.43-50-50-50zm30 203.152c0 146.644-58.535 223.331-178.861 234.097v-79.836c30.412-4.73 53.935-18.886 70.007-42.161 17.049-24.69 25.694-60.105 25.694-105.264 0-5.522-4.477-10-10-10H324c-16.542 0-30-13.458-30-30V77c0-16.542 13.458-30 30-30h120v74.034c0 5.522 4.477 10 10 10s10-4.478 10-10v-73.96c15.612 1.034 28 14.057 28 29.926v153.152z"/><path d="M454 145.751c-5.523 0-10 4.527-10 10.049 0 5.522 4.477 10 10 10 5.522 0 10-4.478 10-10v-.099c0-5.522-4.477-9.95-10-9.95zM228 141.666c-5.523 0-10 4.478-10 10v.209c0 5.522 4.477 10 10 10s10-4.478 10-10v-.209c0-5.522-4.477-10-10-10z"/></svg>',
      brief:
        "Good products can be sold by honest advertising. If you don’t think the product is good, you have no business to be advertising it.",
      name: "David Ogilvy",
    },
    {
      icon: '<svg class="!w-20 !inline-block fill-[#ff5100]"viewBox="0 0 512 512"x=0px xmlns=http://www.w3.org/2000/svg xmlSpace=preserve y=0px><path d="M228 119c5.523 0 10-4.478 10-10V77c0-27.57-22.43-50-50-50H50C22.43 27 0 49.43 0 77v119.988c0 27.57 22.43 50 50 50h64.692c-2.276 74.706-30.621 113.542-86.459 118.622a10 10 0 00-9.094 9.959V475a10 10 0 0010.561 9.984c68.908-3.876 121.511-27.591 156.349-70.487C220.521 372.051 238 310.029 238 230.152v-35.819c0-5.522-4.477-10-10-10s-10 4.478-10 10v35.819c0 146.644-58.535 223.331-178.86 234.097v-79.836c30.411-4.73 53.934-18.886 70.007-42.161 17.049-24.691 25.694-60.106 25.694-105.264 0-5.522-4.477-10-10-10H50c-16.542 0-30-13.458-30-30V77c0-16.542 13.458-30 30-30h138c16.542 0 30 13.458 30 30v32c0 5.522 4.477 10 10 10zM462 27H324c-27.57 0-50 22.43-50 50v119.988c0 27.57 22.43 50 50 50h64.692c-2.276 74.706-30.621 113.542-86.459 118.622a10 10 0 00-9.094 9.959V475a10 10 0 0010.561 9.984c68.908-3.876 121.511-27.591 156.349-70.487C494.521 372.052 512 310.029 512 230.152V77c0-27.57-22.43-50-50-50zm30 203.152c0 146.644-58.535 223.331-178.861 234.097v-79.836c30.412-4.73 53.935-18.886 70.007-42.161 17.049-24.69 25.694-60.105 25.694-105.264 0-5.522-4.477-10-10-10H324c-16.542 0-30-13.458-30-30V77c0-16.542 13.458-30 30-30h120v74.034c0 5.522 4.477 10 10 10s10-4.478 10-10v-73.96c15.612 1.034 28 14.057 28 29.926v153.152z"/><path d="M454 145.751c-5.523 0-10 4.527-10 10.049 0 5.522 4.477 10 10 10 5.522 0 10-4.478 10-10v-.099c0-5.522-4.477-9.95-10-9.95zM228 141.666c-5.523 0-10 4.478-10 10v.209c0 5.522 4.477 10 10 10s10-4.478 10-10v-.209c0-5.522-4.477-10-10-10z"/></svg>',
      brief:
        "Quality in a product or service is not what the supplier puts in. it is what the customer gets out and is willing to pay for.",
      name: "Edwards Deming",
    },
  ],
};
const Testimonial = () => {
  return (
    <>
      <div
        className="khalif-testimonial-wrape text-center relative testimonial-bg py-[100px] bg-center bg-cover h-full bg-[#1a2b3c] bg-no-repeat before:content-[''] before:absolute before:left-0 before:top-0 before:bg-[rgb(0,0,0/60%)] before:w-full before:h-full"
        style={{ backgroundImage: `url(${TestimonialData.bgimage})` }}
      >
        <div className="container">
          <div className="grid grid-cols-12 gap-x-6">
            <div className="xl:col-start-3 xl:col-end-11 md:col-span-12 sm:col-span-12">
              <Swiper
                modules={[Autoplay]}
                slidesPerView="auto"
                breakpoints={{
                  0: {
                    slidesPerView: 1,
                  },
                  1030: {
                    slidesPerView: 1,
                  },
                  1200: {
                    slidesPerView: 1,
                  },
                }}
                autoplay={true}
                allowTouchMove={true}
                loop={true}
                speed={1000}
                className="all-testimonial text-center"
              >
                {TestimonialData.Slider.map((item, i) => (
                  <SwiperSlide key={i}>
                    <div className="single-testimonial-content">
                      <span dangerouslySetInnerHTML={{ __html: item.icon }} />
                      <h2 className="text-[54px] font-semibold my-[50px] mx-0 sm:text-[28px] sm:leading-10">
                        {item.brief}
                      </h2>
                      <h4 className="text-[18px] uppercase">{item.name}</h4>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Testimonial;

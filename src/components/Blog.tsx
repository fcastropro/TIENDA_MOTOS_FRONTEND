import React from "react";
import { Link } from "react-router-dom";
import img1 from "../assets/img/blog/1.jpg";
import img2 from "../assets/img/blog/2.jpg";
import img3 from "../assets/img/blog/3.jpg";
import img4 from "../assets/img/blog/4.jpg";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
 
const BlogData = {
  title: "blog",
  title2: "latest news",
  BlogList: [
    {
      blogimg: img1,
      title: "Lorem ipsum dolor sit consectetur, adipisicing elit.",
      date: "02 jan 2080",
      auth: "by admin",
      link: "#",
    },
    {
      blogimg: img2,
      title: "Leverage agile frameworks to provide a robust",
      date: "16 mar 2048",
      auth: "by admin",
      link: "#",
    },
    {
      blogimg: img3,
      title:
        "culpa dolore accusamus itaque mollitia, qui consequuntur excepturi",
      date: "02 jan 2080",
      auth: "by admin",
      link: "#",
    },
    {
      blogimg: img4,
      title: "deleniti velit ea sequi impedit illum nemo autem natus. Alias",
      date: "14 nov 2024",
      auth: "by admin",
      link: "#",
    },
  ],
};
const Blog = () => {
  return (
    <>
      <div className="khalif-blog-wrape pb-[70px]">
        <div className="container">
          <div className="grid grid-cols-12 gap-x-6">
            <div className="col-span-12">
              <div className="section-title-wrape uppercase text-center relative mb-20">
                <h3 className="my-stroke2 font-bold uppercase leading-[49px] text-[40px]">
                  {BlogData.title}
                </h3>
                <h4 className="uppercase font-medium text-xl mb-0">
                  {BlogData.title2}
                </h4>
              </div>
              <Swiper
                modules={[Pagination, Autoplay]}
                slidesPerView="auto"
                breakpoints={{
                  0: {
                    slidesPerView: 1,
                  },
                  600: {
                    slidesPerView: 2,
                  },
                  992: {
                    slidesPerView: 3,
                  },
                  1200: {
                    slidesPerView: 3,
                  },
                }}
                loop={true}
                pagination={{
                  clickable: true,
                }}
                speed={1000}
                autoplay={true}
                centeredSlides={true}
                className="khalif-all-blog-list"
              >
                {BlogData.BlogList.map((item, i) => (
                  <SwiperSlide
                    className="khalif-single-blog-wrape group mb-[80px] magic-hover magic-hover__square p-[15px]"
                    key={i}
                  >
                    <img className="w-full" src={item.blogimg} alt="blog" />
                    <div className="single-blog-content bg-[#070707] p-5">
                      <h4>
                        <Link
                          to={item.link}
                          className="post-title group-hover:text-[#ff5100] inline-block text-2xl font-semibold leading-10 capitalize"
                        >
                          {item.title}
                        </Link>
                      </h4>
                      <ul className="single-post-info list-none flex items-center justify-between border-t-[1px] border-solid border-t-[#585858] pt-5 mt-5">
                        <li className="blog-date text-[18px] font-semibold m-0 text-[#888888] capitalize transition-all duration-[0.3s] hover:text-[#ff5100] hover:cursor-pointer group">
                          24 dec 2019
                        </li>
                        <li className="blog-admin text-[18px] font-semibold m-0 text-[#888888] capitalize transition-all duration-[0.3s] hover:text-[#ff5100] hover:cursor-pointer group">
                          <Link
                            className="group-hover:cursor-pointer"
                            to={item.link}
                          >
                            by admin
                          </Link>
                        </li>
                      </ul>
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

export default Blog;

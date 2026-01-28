import React, { useEffect, useState } from "react";
import bgimg from "../assets/img/services/bg.jpg";
import Tilt from "react-parallax-tilt";
import { Parallax } from "react-scroll-parallax";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../config/api";

const defaultIconClass = "fa fa-tags";

const ServicesData = {
  title: "Productos",
  title2: "Nuestros Productos",
  btntext: "more services",
  btnlink: "#",
};

const fallbackServicesList = [
  {
    iconClass: "fa fa-paint-brush",
    title: "ILLUSTRATION & ART",
    link: "#",
    brief:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore aliqua.",
    delay: "500",
  },
  {
    iconClass: "fa fa-code",
    title: "WEB DEVELOPMENT",
    link: "#",
    brief:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore aliqua.",
    delay: "300",
  },
  {
    iconClass: "fa fa-bullhorn",
    title: "DIGITAL MARKETING",
    link: "#",
    brief:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore aliqua.",
    delay: "100",
  },
];

type CategoryApiItem = {
  id?: number | string;
  name?: string;
  title?: string;
  description?: string;
  brief?: string;
  image?: string;
  iconClass?: string;
  icon_svg?: string;
  icon?: string;
};

const Services = () => {
  const [services, setServices] = useState(fallbackServicesList);

  useEffect(() => {
    const controller = new AbortController();

    const loadCategories = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/categories/`, {
          signal: controller.signal,
        });
        if (!response.ok) {
          return;
        }
        const data = await response.json();
        const categories = Array.isArray(data) ? data : data?.results;
        if (!Array.isArray(categories) || categories.length === 0) {
          return;
        }
        const mapped = categories.map(
          (category: CategoryApiItem, index: number) => {
            const rawIcon =
              category?.icon_svg || category?.iconClass || category?.icon || "";
            const iconValue = rawIcon.trim() ? rawIcon.trim() : defaultIconClass;

            return {
              iconClass: iconValue,
              title: category?.name || category?.title || "Categoria",
              link: "#",
              brief: category?.description || category?.brief || "",
              delay: `${(index + 1) * 100}`,
            };
          }
        );
        setServices(mapped);
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          return;
        }
      }
    };

    loadCategories();

    return () => controller.abort();
  }, []);

  return (
    <>
      <div
        className="khalif-services-wrape services-bg py-[100px] bg-center bg-cover bg-fixed relative h-full bg-[#1a2b3c] bg-no-repeat before:content-[''] before:absolute before:left-0 before:right-0 before:top-0 before:bottom-0 before:bg-[#0707071a]"
        style={{ backgroundImage: `url(${bgimg})` }}
      >
        <div className="container">
          <div className="grid grid-cols-12 gap-x-6">
            <div className="col-span-12">
              <div className="section-title-wrape text-center uppercase relative mb-[100px]">
                <h3 className="my-stroke2 font-bold uppercase leading-[49px] text-[40px]">
                  {ServicesData.title}
                </h3>
                <h4 className="uppercase font-medium text-xl mb-0">
                  {ServicesData.title2}
                </h4>
              </div>
            </div>
            {services.map((item, i) => (
              <div
                className="xl:col-span-4 lg:col-span-4 md:col-span-6 sm:col-span-12"
                key={i}
              >
                <div
                  className="single-services-wrape bgc-2 p-[30px] ml-6 relative transition-all duration-[0.3s] mb-[60px] hover:before:border-[#ff5100] group"
                  data-aos="fade-right"
                  data-aos-delay={item.delay}
                >
                  <Parallax
                    className="services-style-shape absolute top-[60px] right-[60px] transition-all duration-[0.3s] group"
                    translateY={["-20px", "0px"]}
                  >
                    <svg
                      className="w-6 h-auto fill-[#595959] group-hover:fill-[#ff5100]"
                       
                      viewBox="0 0 32 32"
                       
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M6 10a2 2 0 01-2 2 2 2 0 01-2-2 2 2 0 012-2 2 2 0 012 2zM18 10a2 2 0 01-2 2 2 2 0 01-2-2 2 2 0 012-2 2 2 0 012 2zM30 10a2 2 0 01-2 2 2 2 0 01-2-2 2 2 0 012-2 2 2 0 012 2zM30 22a2 2 0 01-2 2 2 2 0 01-2-2 2 2 0 012-2 2 2 0 012 2zM17.646 22a2 2 0 01-2 2 2 2 0 01-2-2 2 2 0 012-2 2 2 0 012 2zM6 22a2 2 0 01-2 2 2 2 0 01-2-2 2 2 0 012-2 2 2 0 012 2z" />
                    </svg>
                  </Parallax>
                  <div className="single-services-icon w-[180px] h-[180px] bg-[#323232] text-center -ml-10 -mt-[50px] relative flex items-center justify-center -skew-x-[8deg] before:content-[''] before:absolute before:w-[180px] before:h-[180px] before:top-0 before:right-0 before:border-r-2 before:border-t-2 before:border-solid before:border-white after:content-[''] after:absolute after:top-full after:left-[1px] after:w-0 after:h-0 after:border-t-[24px] after:border-solid after:border-t-[#585858] after:border-l-[24px] after:border-l-transparent after:skew-x-[8deg]">
                    <i
                      className={`${item.iconClass} text-white text-[70px] transition-all duration-[0.3s] group-hover:text-[#ff5100]`}
                      aria-hidden="true"
                    ></i>
                  </div>
                  <h3>
                    <Link
                      className="block uppercase mt-[30px] mx-0 mb-5 text-[28px] group-hover:text-[#ff5100]"
                      to={item.link}
                    >
                      {item.title}
                    </Link>
                  </h3>
                  <p>{item.brief}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;

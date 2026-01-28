import React, { useEffect, useState } from "react";
import Tilt from "react-parallax-tilt";
import Lightbox from "yet-another-react-lightbox";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import bgimg from "../assets/img/team/bg.jpg";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../config/api";

const TeamData = {
  title: "Todos",
  title2: "NUESTROS PRODUCTOS",
  bgimg: bgimg,
  btntext: "Pidelos",
  btnlink: "#",
};

type ProductApiItem = {
  id?: number | string;
  name?: string;
  title?: string;
  description?: string;
  brief?: string;
  image?: string;
  image_url?: string;
  thumbnail?: string;
};

const normalizeAssetUrl = (value: string) => {
  if (!value) {
    return "";
  }
  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value;
  }
  const separator = value.startsWith("/") ? "" : "/";
  return `${API_BASE_URL}${separator}${value}`;
};

const Team = () => {

  // portfolio image light box
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [products, setProducts] = useState<
    { img: string; name: string; description: string }[]
  >([]);
  const [isLoaded, setIsLoaded] = useState(false);
  // Function to open the lightbox and set the current image index
  const openLightbox = (index) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  useEffect(() => {
    const controller = new AbortController();

    const loadProducts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/products/`, {
          signal: controller.signal,
        });
        if (!response.ok) {
          setIsLoaded(true);
          return;
        }
        const data = await response.json();
        const items = Array.isArray(data) ? data : data?.results;
        if (!Array.isArray(items)) {
          setIsLoaded(true);
          return;
        }
        const mapped = items.map((product: ProductApiItem) => ({
          img: normalizeAssetUrl(
            product?.image_url || product?.image || product?.thumbnail || ""
          ),
          name: product?.name || product?.title || "Producto",
          description: product?.description || product?.brief || "",
        }));
        setProducts(mapped);
        setIsLoaded(true);
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          setIsLoaded(true);
        }
      }
    };

    loadProducts();

    return () => controller.abort();
  }, []);

  return (
    <>
      <div
        className="khalif-team-wrape team-bg py-[100px] bg-center bg-cover relative h-full bg-[#1a2b3c] bg-no-repeat before:content-[''] before:absolute before:left-0 before:top-0 before:w-full before:h-full before:bg-[rgb(0,0,0/5%)] mb-[100px]"
        style={{ backgroundImage: `url(${TeamData.bgimg})` }}
      >
        <div className="container">
          <div className="grid grid-cols-12 gap-x-6">
            <div className="col-span-12">
              <div className="section-title-wrape uppercase text-center relative mb-20">
                <h3 className="my-stroke2 font-bold uppercase leading-[49px] text-[40px]">
                  {TeamData.title}
                </h3>
                <h4 className="uppercase font-medium text-xl mb-0">
                  {TeamData.title2}
                </h4>
              </div>
              {isLoaded && products.length === 0 ? (
                <div className="text-center text-white text-xl uppercase">
                  Sin productos
                </div>
              ) : (
                <Swiper
                  modules={[Navigation, Autoplay]}
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
                  speed={1000}
                  autoplay={true}
                  centeredSlides={true}
                  className="khalif-all-team-area text-center"
                >
                  {products.map((item, index) => (
                    <SwiperSlide key={index}>
                      <div className="single-team-wrape p-[15px] relative mt-[70px]">
                        <div className="team-img-wrape relative before:content-[''] before:absolute before:left-0 before:right-0 before:top-0 before:bottom-0 before:transition-all before:duration-[0.3s] before:bg-gradient-to-b before:from-[rgba(0,0,0,0)0%] before:to-[rgba(2,2,0,0)1%,#000_100%]">
                          {item.img ? (
                            <img
                              className="rounded-[10px]"
                              src={item.img}
                              alt={item.name}
                            />
                          ) : (
                            <div className="rounded-[10px] bg-[#323232] h-[425px] w-full"></div>
                          )}
                          <div className="team-title-desig-wrape absolute left-0 right-0 bottom-[25px] transition-all duration-[0.3s]">
                            <div className="team-popup-wrape opacity-0 invisible transition-all duration-[0.5s]">
                              <div
                                className="popup-team hover:bg-[#ff5100] hover:border-white w-[70px] h-[70px] leading-[80px] text-center border-[1px] border-solid border-[#595959] rounded-[50%] inline-block cursor-pointer"
                                onClick={() => openLightbox(index)}
                              >
                                <svg
                                  className="inline-block w-5 h-5 mt-0 mx-auto mb-[10px] duration-[0.3s] fill-white -rotate-45"
                                  id="Layer_4"
                                  data-name="Layer 1"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 128 95.91"
                                >
                                  <path
                                    d="M259.88,468.09l-52,45.93-5.1-5.52,43.33-38.41H131.88v-8H246.09l-43.25-38.36,5-5.62,52.06,46Z"
                                    transform="translate(-131.88 -418.11)"
                                  ></path>
                                </svg>
                              </div>
                            </div>
                            <h3 className="team-title font-semibold capitalize text-[28px] mx-0 mt-0 mb-5">
                              {item.name}
                            </h3>
                            <h4 className="team-desig text-xl font-normal font-jost capitalize">
                              {item.description}
                            </h4>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </div>
          </div>
        </div>
        <div className="khalif-more-team-member text-center -mb-[200px]">
          <Tilt className="inline-block" scale={1.1}>
            <Link
              to={TeamData.btnlink}
              className="btn-2 text-uppercase mt-[70px] bgc-1 btn-tilt"
            >
              <span>
                <svg
                  id="Layer_7"
                  data-name="Layer 1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 128 95.91"
                >
                  <path
                    d="M259.88,468.09l-52,45.93-5.1-5.52,43.33-38.41H131.88v-8H246.09l-43.25-38.36,5-5.62,52.06,46Z"
                    transform="translate(-131.88 -418.11)"
                  />
                </svg>
              </span>
              {TeamData.btntext}
            </Link>
          </Tilt>
        </div>
      </div>
      {isOpen && products.length > 0 && (
        <Lightbox
          open={isOpen}
          close={() => setIsOpen(false)}
          slides={products.map((item) => ({
            src: item.img,
            alt: item.name,
          }))}
          index={currentIndex}
        />
      )}
    </>
  );
};

export default Team;

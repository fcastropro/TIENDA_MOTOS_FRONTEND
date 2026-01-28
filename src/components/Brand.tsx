import React, { useEffect, useState } from "react";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react"; 
import logo1 from "../assets/img/brand/1.png";
import logo2 from "../assets/img/brand/2.png";
import logo3 from "../assets/img/brand/3.png";
import logo4 from "../assets/img/brand/4.png";
import logo5 from "../assets/img/brand/5.png";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../config/api";

const BrandData = {
  title: "Marcas",
  title2: "Nuestras MArcas",
  BrandList: [
    {
      img: logo1,
      link: "#",
    },
    {
      img: logo2,
      link: "#",
    },
    {
      img: logo3,
      link: "#",
    },
    {
      img: logo4,
      link: "#",
    },
    {
      img: logo5,
      link: "#",
    },
    {
      img: logo2,
      link: "#",
    },
  ],
};

type BrandApiItem = {
  id?: number | string;
  name?: string;
  title?: string;
  image?: string;
  logo?: string;
  logo_url?: string;
  link?: string;
  url?: string;
  slug?: string;
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

const defaultBrandList = BrandData.BrandList;

const Brand = () => {
  const [brands, setBrands] = useState(defaultBrandList);

  useEffect(() => {
    const controller = new AbortController();

    const loadBrands = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/brands/`, {
          signal: controller.signal,
        });
        if (!response.ok) {
          return;
        }
        const data = await response.json();
        const items = Array.isArray(data) ? data : data?.results;
        if (!Array.isArray(items) || items.length === 0) {
          return;
        }
        const mapped = items
          .map((brand: BrandApiItem) => {
            const image =
              brand?.logo_url || brand?.logo || brand?.image || "";
            const img = normalizeAssetUrl(image);
            if (!img) {
              return null;
            }
            return {
              img,
              link: brand?.link || brand?.url || "#",
              name: brand?.name || brand?.title || "brand",
            };
          })
          .filter(Boolean) as { img: string; link: string; name: string }[];

        if (mapped.length > 0) {
          setBrands(mapped);
        }
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          return;
        }
      }
    };

    loadBrands();

    return () => controller.abort();
  }, []);

  return (
    <>
      <div className="khalif-brand-wrape py-[100px]">
        <div className="container">
          <div className="col-span-12">
            <div className="section-title-wrape text-center uppercase relative mb-20">
              <h3 className="my-stroke2 font-bold uppercase leading-[49px] text-[40px]">
                {BrandData.title}
              </h3>
              <h4 className="uppercase font-medium text-xl mb-0">
                {BrandData.title2}
              </h4>
            </div>
            <Swiper
              className="all-brand"
              modules={[Navigation, Autoplay]}
              navigation={{
                nextEl: ".swiper-next",
                prevEl: ".swiper-prev",
              }}
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
                  slidesPerView: 5,
                },
              }}
              autoplay={true}
              allowTouchMove={true}
              loop={true}
              speed={1000}
            >
              {brands.map((item, i) => (
                <SwiperSlide key={i}>
                  <div className="single-brand py-0 px-10">
                    <Link to={item.link}>
                      <img src={item.img} alt={item.name || "brand"} />
                    </Link>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
};

export default Brand;

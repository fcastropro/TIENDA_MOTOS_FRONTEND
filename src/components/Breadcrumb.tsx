import React from "react";
import bgimg from "../assets/img/breadcrumb/1.png";
import { Link } from "react-router-dom";
 

const BreadcrumbData = {
  home: "home",
  brief:
    "Ofrecemos aros y llantas para todo tipo de vehículos, con la mejor calidad y al mejor precio. Ya sea que busques mejorar el rendimiento, la estética o la seguridad de tu coche, tenemos la opción perfecta para ti.",
};
const Breadcrumb = ({ title, pgtitle }) => {
  return (
    <>
      <div
        id="khalif-breadcrumb-wrape"
        className="khalif-breadcrumb-wrape breadcrumb-bg text-center flex items-center bg-center bg-cover min-h-[768px] bg-[#111111] bg-no-repeat z-[1]"
        style={{ backgroundImage: `url(${bgimg})` }}
      >
        <div className="container">
          <div className="grid grid-cols-12 gap-x-6">
            <div className="xl:col-start-3 xl:col-end-11 lg:col-start-3 lg:col-span-12 md:col-span-12 sm:col-span-12">
              <div className="khalif-breadcrumb-content">
                <h2 className="text-white text-[80px] font-medium mb-5 uppercase">
                  {pgtitle}
                </h2>
                <ul className="breadcrumb bg-inherit flex items-center justify-center">
                  <li className="breadcrumb-item text-2xl font-antonio">
                    <Link to="/" className="capitalize">
                      {BreadcrumbData.home}
                    </Link>
                  </li>
                  <li
                    className="breadcrumb-item capitalize text-2xl font-antonio ml-2 active relative
									  text-white inline-block before:mr-2 before:content-['/']"
                  >
                    {title}
                  </li>
                </ul>
                <p className="text-xl font-semibold leading-10 mt-[70px] mx-0 mb-0">
                  {BreadcrumbData.brief}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Breadcrumb;

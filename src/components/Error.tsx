import React from "react";
import Tilt from "react-parallax-tilt";
import { Link } from "react-router-dom";

const ErrorData = {
  title: "404",
  title2: "oops! page not found!",
  btntext: "learn more",
  btnlink: "#",
};
const Error = () => {
  return (
    <>
      <div className="khalif-error-area py-[100px]">
        <div className="container">
          <div className="grid grid-cols-12 gap-x-6">
            <div className="col-span-12">
              <div className="khalif-content-box text-center">
                <h2 className="font-bold leading-none text-[#ff5100] mb-10 text-[200px]">
                  {ErrorData.title}
                </h2>
                <h3 className="font-bold capitalize text-5xl mt-[10px] mx-0 mb-[60px]">
                  {ErrorData.title2}
                </h3>
                <div className="error-btn-box">
                  <Tilt className="inline-block" scale={1.1}>
                    <Link
                      to={ErrorData.btnlink}
                      className="btn-2 bgc-2 text-center uppercase btn-tilt"
                    >
                      <span>
                        <svg
                          id="Layer_1"
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
                      {ErrorData.btntext}
                    </Link>
                  </Tilt>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Error;

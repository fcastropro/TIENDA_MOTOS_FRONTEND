import React from "react";
import Tilt from "react-parallax-tilt";
import Sidewdg from "./Sidewdg";
import img1 from "../assets/img/blog/5.jpg";
import img2 from "../assets/img/blog/2.jpg";
import img3 from "../assets/img/blog/4.jpg";
import cmtimg1 from "../assets/img/blog/c1.png";
import cmtimg2 from "../assets/img/blog/c2.png";
import { Link } from "react-router-dom";

const BlogdetailsData = {
  img1: img1,
  title:
    "Crafting a Creative Blog: A Step-by-Step Guide Lorem ipsum dolor sit consectetur, adipisicing elit.",
  brief1:
    "There are many variations of passages of Lorem Ipsum available, but the have and majority have suffered teration some form, by injected humour, and omised words which don't look even slightly believable. There are many of it passages of Lorem’s Ipsum available, but the",
  img2: img2,
  img3: img3,
  title2:
    "How to Leverage Social Media for Your Creative agile frameworks to provide a robust blog That Stands Out",
  brief2:
    "It is a long established fact that a reader will be distracted by the readable of a page when this looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters",
  brief3:
    "It is a long established fact that a reader will be distracted by the readable of a page when this looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
  blockquote:
    "industry.has been the industry's standard dummy text ever since the 1500s, when an unk nown printer took a galley of type and and scrales",
  blockquoteauthor: "Khalif Mark",
  brief4:
    "It is a long established fact that a reader will be distracted by the readable of a page when this looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters",
  brief5:
    "It is a long established fact that a reader will be distracted by the readable of a page when this looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
  date: "16 Mar 2048",
  author: "admin",
  authorlink: "#",
  tagtitle: "Post Tags:",
  TagsList: [
    {
      title: "awesome",
      link: "#",
    },
    {
      title: "template",
      link: "#",
    },
    {
      title: "ui/ux",
      link: "#",
    },
  ],

  commentitle: "3 Comments",
  CommentList: [
    {
      img: cmtimg1,
      title: "Khalif Mark",
      date: "Dec 08 2022",
      brief:
        "industry. Lorem Ipsum has been the industry's standard dummy text ever since t he 1500s, when an unknown",
      replay: "replay",
      replaylink: "#",
    },
    {
      img: cmtimg2,
      title: "Robin Smile",
      date: "Dec 08 2055",
      brief:
        "industry. Lorem Ipsum has been the industry's standard dummy text ever since t he",
      replay: "replay",
      replaylink: "#",
    },
    {
      img: cmtimg1,
      title: "Khalif Mark",
      date: "Dec 08 2022",
      brief:
        "industry. Lorem Ipsum has been the industry's standard dummy text ever since t he 1500s, when an unknown",
      replay: "replay",
      replaylink: "#",
    },
  ],
  leavtitle: "Leave A Reply",
  btn: "post comment",
};
const Blogdetails = () => {
  return (
    <>
      <div
        id="khalif-blog-details-wrape"
        className="khalif-blog-details-wrape my-[100px]"
      >
        <div className="container">
          <div className="grid grid-cols-12 gap-6">
            <div className="xl:col-span-8 lg:col-span-8 md:col-span-7 sm:col-span-12 xl:pr-[30px] lg:pr-[30px] md:pr-[30px]">
              <div className="khalif-blog-details-content-wraper">
                <div className="blog-details-content">
                  <img
                    className="w-full"
                    src={BlogdetailsData.img1}
                    alt="blog-img"
                  />
                  <h4 className="post-title mt-5 mb-[15px] font-semibold leading-normal text-3xl">
                    {BlogdetailsData.title}
                  </h4>
                  <p>{BlogdetailsData.brief1}</p>
                  <figure>
                    <img className="p-2" src={BlogdetailsData.img2} alt="img" />
                    <img className="p-2" src={BlogdetailsData.img3} alt="img" />
                  </figure>
                  <h3 className="mb-[15px] font-semibold leading-normal text-3xl">
                    {BlogdetailsData.title2}
                  </h3>
                  <p>{BlogdetailsData.brief2}</p>
                  <p>{BlogdetailsData.brief3}</p>
                  <blockquote className="block-quote bg-[#070707] border-l-[6px] border-solid border-l-[#ff5100] !py-10 !px-[35px] rounded-md relative overflow-hidden my-10 mx-[30px] z-[1] before:content-['\f10d'] before:absolute before:top-2/4 before:left-2/4 before:-translate-x-1/2 before:-translate-y-1/2 before:font-Fontawesome before:text-[#595959] before:text-[150px] before:leading-none before:opacity-[0.3] before:-z-[1]">
                    <p className="text-white font-medium xl:leading-[50px] xl:text-[30px] md:text-xl md:leading-9 sm:text-xl sm:leading-9">
                      {BlogdetailsData.blockquote}
                    </p> 
                    <cite className="relative text-xs font-medium capitalize block text-white tracking-[5px] pl-[15px] mt-[25px] font-antonio before:absolute before:content-[''] before:bottom-0 before:h-[2px] before:bg-[#ff5100] before:top-2/4 before:left-0 before:-translate-y-[50%] before:w-[10px] before:my-0 before:mx-auto">
                      {BlogdetailsData.blockquoteauthor}
                    </cite>
                  </blockquote>
                  <p>{BlogdetailsData.brief4}</p>
                  <p>{BlogdetailsData.brief5}</p>
                </div>
                <ul className="post-details-info list-none flex items-center justify-between border-t-[1px] border-t-[#585858] py-5 px-0 border-b-[1px] border-solid border-b-[#585858] my-5 mx-0">
                  <li className="blog-date text-lg font-semibold m-0 text-[#888888] capitalize transition-all duration-[0.3s] hover:text-[#ff5100] hover:cursor-pointer group">
                    {BlogdetailsData.date}
                  </li>
                  <li className="blog-admin text-lg font-semibold m-0 text-[#888888] capitalize transition-all duration-[0.3s] hover:text-[#ff5100] hover:cursor-pointer group">
                    by:
                    <a
                      className="group-hover:cursor-pointer"
                      to={BlogdetailsData.authorlink}
                    >
                       
                      {BlogdetailsData.author}
                    </a>
                  </li>
                </ul>
                <div className="post-details-tag p-0 pt-0 w-full pb-0">
                  <span className="text-xl font-semibold block mb-[17px] text-white capitalize">
                    {BlogdetailsData.tagtitle}
                  </span>
                  {BlogdetailsData.TagsList.map((item, i) => (
                    <Link
                      className=" text-base leading-6 text-white py-[15px] px-5 border-[1px] border-solid border-[#595959] inline-block transition-all duration-[0.2s] capitalize rounded-[5px] mr-[5px] mb-[10px] mt-0 ml-0 font-jost font-semibold hover:text- whitehover:bg-[#ff5100] hover:border-[#ff5100] hover:rounded-[10px] hover:text-white"
                      to={item.link}
                      key={i}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
                <div className="recent-comments-area mt-[50px]">
                  <div className="post-heading mb-[30px]">
                    <h3 className="text-[28px] font-semibold capitalize text-white leading-none">
                      {BlogdetailsData.commentitle}
                    </h3>
                  </div>
                  <div className="latest-comments">
                    <ul className="p-0 m-0 list-none">
                      {BlogdetailsData.CommentList.map((item, i) => (
                        <li key={i}>
                          <div className="comments-box mb-[30px] bg-[#070707] transition-all duration-[0.3s] flex items-center rounded-[20px] py-10 px-5 border-b-[1px] border-solid border-b-[#595959] hover:border-[#ff5100]">
                            <div className="comments-avatar w-[130px] h-[130px]">
                               
                              <img
                                className="rounded-[50%] border-[1px] border-solid border-[#ff5100] p-[6px]"
                                src={item.img}
                                alt=""
                              />
                            </div>
                            <div className="comments-text pl-[30px]">
                              <div className="avatar-name-date inline-block">
                                <h5 className="text-xl font-medium capitalize text-white leading-none">
                                  {item.title}
                                </h5> 
                                <span className="capitalize font-normal text-lg mt-[15px] mx-0 mb-[12px] block text-[#888888] leading-none font-jost">
                                  {item.date}
                                </span>
                              </div>
                              <a
                                className="replay-btn inline-block text-lg font-semibold capitalize text-[#888888] float-right -mt-[6px] font-antonio hover:text-[#ff5100]"
                                to={item.replaylink}
                              >
                                {item.replay}
                              </a>
                              <p className="mb-0 text-lg">{item.brief}</p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="post-comments-form-area my-10 mx-0">
                  <div className="post-heading mb-[30px]">
                    <h3 className="text-[28px] font-semibold capitalize text-white leading-none">
                      {BlogdetailsData.leavtitle}
                    </h3>
                  </div>
                  <form action="#" className="post-comments-form">
                    <div className="grid grid-cols-12 gap-x-6">
                      <div className="col-span-12">
                        <textarea
                          name="comments"
                          className="form-control h-[133px] shadow-none text-white mb-[30px] bg-[#070707] border-[1px] border-solid border-[#595959] py-[15px] px-5 transition-all duration-[0.3s] rounded-none w-full  focus:shadow-[0px_10px_14px_0px_rgba(12,0,46,0.06)] focus:outline-none focus:border-[1px] focus:border-solid focus:border-[#ff5100]"
                          cols="30"
                          rows="10"
                          placeholder="Message"
                        ></textarea>
                      </div>
                      <div className="col-span-6">
                        <input
                          type="text"
                          className="form-control shadow-none text-white h-[70px] mb-[30px] bg-[#070707] border-[1px] border-solid border-[#595959] transition-all duration-[0.3s] py-[5px] px-5 rounded-none w-full  focus:shadow-[0px_10px_14px_0px_rgba(12,0,46,0.06)] focus:outline-none focus:border-[1px] focus:border-solid focus:border-[#ff5100]"
                          placeholder="Name *"
                        />
                      </div>
                      <div className="col-span-6">
                        <input
                          type="email"
                          className="form-control shadow-none text-white h-[70px] mb-[30px] bg-[#070707] border-[1px] border-solid border-[#595959] transition-all duration-[0.3s] py-[5px] px-5 rounded-none w-full  focus:shadow-[0px_10px_14px_0px_rgba(12,0,46,0.06)] focus:outline-none focus:border-[1px] focus:border-solid focus:border-[#ff5100]"
                          placeholder="E-mail *"
                        />
                      </div>
                      <div className="col-span-12">
                        <Tilt className="inline-block" scale={1.1}>
                          <button
                            className="btn-2 bgc-2 text-center text-uppercase btn-tilt mt-[30px]"
                            type="submit"
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
                            {BlogdetailsData.btn}
                          </button>
                        </Tilt>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <Sidewdg />
          </div>
        </div>
      </div>
    </>
  );
};

export default Blogdetails;

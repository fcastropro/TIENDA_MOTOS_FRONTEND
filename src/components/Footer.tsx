import React from "react";
import { Parallax } from "react-scroll-parallax";
import { Link } from "react-router-dom";

const FooterData = {
  newstitle:
    'get in <span class="my-stroke2 text-transparent stroke-[1px] stroke-[#595959]">touch</span>',
  copyright: "© Fernando Castro, Adriana Vargas.",
  sociallist: [
    {
      icon: "fa fa-facebook",
      link: "https://www.facebook.com/arosyllantasmetamorfosis",
      EventTarget: "_blank",
    },
  ],
  footernavlist: [
    
  ],
  contactlist: [
    
  ],
};

const Footer = () => {
  return (
    <>
      <div className="khalif-footer-wrape pt-[120px] bgc-2 relative">
        
        
        <div className="khalif-copyright-wrape">
          <div className="container">
            <div className="grid grid-cols-12 gap-x-6">
              <div className="col-span-12">
                <div className="khalif-copyright-content py-10 border-t-[1px] border-solid border-[#595959]">
                  <div className="footer-copyright inline-block capitalize">
                    <p>{FooterData.copyright}</p>
                  </div>
                  <ul className="footer-social float-right list-none">
                    {FooterData.sociallist.map((item, i) => (
                      <li
                        className="inline-block ml-[15px] my-0 mr-0 transition-all duration-[0.3s] group"
                        key={i}
                      >
                        <Link
                          className="text-white text-[18px] hover:text-[#ff5100]"
                          to={item.link}
                        >
                          <i
                            className={`${item.icon} group-hover:bg-[#111111] group-hover:text-[#ff5100] text-[18px] w-[50px] h-[50px] text-center !leading-[50px] border-[1px] border-solid border-[#595959] rounded-[50%] text-white`}
                          ></i>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;

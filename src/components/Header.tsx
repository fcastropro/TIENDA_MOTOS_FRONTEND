import React, { useEffect, useState } from "react";
import { Drawer } from "flowbite-react";
import { useLocation } from "react-router-dom";
import logo2 from "../assets/img/logo2.png";
import logo from "../assets/img/logo.png";
import { Link } from "react-router-dom";
 

const HeaderData = {
  logo: logo,
  logo2: logo2,
  btntext: "Ingresar ",
  btnlink: "/admin/login",
  Menu: [
    {
      title: "Inicio",
      link: "/",
    },
    {
      title: "Marcas",
      link: "/reviews",
    },
    {
      title: "Productos",
      link: "/about",
    },
    {
      title: "Contactanos",
      link: "/contact",
    },
  ],
  sociallist: [
    {
      icon: "fa fa-facebook",
      link: "https://www.facebook.com/arosyllantasmetamorfosis",
    },
    
    {
      icon: "fa fa-instagram",
      link: "https://www.instagram.com/arosyllantasmetamorfosis/",
    },
    
  ],
};

const Header = () => {
  const location = useLocation();
  const currentRoute = location.pathname;
  //offcanvas menu
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);

  //sticky menu
  const [sticky, setSticky] = useState(false);
  const stickyHeader = () => {
    if (window.scrollY > 200) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", stickyHeader);
  }, []);

  return (
    <>
      <Drawer
        open={isOpen}
        onClose={handleClose}
        id="drawer-disable-body-scrolling"
        className="fixed top-0 left-0 z-[99] h-screen p-4 overflow-y-auto transition-transform -translate-x-full !bg-white w-80"
      >
        <div
          id="drawer-disable-body-scrolling-label"
          className="text-[16px] font-semibold text-gray-500 uppercase khalif-canvas-logo"
        >
          <Link to="/">
            <img src={HeaderData.logo2} alt="logo" />
          </Link>
        </div>
        <Drawer.Header titleIcon={() => <></>} className="offcanvas" />
        <div className="py-4 overflow-y-auto khalif-offcanvas-mobile-menu-area">
          <nav className="py-5 px-0 my-5 mx-0 border-t-[1px] border-solid border-t-[#f1f1f1]">
            <ul>
              {HeaderData.Menu.map((item, i) => (
                <li
                  className="block relative border-b-[1px] border-solid border-b-[#f1f1f1] group"
                  key={i}
                >
                  <Link
                    className="text-[#111111] block text-base font-semibold p-[10px] transition-all duration-[0.3s] ease-linear leading-tight font-antonio capitalize group-hover:text-[#ff5100]"
                    to={item.link}
                  >
                    {item.title} 
                    {item.submenu && <i className="fa fa-angle-down"></i>}
                  </Link>
                  {item.submenu && (
                    <ul className="sub-menu text-left bg-white border-t-[3px] border-solid border-t-[#ff5100] shadow-[0_6px_12px_rgba(0,0,0,0.176)] left-0 right-0 opacity-0 absolute top-full transition-all duration-[0.4s] ease-out invisible z-[9] origin-top scale-y-0 group-hover:opacity-[1] group-hover:visible group-hover:scale-y-[1]">
                      {item.submenu.map((item, i) => (
                        <li className="block relative m-0" key={i}>
                          <Link
                            className="text-[#666666] text-[15px] font-semibold m-0 py-[13px] px-5 capitalize block font-antonio hover:text-white hover:bg-[#ff5100]"
                            to={item.link}
                          >
                            {item.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <div className="offcanvas-social">
            <ul className="text-center">
              {HeaderData.sociallist.map((item, i) => (
                <li className="inline-block my-0 mx-[5px]" key={i}>
                  <Link
                    className="block text-center text-[20px] text-[#1a2b3c] bg-white rounded-[50%] leading-[35px] w-10 h-10 transition-all duration-[0.3s]  border-[1px] border-solid border-[#f1f1f1] hover:text-white hover:bg-[#ff2f00]"
                    to={item.link}
                  >
                    <i className={item.icon}></i>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Drawer>
      <header>
        <div className="khalif-header-wrape text-center absolute left-0 right-0 top-[70px] z-[9]">
          <div className="container">
            <div className="grid grid-cols-12 gap-x-6">
              <div className="col-span-12">
                <div
                  className={`khalif-main-manu-content bg-[#44444433] rounded-[70px] py-0 px-[50px] h-[100px] ${
                    sticky ? "sticky" : ""
                  }`}
                >
                  <div className="header-logo py-5 px-0 inline-block float-left">
                    <Link to="/">
                      <img
                        src={HeaderData.logo}
                        alt="logo"
                        className="img-fluid"
                      />
                    </Link>
                  </div>
                  <button
                    className="header-top-modal-btn float-right my-[17px] mr-0 ml-[30px]"
                    onClick={() => setIsOpen(true)}
                  >
                    <div className="btn-1">
                      <span></span>
                      <span></span>
                    </div>
                  </button>
                  <ul className="header-cta-btn float-right my-10 mx-0">
                    <li className="m-0">
                      <Link
                        to={HeaderData.btnlink}
                        reloadDocument
                        className="magic-hover magic-hover__square text-sm font-semibold uppercase font-antonio text-white hover:text-[#ff5100]"
                      >
                        <i className="fa fa-long-arrow-left mr-[5px]"></i> 
                        {HeaderData.btntext} 
                      </Link>
                    </li>
                  </ul>
                  <div className="main-menu-area text-center">
                    <div className="main-menu">
                      <nav>
                        <ul>
                          {HeaderData.Menu.map((item, i) => (
                            <li
                              key={i}
                              className={`${
                                item.link === currentRoute ||
                                (item.submenu &&
                                  item.submenu.some(
                                    (sub_m) =>
                                      sub_m.link && sub_m.link === currentRoute
                                  ))
                                  ? "active"
                                  : ""
                              }`}
                            >
                              <Link to={item.link}>
                                {item.title} 
                                {item.submenu && (
                                  <i className="fa fa-angle-down"></i>
                                )}
                              </Link>
                              {item.submenu && (
                                <ul className="sub-menu text-left">
                                  {item.submenu.map((item, i) => (
                                    <li key={i}>
                                      <Link to={item.link}>{item.title}</Link>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </li>
                          ))}
                        </ul>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;

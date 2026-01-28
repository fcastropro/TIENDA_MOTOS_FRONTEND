import { useEffect } from "react";
import Awards from "../components/Awards";
import Brand from "../components/Brand";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Preloader from "../components/Preloader";
import ProgressScroll from "../components/ProgressScroll";
import Switcher from "../components/Switcher";
import { ParallaxProvider } from "react-scroll-parallax";
import AOS from "aos";
import AnimatedCursor from "react-animated-cursor";
import Breadcrumb from "../components/Breadcrumb";
import Accordians from "../components/Accordians";
const Reviews = () => {
  useEffect(() => {
    AOS.init({
      easing: "ease-out-cubic",
      once: false,
      offset: 50,
    });
  }, []);
  return (
    <>
      <ParallaxProvider>
        
        <Preloader />
        <Header />
        <Breadcrumb title={"Marcas"} pgtitle={"Marcas"} />
        <Awards />
        <Footer />
        <ProgressScroll />
      </ParallaxProvider>
      <AnimatedCursor
        innerSize={8}
        outerSize={44}
        outerStyle={{
          border: "1px solid #ffffff",
        }}
        innerStyle={{
          backgroundColor: "#ffffff",
        }}
        outerAlpha={0.3}
        innerScale={0.7}
        outerScale={1.2}
      />
    </>
  );
};
export default Reviews;

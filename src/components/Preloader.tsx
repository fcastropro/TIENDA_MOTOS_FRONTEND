 
import { useEffect, useState } from "react";

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <>
      <div
        className="preloader bg-[#070707] h-full fixed w-full z-[99999]"
        style={{ display: isLoading ? "block" : "none" }}
      >
        <div className="lds-spinner absolute left-2/4 top-2/4 -ml-5 -mt-5 w-[50px] h-10 text-center text-[10px]">
          <div className=" animate-[lds-spinner_1.2s_linear_infinite] origin-[40px_40px] after:content-[''] after:block after:absolute after:top-[3px] after:left-[37px] after:w-[6px] after:h-[18px] after:rounded-[20%] after:bg-white rotate-0 [animation-delay:-1.1s]"></div>
          <div className=" animate-[lds-spinner_1.2s_linear_infinite] origin-[40px_40px] after:content-[''] after:block after:absolute after:top-[3px] after:left-[37px] after:w-[6px] after:h-[18px] after:rounded-[20%] after:bg-white rotate-[30deg] [animation-delay:-1s]"></div>
          <div className=" animate-[lds-spinner_1.2s_linear_infinite] origin-[40px_40px] after:content-[''] after:block after:absolute after:top-[3px] after:left-[37px] after:w-[6px] after:h-[18px] after:rounded-[20%] after:bg-white rotate-[60deg] [animation-delay:-0.9s]"></div>
          <div className=" animate-[lds-spinner_1.2s_linear_infinite] origin-[40px_40px] after:content-[''] after:block after:absolute after:top-[3px] after:left-[37px] after:w-[6px] after:h-[18px] after:rounded-[20%] after:bg-white rotate-90 [animation-delay:-0.8s]"></div>
          <div className=" animate-[lds-spinner_1.2s_linear_infinite] origin-[40px_40px] after:content-[''] after:block after:absolute after:top-[3px] after:left-[37px] after:w-[6px] after:h-[18px] after:rounded-[20%] after:bg-white rotate-[120deg] [animation-delay:-0.7s]"></div>
          <div className=" animate-[lds-spinner_1.2s_linear_infinite] origin-[40px_40px] after:content-[''] after:block after:absolute after:top-[3px] after:left-[37px] after:w-[6px] after:h-[18px] after:rounded-[20%] after:bg-white rotate-[150deg] [animation-delay:-0.6s]"></div>
          <div className=" animate-[lds-spinner_1.2s_linear_infinite] origin-[40px_40px] after:content-[''] after:block after:absolute after:top-[3px] after:left-[37px] after:w-[6px] after:h-[18px] after:rounded-[20%] after:bg-white rotate-180 [animation-delay:-0.5s]"></div>
          <div className=" animate-[lds-spinner_1.2s_linear_infinite] origin-[40px_40px] after:content-[''] after:block after:absolute after:top-[3px] after:left-[37px] after:w-[6px] after:h-[18px] after:rounded-[20%] after:bg-white rotate-[210deg] [animation-delay:-0.4s]"></div>
          <div className=" animate-[lds-spinner_1.2s_linear_infinite] origin-[40px_40px] after:content-[''] after:block after:absolute after:top-[3px] after:left-[37px] after:w-[6px] after:h-[18px] after:rounded-[20%] after:bg-white rotate-[240deg] [animation-delay:-0.3s]"></div>
          <div className=" animate-[lds-spinner_1.2s_linear_infinite] origin-[40px_40px] after:content-[''] after:block after:absolute after:top-[3px] after:left-[37px] after:w-[6px] after:h-[18px] after:rounded-[20%] after:bg-white rotate-[270deg] [animation-delay:-0.2s]"></div>
          <div className=" animate-[lds-spinner_1.2s_linear_infinite] origin-[40px_40px] after:content-[''] after:block after:absolute after:top-[3px] after:left-[37px] after:w-[6px] after:h-[18px] after:rounded-[20%] after:bg-white rotate-[300deg] [animation-delay:-0.1s]"></div>
          <div className=" animate-[lds-spinner_1.2s_linear_infinite] origin-[40px_40px] after:content-[''] after:block after:absolute after:top-[3px] after:left-[37px] after:w-[6px] after:h-[18px] after:rounded-[20%] after:bg-white rotate-[330deg] [animation-delay:0s]"></div>
        </div>
      </div>
    </>
  );
};
export default Preloader;

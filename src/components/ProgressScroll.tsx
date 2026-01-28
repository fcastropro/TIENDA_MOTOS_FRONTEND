import { useEffect, useRef } from "react"; // Assuming you have a CSS module for styling

const ProgressScroll = () => {
  const progressPathRef = useRef(null);

  useEffect(() => {
    const progressPath = progressPathRef.current;
    const pathLength = progressPath.getTotalLength();

    progressPath.style.transition = progressPath.style.WebkitTransition =
      "none";
    progressPath.style.strokeDasharray = `${pathLength} ${pathLength}`;
    progressPath.style.strokeDashoffset = pathLength;
    progressPath.getBoundingClientRect();
    progressPath.style.transition = progressPath.style.WebkitTransition =
      "stroke-dashoffset 10ms linear";

    const updateProgress = () => {
      const scroll = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const progress = pathLength - (scroll * pathLength) / height;
      progressPath.style.strokeDashoffset = progress;
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress);

    const handleScroll = () => {
      if (window.scrollY > 50) {
        document
          .querySelector(".progress-wrap")
          .classList.add("active-progress");
      } else {
        document
          .querySelector(".progress-wrap")
          .classList.remove("active-progress");
      }
    };

    window.addEventListener("scroll", handleScroll);

    const handleClick = (event) => {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    document
      .querySelector(".progress-wrap")
      .addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("scroll", handleScroll);
      document
        .querySelector(".progress-wrap")
        .removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div
      className="progress-wrap fixed right-[50px] bottom-[50px] h-[46px] w-[46px] cursor-pointer block rounded-[50px] shadow-[inset_0_0_0_2px_rgba(0,0,0,0.2)] z-[10000] opacity-0 invisible translate-y-[15px] transition-all duration-[200ms] ease-linear after:absolute after:text-center after:leading-[46px] after:text-[24px] after:left-0 after:top-0 after:h-[46px] after:w-[46px] after:cursor-pointer after:block
    after: after: after: after:transition-all after:duration-[200ms] after:ease-linear after:z-[1] after:content-['\f176'] after:font-Fontawesome after:text-white hover:after:opacity-[1] before:absolute before:text-center before:leading-[46px] before:text-[24px] before:opacity-0 before:left-0 before:top-0 before:h-[46px] before:w-[46px] before:cursor-pointer before:block before:z-[2] before:transition-all before:duration-[200ms] before:ease-linear before:content-['\f176'] before:font-Fontawesome hover:before:opacity-[1]"
    >
      <svg
        className="progress-circle svg-content"
        width="100%"
        height="100%"
        viewBox="-1 -1 102 102"
      >
        <path
          ref={progressPathRef}
          className="fill-none box-border stroke-[4] transition-all duration-[200ms] ease-linear stroke-[#ff5100]"
          d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"
        ></path>
      </svg>
    </div>
  );
};
export default ProgressScroll;

import { useEffect, useRef, useState } from "react";

const Progressbar = ({
  value = 100,
  showTitle = true,
  titleContent,
  duration = 1500,
  autoplay = false,
  useWayPoint = false,
  wayPointOffset = "bottom-in-view",
  isRtl = false,
  onInit = () => {},
  onAnimationStart = () => {},
  onComplete = () => {},
  onEnd = () => {},
}) => {
  const progressRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = progressRef.current;
    const bar = el.querySelector(".ab-progress-bar");
    const title = el.querySelector(".progress-title");
    const indicator = el.querySelector(".progress-indicator");
    const numWrap = el.querySelector(".progress-indicator-inner");
    const number = el.querySelector(".percent");

    const start = () => {
      if (!started) {
        const startTime = performance.now();

        const animate = (time) => {
          const timeElapsed = time - startTime;
          const progressValue = Math.min(
            (timeElapsed / duration) * value,
            value
          );

          setProgress(progressValue);
          number.textContent = `${Math.ceil(progressValue)}%`;
          bar.style.width = `${progressValue}%`;
          numWrap.style.left = `${progressValue}%`;

          if (timeElapsed < duration) {
            requestAnimationFrame(animate);
          } else {
            setProgress(value);
            if (typeof onComplete === "function") onComplete();
          }
        };

        if (typeof onAnimationStart === "function") onAnimationStart();
        requestAnimationFrame(animate);
        setStarted(true);
      }
    };

    if (isRtl) el.classList.add("progress-rtl");

    onInit();

    if (autoplay) {
      if (useWayPoint && Waypoint) {
        new Waypoint({
          element: el,
          handler: function () {
            start();
            this.destroy();
          },
          offset: wayPointOffset,
        });
      } else {
        start();
      }
    }
  }, [started]);

  return (
    <div ref={progressRef} className="ab-progress progress-tooltip">
      {showTitle && <h4 className="progress-title">{titleContent}</h4>}
      <div className="progress-indicator">
        <div className="progress-indicator-inner">
          <span className="percent">{Math.ceil(progress)}%</span>
          <span className="down-arrow"></span>
        </div>
      </div>
      <div className="progress-bar-wrap">
        <div className="ab-progress-bar" />
      </div>
    </div>
  );
};

export default Progressbar;

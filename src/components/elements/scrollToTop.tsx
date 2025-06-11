"use client";
import { useState, useEffect } from "react";
import { RefObject } from "react";

interface ScrollToTopProps {
  scrollTo: RefObject<HTMLDivElement | null>;
}

const ScrollToTop: React.FC<ScrollToTopProps> = ({ scrollTo }) => {
  const [showButton, setShowButton] = useState(false);

  const handleScroll = () => {
    const scrollTop =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    setShowButton(scrollTop > 1500);
  };

  const backToTop = () => {
    if (scrollTo.current) {
      const width = window.innerWidth;
      const yOffset = width > 648 ? -70 : -95;
      const y =
        scrollTo.current.getBoundingClientRect().top +
        window.pageYOffset +
        yOffset;

      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      {showButton && (
        <button
          onClick={backToTop}
          className="fixed text-white bottom-[20px] z-50 left-[50%] -translate-x-1/2 p-2 rounded-full bg-[#6457FD] hover:bg-[#5046ca] flex justify-center items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4.5 15.75 7.5-7.5 7.5 7.5"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default ScrollToTop;

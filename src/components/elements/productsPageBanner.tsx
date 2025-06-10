"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import * as React from "react";

interface banner {
  imgSrc: string;
  title: string;
  paragraph: string;
}

const ProductsPageBanner: React.FC<banner> = ({ imgSrc, title, paragraph }) => {
  const containerRef = React.useRef(null);
  const isInView = useInView(containerRef, { once: true });

  const variants = {
    hidden: { opacity: 0, y: 20 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: i * 0.1,
      },
    }),
  };

  const splitedTitle = title.split(" ");

  return (
    <div className="w-full h-[100dvh] sm:h-[60vh] relative ">
      {/* sm:block hidden */}
      <Image
        src={imgSrc}
        alt="Hero Banner"
        fill
        className="object-cover object-bottom"
        priority
      />
      <div id="overlay" className="absolute inset-0 bg-black/20">
        <div
          ref={containerRef}
          id="content"
          className="flex flex-col flex-wrap max-w-full sm:items-center items-start pt-[182px] pb-5 sm:pt-[74px] justify-start sm:justify-center h-full"
        >
          <h1 className="sm:whitespace-nowrap text-center xl:text-[100px] lg:text-[80px] md:text-[60px] px-3 w-full sm:text-[50px] text-[30px] text-white font-light font-serif">
            {splitedTitle.map((el, i) => (
              <motion.span
                key={`${el}-${i}`}
                custom={i}
                initial="hidden"
                animate={isInView ? "show" : "hidden"}
                variants={variants}
                className="inline-block"
              >
                {el}&nbsp;
              </motion.span>
            ))}
          </h1>
          <p className="pt-3 text-white text-center px-3">{paragraph}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductsPageBanner;

"use client";

import { useEffect, useMemo } from "react";
import { brandsConstantBanner } from "@/components/constants/constants";
import { animate, motion, useMotionValue } from "motion/react";
import Image from "next/image";
import useMeasure from "react-use-measure";

const Section7: React.FC = () => {
  const [ref, { width }] = useMeasure();

  const xTranslation = useMotionValue(0);

  useEffect(() => {
    const finalPosition = -width / 2 - 16;

    const controls = animate(xTranslation, [0, finalPosition], {
      ease: "linear",
      duration: 100,
      repeat: Infinity,
      repeatType: "loop",
      repeatDelay: 0,
    });

    return () => controls.stop();
  }, [xTranslation, width]);

  const brandsArray = useMemo(
    () => [
      ...brandsConstantBanner,
      ...brandsConstantBanner,
      ...brandsConstantBanner,
      ...brandsConstantBanner,
    ],
    []
  );

  return (
    <div className=" sm:my-[4rem] my-[2rem] relative">
      <motion.div
        ref={ref}
        style={{ x: xTranslation }}
        className="flex items-center gap-8 w-max"
      >
        {brandsArray.map((item, index) => (
          <div
            key={index}
            className=" bg-[#EBEBEB] sm:h-30 sm:w-40 w-30 h-20 relative rounded-md"
          >
            <Image src={item.href} fill alt="" className="object-contain p-3" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Section7;

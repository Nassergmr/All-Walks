"use client";

import Hero_2 from "@/components/body/hero/hero_2";
import Section1 from "@/components/body/section1/section1";
import Section2 from "@/components/body/section2/section2";
import Section3_2 from "@/components/body/section3/section3_2";
import Section4 from "@/components/body/section4/section4";
import Section6 from "@/components/body/section6/section6";
import Section7 from "@/components/body/section7/section7";
import { motion } from "framer-motion";

const itemVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function Home() {
  return (
    <ul className="list-none p-0 m-0">
      <motion.li
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <Hero_2 />
      </motion.li>

      <motion.li
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <Section1 />
      </motion.li>

      <motion.li
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <Section2 />
      </motion.li>

      <motion.li
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <Section3_2 />
      </motion.li>

      <motion.li
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <Section4 />
      </motion.li>

      <motion.li
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <Section6 />
      </motion.li>

      <motion.li
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <Section7 />
      </motion.li>
    </ul>
  );
}

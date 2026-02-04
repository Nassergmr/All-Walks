"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState, RefObject } from "react";

export default function CustomCursor({
  containerRef,
}: {
  containerRef: RefObject<HTMLElement | null>;
}) {
  const [visible, setVisible] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const smoothX = useSpring(x, { stiffness: 300, damping: 30 });
  const smoothY = useSpring(y, { stiffness: 300, damping: 30 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const move = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // ONLY activate cursor when hovering image container
      const imageArea = target.closest("[data-cursor-area]");
      if (!imageArea) {
        setVisible(false);
        return;
      }

      setVisible(true);

      x.set(e.clientX);
      y.set(e.clientY);

      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      setDirection(e.clientX < centerX ? "left" : "right");
    };

    const enter = () => setVisible(true);
    const leave = () => setVisible(false);

    container.addEventListener("mousemove", move);
    container.addEventListener("mouseenter", enter);
    container.addEventListener("mouseleave", leave);

    return () => {
      container.removeEventListener("mousemove", move);
      container.removeEventListener("mouseenter", enter);
      container.removeEventListener("mouseleave", leave);
    };
  }, [containerRef, x, y]);

  if (!visible) return null;

  return (
    <motion.div
      style={{
        left: smoothX,
        top: smoothY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{
        scale: 1.15,
        backgroundColor: "rgba(0,0,0,0.05)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="
        fixed z-[9999]
        w-20 h-20 rounded-full
        border border-neutral-800
        pointer-events-none
        flex items-center justify-center
         text-black backdrop-blur-md
      "
    >
      <motion.span
        animate={{ rotate: direction === "left" ? 180 : 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="text-xl"
      >
        →
      </motion.span>
    </motion.div>
  );
}

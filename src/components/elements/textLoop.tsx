"use client";

import { useState, useEffect } from "react";

const sentences = [
  "Free shipping on orders over $50",
  "Sustainable, planet-friendly shoes",
  "30-day hassle-free returns",
  "New arrivals every week",
];

const TextLoop: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % sentences.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="transition-opacity duration-500 ease-in-out">
      {sentences[index]}
    </div>
  );
};

export default TextLoop;

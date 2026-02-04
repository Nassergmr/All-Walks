"use client";

import { useState, useEffect } from "react";
import Slider from "react-slick";
import { getNewArrivalsProducts } from "@/services/productServices";
import MainProductCard from "@/components/elements/mainProductCard";
import { Product } from "@/types/types";

function SampleNextArrow({
  onClick,
}: {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button
      onClick={onClick}
      className="z-10 absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-gray-100 hover:bg-[#d5d5d5] 
          shadow-md flex items-center justify-center transition"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 text-black"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5l7 7-7 7"
        />
      </svg>
    </button>
  );
}

function SamplePrevArrow({
  onClick,
}: {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button
      onClick={onClick}
      className="z-10 absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-gray-100 hover:bg-[#d5d5d5]  shadow-md flex items-center justify-center transition"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 text-black"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </button>
  );
}

const settings = {
  infinite: true,
  slidesToShow: 5,
  speed: 500,
  arrows: true,
  adaptiveHeight: true,
  nextArrow: <SampleNextArrow onClick={() => {}} />,
  prevArrow: <SamplePrevArrow onClick={() => {}} />,

  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: true,
        dots: false,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 1,
        // centerPadding: "50px",
        // centerMode: true,
      },
    },
    {
      breakpoint: 620,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        centerMode: false,
        autoplay: false,
        centerPadding: "50px",
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: false,
        arrows: false,
      },
    },
  ],
};

const Section4: React.FC = () => {
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);

  useEffect(() => {
    const fetchedProducts = async () => {
      const products = await getNewArrivalsProducts();

      setNewArrivals(products.data);
    };
    fetchedProducts();
  }, []);

  return (
    <div className="sm:px-[20px] px-0  sm:my-[4rem] my-[2rem]">
      <h1 className="uppercase mx-auto hot_picks text-center font-medium text-xl w-fit  sm:my-[4rem] my-[2rem]">
        New arrivals
      </h1>
      <Slider {...settings}>
        {newArrivals.map((e) => (
          <div className="md:px-1" key={e.id}>
            <MainProductCard
              e={e}
              id={e.id}
              key={e.id}
              gender={e.gender}
              imageSrc={e.image}
              model={e.model}
              price={e.min_price}
              link={`/product/${e.id}`}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Section4;

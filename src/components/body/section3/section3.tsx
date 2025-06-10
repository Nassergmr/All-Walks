"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import ButtonMain from "@/components/elements/buttonMain";
import { getNikeBrand } from "@/services/productServices";
import MainProductCard from "@/components/elements/mainProductCard";
import { useInView } from "react-intersection-observer";
import Slider from "react-slick";

interface Product {
  image: string;
  model: string;
  min_price: number;
  id: string;
  gender: string;
}

const Section3: React.FC = () => {
  const [nikeBrand, setNikeBrand] = useState<Product[]>([]);
  const [isInView, setIsInView] = useState(false);
  const nikeBrandSliced = nikeBrand.slice(0, -2);

  const { ref, inView } = useInView();

  useEffect(() => {
    const fetchedProducts = async () => {
      const data = await getNikeBrand();
      setNikeBrand(data.data);
    };

    fetchedProducts();
  }, []);

  useEffect(() => {
    if (inView) {
      setIsInView(true);
    }
  }, [inView]);

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
    speed: 500,
    arrows: true,
    adaptiveHeight: true,
    nextArrow: <SampleNextArrow onClick={() => {}} />,
    prevArrow: <SamplePrevArrow onClick={() => {}} />,

    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 620,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerMode: false,
          autoplay: false,
          autoplaySpeed: 3000,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "40px",
          arrows: false,
        },
      },
    ],
  };

  return (
    <div className=" sm:my-[4rem] my-[2rem] sm:px-[20px] px-0 grid md:grid-cols-2 grid-cols-1 gap-2 gap-y-5 justify-between">
      <div id="left" className="relative">
        <div
          id="product_card"
          className="relative mx-auto flex h-[80vh] md:h-[700px] overflow-hidden group"
        >
          <div id="img_container" className="md:h-[700px]">
            <Image
              src="/images/home-images/pexels-melvin-buezo-1253763-2529148 (1).jpg"
              fill
              alt=""
              className={`object-cover ${
                isInView
                  ? "scale-110 transition-transform duration-500 ease-in-out"
                  : ""
              }`}
            />
          </div>

          <div id="overlay" className="absolute inset-0  bg-black/30">
            <div
              id="content"
              className="flex text-center md:text-left h-full mx-auto  sm:mx-3 lg:mx-9 text-white justify-end gap-3  flex-col "
            >
              <h2 ref={ref} className="text-3xl font-bold">
                Nike Street-Ready Cushioning
              </h2>
              <p className="mb-[180px] sm:px-0 px-3">
                Track-tested materials and desert-inspired hues come together
                for all-day, any-surface performance.
              </p>
            </div>
          </div>

          <div
            id="buttons_container"
            className="flex z-10 mb-[90px] mx-auto md:mx-3   lg:mx-9 gap-3 mt-auto justify-center  "
          >
            <ButtonMain label="Shop Men" href="/products-men/Nike" />
            <ButtonMain label="Shop Women" href="products-women/Nike" />
          </div>
        </div>
      </div>

      {/* Large Screens */}
      <div id="right_lg" className="xl:block hidden ">
        <div id="products_container" className="grid grid-cols-3  gap-2">
          {nikeBrand.map((e) => (
            <MainProductCard
              id={e.id}
              gender={e.gender}
              key={e.id}
              imageSrc={e.image}
              model={e.model}
              price={e.min_price}
              link={`/product/${e.id}`}
            />
          ))}
        </div>
      </div>

      {/* Medium Screens */}
      <div id="right_md" className="md:block xl:hidden hidden ">
        <div id="products_container" className="grid grid-cols-2 gap-2">
          {nikeBrandSliced.map((e) => (
            <MainProductCard
              id={e.id}
              gender={e.gender}
              key={e.id}
              imageSrc={e.image}
              model={e.model}
              price={e.min_price}
              link={`/product/${e.id}`}
            />
          ))}
        </div>
      </div>

      {/* Small Screens */}
      <div id="right_sm" className="block md:hidden">
        <Slider {...settings}>
          {nikeBrand.map((e) => (
            <MainProductCard
              id={e.id}
              gender={e.gender}
              key={e.id}
              imageSrc={e.image}
              model={e.model}
              price={e.min_price}
              link={`/product/${e.id}`}
            />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Section3;

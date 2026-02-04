"use client";

import { useEffect, useRef, useState } from "react";
import CustomCursor from "@/components/elements/customMouse";
import { DotPattern } from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";
import { getMoreProducts } from "@/services/productServices";
import { Product } from "@/types/types";
import Slider from "react-slick";
import MainProductCard2 from "@/components/elements/mainProductCard2";
import Link from "next/link";

interface ProductItem {
  product_type: string;
}

export default function Section3_2() {
  const [moreProducts, setmoreProducts] = useState<Product[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<Slider | null>(null);

  useEffect(() => {
    const fetchedProducts = async () => {
      const data = await getMoreProducts();

      const filtered = data?.data?.filter(
        (item: ProductItem) => item.product_type === "sneakers",
      );
      setmoreProducts(filtered);
    };

    fetchedProducts();
  }, []);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,

    centerMode: true,
    centerPadding: "350px",

    arrows: true,
    adaptiveHeight: true,

    responsive: [
      // Large laptops
      {
        breakpoint: 1400,
        settings: {
          centerPadding: "350px",
        },
      },

      // Tablets / small laptops
      {
        breakpoint: 1024,
        settings: {
          centerMode: false,
          slidesToShow: 2,
          arrows: true,
          centerPadding: "200px",
        },
      },

      // Tablets
      {
        breakpoint: 768,
        settings: {
          centerMode: false,
          slidesToShow: 1,
          arrows: false,
        },
      },

      // Mobile
      {
        breakpoint: 480,
        settings: {
          centerMode: false,
          slidesToShow: 1,
          arrows: false,
        },
      },
    ],
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX;
    const centerX = rect.left + rect.width / 2;
    if (e.clientX < centerX) {
      sliderRef.current?.slickPrev();
    } else {
      sliderRef.current?.slickNext();
    }
    if (clickX < centerX) {
      sliderRef.current?.slickPrev();
    } else {
      sliderRef.current?.slickNext();
    }
    if ((e.target as HTMLElement).closest("a, button")) return;
  };

  return (
    <>
      <div
        ref={containerRef}
        onClick={handleClick}
        className="cursor-target relative bg-white h-auto w-full sm:my-[4rem] my-[2rem] rounded-lg"
      >
        <DotPattern
          className={cn(
            "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]",
          )}
        />
        <CustomCursor containerRef={containerRef} />
        <div className="z-20 bg-none px-0 slider-continer">
          <h1 className="uppercase mx-auto hot_picks text-center font-medium text-xl mb-[2rem] sm:pt-[4rem] pt-[2rem]  w-fit ">
            Hot Picks
          </h1>
          <Slider ref={sliderRef} {...settings}>
            {moreProducts.map((e) => (
              <div key={e.id} className="flex flex-col items-center mx-auto">
                <div data-cursor-area className="cursor-none mx-auto">
                  <MainProductCard2
                    // index={index}
                    // centerIndex={centerIndex}
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

                <div
                  onClick={(e) => e.stopPropagation()}
                  id="button_container"
                  className={`transition-all xl:w-[550px] lg:w-[500px] mx-auto duration-500 sm:mb-[4rem] mb-[2rem] pt-3 relative`}
                >
                  <Link
                    href={`/product/${e.id}`}
                    className={` mx-auto block relative text-[14px] border-black tracking-wider transition-all duration-300 ease-in-out uppercase italic bg-transparent px-5 py-2.5 text-center text-sm font-medium border rounded-full w-fit  text-black hover:bg-black hover:text-white`}
                    // z-30 relative text-[14px] ${centerIndex === index ? "text-black border-black" : "border-gray-300 text-gray-300"}
                  >
                    <button className="mx-auto" disabled={e.min_price === null}>
                      Shop Now
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getNewArrivalsWomenProducts } from "@/services/productServices";
import BreadcrumbNav from "@/components/elements/breadCrumbNave";
import MainProductCard from "@/components/elements/mainProductCard";
import { Product } from "@/types/types";

const NewArrivalsWomen: React.FC = () => {
  const [womenNewArrivals, setWomenNewArrivals] = useState<Product[]>([]);

  useEffect(() => {
    const fetchedProducts = async () => {
      const products = await getNewArrivalsWomenProducts();

      setWomenNewArrivals(products.data);
    };
    fetchedProducts();
  }, []);

  return (
    <div className="">
      <div id="buttons_container" className="flex justify-between">
        <div
          id="button_cont"
          className="
border-[#D3D4D5] border-b-2 group w-1/2 "
        >
          <Link
            href="/new-arrivals-men"
            className=" 
                ransition duration-150 ease-in-out 
                text-[#7f7f80] group-hover:text-black 
                mx-auto font-serif font-bold text-md tracking-wider"
          >
            <button className=" w-full sm:text-base text-xs  py-4">
              MEN’S NEW ARRIVALS
            </button>
          </Link>
        </div>
        <div id="button_cont" className=" w-1/2 group border-b-2 border-black">
          <button disabled className=" cursor-default w-full py-4">
            <div
              // href=""
              className=" font-serif mx-auto sm:text-base text-xs  font-bold text-md tracking-wider"
            >
              WOMEN’S NEW ARRIVALS
            </div>
          </button>
        </div>
      </div>

      <div
        id="breadcrumb_container"
        className="sm:my-[4rem] my-[2rem] container"
      >
        <BreadcrumbNav
          items={[
            { label: "home", href: "/" },
            { label: "Women’s New Arrivals" },
          ]}
        />
      </div>

      <div
        id="products_container"
        className="sm:my-[4rem] my-[2rem] grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-x-1 sm:px-[20px] px-0  sm:gap-x-5 gap-y-1 sm:gap-y-8"
      >
        {womenNewArrivals.map((e) => (
          <MainProductCard
            e={e}
            id={e.id}
            gender={e.gender}
            key={e.id}
            imageSrc={e.image}
            price={e.min_price}
            model={e.model}
            link={`/product/${e.id}`}
          />
        ))}
      </div>

      <div id="content_container" className="container sm:my-[4rem] my-[2rem]">
        <h2 className="font-bold text-3xl sm:mb-[2rem] mb-[1rem]">
          Women’s New Arrivals
        </h2>
        <p className="text-sm pb-2">
          Welcome to our latest arrivals for women — the fresh, just-released
          styles we’re thrilled to share with our community. Allwalks is
          constantly introducing new designs, fresh colors, and updated takes on
          fan favorites.
        </p>
        <p className="text-sm pt-2">
          Be sure to check back often, as many of our new arrivals are inspired
          by the natural world — from awe-inspiring national parks to the
          incredible outdoor activities our customers love, and the beautiful
          color palettes found in nature. We also collaborate with designers,
          influencers, athletes, and changemakers to create styles that not only
          look great but also support the planet through sustainable materials
          and practices.
        </p>
      </div>
    </div>
  );
};

export default NewArrivalsWomen;

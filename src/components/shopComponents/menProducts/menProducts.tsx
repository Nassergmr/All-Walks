"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { getAllBrands, getAllMenProducts } from "@/services/productServices";
import { Product } from "@/types/types";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Components
import MainProductCard from "@/components/elements/mainProductCard";
import ScrollToTop from "@/components/elements/scrollToTop";
import BreadcrumbNav from "@/components/elements/breadCrumbNave";
import { allowedBrandsConstant } from "@/components/constants/constants";

// Shadcn Ui
import { Loader2 } from "lucide-react";
import Slider from "react-slick";

const MenProducts: React.FC = () => {
  const [menProducts, setMenProducts] = useState<Product[]>([]);
  const [brands, setBrands] = useState<{ brand: string }[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const scrollTo = useRef<HTMLDivElement>(null);
  const isFetchingRef = useRef(false);

  // Fetch Brands
  useEffect(() => {
    const fetchAllBrands = async () => {
      const brands = await getAllBrands();
      const allowedBrands = allowedBrandsConstant;
      const filteredBrands = brands.filter((item: { brand: string }) =>
        allowedBrands.includes(item.brand)
      );
      setBrands(filteredBrands);
    };
    fetchAllBrands();
  }, []);

  // Fetch Products
  const fetchProducts = async (page: number) => {
    setLoading(true);

    const { products } = await getAllMenProducts(page);

    const filteredProducts = products.filter(
      (item: Product) => item.min_price !== null && item.min_price !== 0
    );

    setMenProducts((prev) => [...prev, ...filteredProducts]);
    setLoading(false);
    isFetchingRef.current = false;
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  // Fetch More Products On Scroll
  useEffect(() => {
    const handleScroll = () => {
      const bottomPosition = document.documentElement.offsetHeight;
      const scrollPosition = window.innerHeight + window.scrollY;
      const width = window.innerWidth;
      const isSmallScreens = width > 640 ? 1200 : 2500;

      if (
        scrollPosition >= bottomPosition - isSmallScreens &&
        currentPage < 5 &&
        !isFetchingRef.current
      ) {
        isFetchingRef.current = true;
        setCurrentPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [currentPage]);

  // Exclude Products With Same Ids
  const uniqueProducts = Array.from(
    new Map(menProducts.map((item) => [item.id, item])).values()
  );

  const settings = {
    infinite: false,
    slidesToShow: 5,
    speed: 500,
    arrows: false,
    adaptiveHeight: true,
    slidesToScroll: 2,
  };

  return (
    <div>
      {/* Top Buttons */}
      <div id="buttons_container" className="flex justify-between">
        <div id="button_cont" className="border-b-2 w-1/2 border-black">
          <button disabled className=" w-full py-4">
            <div className=" mx-auto font-serif font-bold sm:text-base text-xs tracking-wider">
              MEN’s SNEAKERS
            </div>
          </button>
        </div>
        <div
          id="button_cont"
          className="border-b-2 w-1/2 group border-[#D3D4D5]"
        >
          <Link
            href="/products-women"
            className=" font-serif mx-auto transition duration-150 ease-in-out text-[#7f7f80] group-hover:text-black  font-bold text-base tracking-wider"
          >
            <button className=" cursor-default sm:text-base text-xs w-full py-4">
              WOMEN’s SNEAKERS
            </button>
          </Link>
        </div>
      </div>

      <div
        id="section_container"
        ref={scrollTo}
        className=" sm:my-[4rem] my-[2rem] relative sm:gap-5 gap-0 flex sm:flex-row flex-col"
      >
        {/* Side Bar Medium & Large Screens */}
        <div
          id="side_bar_container"
          className="sm:w-[40%] md:w-[30%] lg:w-[20%] container sm:block hidden"
        >
          <div
            id="side_bar"
            className="sticky w-full pt-5 top-[56px] min-h-[100vh] overflow-y-auto "
          >
            <BreadcrumbNav
              items={[
                { label: "Home", href: "/" },
                { label: "Men’s Sneakers" },
              ]}
            />
            <div
              id="side_bar_links"
              className="flex py-3  flex-start flex-col gap-2"
            >
              {brands.map((brandItem) => (
                <Link
                  className="w-fit"
                  key={brandItem.brand}
                  href={`/products-men/${brandItem.brand}`}
                >
                  <p className="brand_item text-md relative cursor-pointer">
                    {brandItem.brand}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Side Bar Small Screens */}
        <div
          id="side_bar_container"
          className="w-full sm:hidden block relative"
        >
          <div id="breadcramb_container" className="container px-4">
            <BreadcrumbNav
              items={[
                { label: "Home", href: "/" },
                { label: "Men's Sneakers" },
              ]}
            />
          </div>

          <div id="side_bar_links" className="py-3 my-3 bg-white">
            <Slider
              {...settings}
              className="h-full"
              slidesToShow={3}
              responsive={[
                {
                  breakpoint: 480,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                    infinite: false,
                  },
                },
              ]}
            >
              {brands.map((brandItem) => (
                <div key={brandItem.brand} className="px-1">
                  <Link
                    href={`/products-men/${brandItem.brand}`}
                    className="block"
                  >
                    <button className="py-2 w-full px-3 text-sm sm:text-md text-center bg-gray-100 hover:bg-gray-200 rounded-full cursor-pointer whitespace-nowrap overflow-visible">
                      {brandItem.brand}
                    </button>
                  </Link>
                </div>
              ))}
            </Slider>
          </div>
        </div>

        {/* Main */}
        <div
          id="main"
          className="ml-auto flex md:px-[20px] px-0 flex-col sm:w-[60%] md:w-[70%] lg:w-[80%] w-full"
        >
          <div
            id="products_container"
            className="grid lg:grid-cols-3 xl:grid-cols-4 grid-cols-2 gap-1 sm:gap-3"
          >
            {uniqueProducts.map((e) => (
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

          <div
            id="loader_container"
            className={`${
              !loading ? "hidden" : "block"
            } mx-auto h-[48px] mt-[4rem] flex items-center justify-center`}
          >
            <Loader2 className={`animate-spin`} />
          </div>
        </div>
      </div>

      <ScrollToTop scrollTo={scrollTo} />
    </div>
  );
};

export default MenProducts;

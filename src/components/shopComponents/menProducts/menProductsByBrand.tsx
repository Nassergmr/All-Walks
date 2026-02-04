"use client";

interface MenProductsByBrandProps {
  brand: string;
}

import { useEffect, useState, useRef } from "react";
import Link from "next/link";

// Components
import MainProductCard from "@/components/elements/mainProductCard";
import { getMenProductsByBrand } from "@/services/productServices";
import ScrollToTop from "@/components/elements/scrollToTop";
import BreadcrumbNav from "@/components/elements/breadCrumbNave";
import { allowedBrandsConstant } from "@/components/constants/constants";

// Shadcn Ui
import { Loader2 } from "lucide-react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { toast } from "react-toastify";
import { Product } from "@/types/types";

const MenProductsByBrand: React.FC<MenProductsByBrandProps> = ({
  brand,
}: {
  brand: string;
}) => {
  const [menProducts, setMenProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isNextPageNull, setIsNextPageNull] = useState(false);

  const scrollTo = useRef<HTMLDivElement>(null);
  const isFetchingRef = useRef(false);

  // Auto Scroll To Element On Page Load
  useEffect(() => {
    if (scrollTo.current) {
      const width = window.innerWidth;
      const element = scrollTo.current;
      const yOffset = width > 648 ? -70 : -95;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, []);

  // Fetch Products
  const fetchProducts = async (page: number, brand: string) => {
    try {
      setLoading(true);
      const { products } = await getMenProductsByBrand(brand, page);

      const filteredProducts = products.filter(
        (item: { min_price: number | null }) =>
          item.min_price !== null && item.min_price !== 0,
      );
      setMenProducts((prev) => [...prev, ...filteredProducts]);

      // Handle The Case Where The Next Page Could Not Have Any Products
      const nextPageResponse = await getMenProductsByBrand(
        brand,
        currentPage + 1,
      );
      if (
        !nextPageResponse.products ||
        nextPageResponse.products.length === 0 ||
        nextPageResponse === null
      ) {
        setIsNextPageNull(true);
      }

      setLoading(false);
      isFetchingRef.current = false;
    } catch {
      setIsError(true);
      toast.error(isError);
    }
  };

  useEffect(() => {
    if (brand) {
      fetchProducts(currentPage, brand);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, brand]);

  // Fetch More Products On Scroll
  useEffect(() => {
    const handleScroll = () => {
      const bottomPosition = document.documentElement.offsetHeight;
      const scrollPosition = window.innerHeight + window.scrollY;
      const width = window.innerWidth;
      const isSmallScreens = width > 640 ? 1800 : 2500;

      if (
        scrollPosition >= bottomPosition - isSmallScreens &&
        currentPage < 5 &&
        !isNextPageNull &&
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
  }, [currentPage, isNextPageNull]);

  const uniqueProducts = Array.from(
    new Map(menProducts.map((item) => [item.id, item])).values(),
  );

  // Decode the URL-encoded brand name (e.g., "New%20Balance" → "New Balance")
  const decodedBrand = decodeURIComponent(brand);

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
      <div id="buttons_container" className="flex justify-between">
        <div id="button_cont" className="border-b-2 w-1/2 border-black">
          <button disabled className=" w-full py-4">
            <div className=" mx-auto sm:text-base text-xs font-serif font-bold text-md tracking-wider">
              MEN’S SNEAKERS
            </div>
          </button>
        </div>
        <div
          id="button_cont"
          className="border-b-2 w-1/2 group border-[#D3D4D5]"
        >
          <Link
            href="/products-women"
            className=" font-serif mx-auto transition duration-150 ease-in-out text-[#7f7f80] group-hover:text-black  font-bold text-md tracking-wider"
          >
            <button className=" sm:text-base text-xs cursor-default w-full py-4">
              WOMEN’S SNEAKERS
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
          className="sm:w-[40%] md:w-[30%] lg:w-[20%] container sm:block hidden relative"
        >
          <div
            id="side_bar"
            className="sticky pt-5 top-[56px] h-[100vh] overflow-y-auto"
          >
            <BreadcrumbNav
              items={[
                { label: "Home", href: "/" },
                { label: "Men’s Sneakers", href: "/products-men" },
                { label: decodedBrand },
              ]}
            />
            <div
              id="side_bar_links"
              className="flex py-3 flex-start flex-col gap-2"
            >
              {allowedBrandsConstant.map((brandItem) => (
                <Link
                  className="w-fit"
                  key={brandItem}
                  href={`/products-men/${brandItem}`}
                >
                  <span className="">
                    <button
                      disabled={brandItem === decodedBrand}
                      className={`
                        
                      ${
                        brandItem === decodedBrand
                          ? "selected_brand_item"
                          : "brand_item"
                      }   w-fit text-md relative cursor-pointer`}
                    >
                      {brandItem}
                    </button>
                  </span>
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
                { label: "Men's Sneakers", href: "/products-men" },
                { label: decodedBrand },
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
              {allowedBrandsConstant.map((brandItem) => (
                <div key={brandItem} className="px-1">
                  <Link
                    href={`/products-men/${brandItem}`}
                    className={`w-full ${
                      brandItem === decodedBrand ? "font-bold" : ""
                    }`}
                  >
                    <button
                      disabled={brandItem === decodedBrand}
                      className="py-2 w-full px-3 text-sm sm:text-md text-center bg-gray-100 hover:bg-gray-200 rounded-full cursor-pointer whitespace-nowrap overflow-visible"
                    >
                      {brandItem}
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
            className="grid lg:grid-cols-3 xl:grid-cols-4 custom grid-cols-2  gap-y-4   gap-x-1 md:gap-3"
          >
            {uniqueProducts.map((e) => (
              <MainProductCard
                e={e}
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
              !loading || isNextPageNull ? "hidden" : "block"
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

export default MenProductsByBrand;

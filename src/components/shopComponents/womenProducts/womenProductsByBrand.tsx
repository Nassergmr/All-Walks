"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Components
import {
  getAllBrands,
  getWomenProductsByBrand,
} from "@/services/productServices";
import { allowedBrandsConstant } from "@/components/constants/constants";
import MainProductCard from "@/components/elements/mainProductCard";
import ScrollToTop from "@/components/elements/scrollToTop";
import BreadcrumbNav from "@/components/elements/breadCrumbNave";

// Shadcn Ui
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";

interface WomenProductsByBrandProps {
  brand: string;
}

const WomenProductsByBrand: React.FC<WomenProductsByBrandProps> = ({
  brand,
}: {
  brand: string;
}) => {
  const [WomenProducts, setWomenProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const scrollTo = useRef<HTMLDivElement>(null);
  const isFetchingRef = useRef(false);

  // Fetch Brands
  useEffect(() => {
    const fetchAllBrands = async () => {
      const brands = await getAllBrands();
      const allowedBrands = allowedBrandsConstant;

      const filteredBrands = brands.filter((item) =>
        allowedBrands.includes(item.brand)
      );
      setBrands(filteredBrands);
    };
    fetchAllBrands();
  }, []);

  // Fetch Products
  const fetchProducts = async (page: number, brand: string) => {
    try {
      setLoading(true);
      const { products } = await getWomenProductsByBrand(brand, page);

      const filteredProducts = products.filter(
        (item) => item.min_price !== null && item.min_price !== 0
      );

      setWomenProducts((prev) => [...prev, ...filteredProducts]);
      setLoading(false);
      isFetchingRef.current = false;
    } catch {
      setIsError(true);
      toast.error(isError);
    }
  };

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

    // const elementRef = scrollRef.current;
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [currentPage]);

  const uniqueProducts = Array.from(
    new Map(WomenProducts.map((item) => [item.id, item])).values()
  );

  const settings = {
    infinite: false,
    slidesToShow: 5,
    speed: 500,
    arrows: false,
    adaptiveHeight: true,
    slidesToScroll: 2,
  };

  // Decode the URL-encoded brand name (e.g., "New%20Balance" → "New Balance")
  const decodedBrand = decodeURIComponent(brand);

  return (
    <div>
      <div id="buttons_container" className="flex justify-between">
        <div
          id="button_cont"
          className="border-[#D3D4D5] border-b-2 group w-1/2"
        >
          <Link
            href="/products-men"
            className=" 
                ransition duration-150 ease-in-out 
                text-[#7f7f80] group-hover:text-black 
                mx-auto font-serif font-bold text-md tracking-wider"
          >
            <button className=" w-full   sm:text-base text-xs py-4">
              MEN’s SNEAKERS
            </button>
          </Link>
        </div>
        <div
          id="buttons_container"
          className=" w-1/2 group border-b-2 border-black"
        >
          <button disabled className=" cursor-default w-full py-4">
            <div className=" font-serif  sm:text-base text-xs mx-auto font-bold text-md tracking-wider">
              WOMEN’s SNEAKERS
            </div>
          </button>
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
          className="sm:w-[40%] md:w-[30%] lg:[20%] container sm:block hidden relative"
        >
          <div
            id="side_bar"
            className="sticky pt-5 top-[56px] h-[100vh] overflow-y-auto"
          >
            <BreadcrumbNav
              items={[
                { label: "Home", href: "/" },
                { label: "Women’s Sneakers", href: "/products-women" },
                { label: decodedBrand },
              ]}
            />
            <div
              id="side_bar_links"
              className="flex py-3 flex-start flex-col gap-2"
            >
              {brands.map((brandItem) => (
                <Link
                  className="w-fit"
                  key={brandItem.brand}
                  href={`/products-women/${brandItem.brand}`}
                >
                  <span className="">
                    <button
                      disabled={brandItem.brand === decodedBrand}
                      className={`
                        
                      ${
                        brandItem.brand === decodedBrand
                          ? "selected_brand_item"
                          : "brand_item"
                      }   w-fit text-md relative cursor-pointer`}
                    >
                      {brandItem.brand}
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
          <div id="breadcramb_container" className="container">
            <BreadcrumbNav
              items={[
                { label: "Home", href: "/" },
                { label: "Women’s Sneakers", href: "/products-women" },
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
              {brands.map((brandItem) => (
                <div key={brandItem.brand} className="px-1">
                  <Link
                    href={`/products-women/${brandItem.brand}`}
                    className={`${
                      brandItem.brand === decodedBrand ? "font-bold" : ""
                    }`}
                  >
                    <button
                      disabled={brandItem.brand === decodedBrand}
                      className="py-2 w-full px-3 text-sm sm:text-md text-center bg-gray-100 hover:bg-gray-200 rounded-full cursor-pointer whitespace-nowrap overflow-visible"
                    >
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
            className="grid lg:grid-cols-3 xl:grid-cols-4 grid-cols-2 mx-auto sm:gap-3 gap-y-5"
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

export default WomenProductsByBrand;

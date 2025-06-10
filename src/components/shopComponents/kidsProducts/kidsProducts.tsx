"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Components
import { getAllBrands, getAllKidsProducts } from "@/services/productServices";
import MainProductCard from "@/components/elements/mainProductCard";
import ScrollToTop from "@/components/elements/scrollToTop";
import BreadcrumbNav from "@/components/elements/breadCrumbNave";
import { allowedKidsBrandsConstant } from "@/components/constants/constants";

// Shadcn Ui
import { Loader2 } from "lucide-react";

const KidsProducts: React.FC = () => {
  const [kidsProducts, setKidsProducts] = useState<
    { id: number; min_price: number; [key: string]: unknown }[]
  >([]);
  const [brands, setBrands] = useState<{ brand: string }[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const scrollTo = useRef<HTMLDivElement>(null);
  const isFetchingRef = useRef(false);

  // Fetch Brands
  useEffect(() => {
    const fetchAllBrands = async () => {
      const brands = await getAllBrands();
      const filteredBrands = brands.filter((item: { brand: string }) =>
        allowedKidsBrandsConstant.includes(item.brand)
      );
      setBrands(filteredBrands);
    };
    fetchAllBrands();
  }, []);

  // Fetch Products
  const fetchProducts = async (page: number) => {
    setLoading(true);

    const { products } = await getAllKidsProducts(page);

    const filteredProducts = products.filter(
      (item: { min_price: number | null }) =>
        item.min_price !== null && item.min_price !== 0
    );

    setKidsProducts((prev) => [...prev, ...filteredProducts]);
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

    // const elementRef = scrollRef.current;
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [currentPage]);

  // Exclude Products With Same Ids
  const uniqueProducts = Array.from(
    new Map(kidsProducts.map((item) => [item.id, item])).values()
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
                { label: "Kids’s Sneakers" },
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
                  href={`/products-kids/${brandItem.brand}`}
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
          <div id="breadcramb_container" className="container">
            <BreadcrumbNav
              items={[
                { label: "Home", href: "/" },
                { label: "Kids’s Sneakers" },
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
                    href={`/products-kids/${brandItem.brand}`}
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
                id={String(e.id)}
                gender={String(e.gender)}
                key={e.id}
                imageSrc={String(e.image)}
                model={String(e.model)}
                price={e.min_price}
                // isAdded={isAdded}
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

export default KidsProducts;

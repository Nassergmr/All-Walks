"use client";

import { useEffect, useState } from "react";
import { getSingleProduct } from "@/services/productServices";
import Image from "next/image";

// Components
import {
  dummySizesConstant,
  dummySizesKidsConstant,
} from "@/components/constants/constants";
import AccordionComponent from "./accordionComponent";
import TabsComponent from "./tabsComponent";
import BreadCrambNavComponent from "./breadCrambNavComponent";
import ProductBanner from "@/components/elements/productBanner";

// Shadcn UI
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { addToFavorites } from "@/redux/features/favorites/favoritesSlice";
import { RootState } from "@/redux/store";
import { toast } from "react-toastify";
import { Product } from "@/types/types";

type Props = {
  id: string;
};

const SingleProduct: React.FC<Props> = ({ id }) => {
  const [productInfo, setProductInfo] = useState<Product>({} as Product);
  const [index, setIndex] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [selectedSize, setSelectedSize] = useState<number | string | null>(
    null
  );
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const isAdded = useSelector((state: RootState) =>
    state.favorites.favoritesItems.some((item) => item.id === id)
  );

  const dummySizes = dummySizesConstant;
  const dispatch = useDispatch();

  // Fetch Product Data
  useEffect(() => {
    const fetchProduct = async () => {
      const { product } = await getSingleProduct(id);
      setProductInfo(product);
    };
    fetchProduct();
  }, [id, selectedSize]);

  // Load The Gallery Images
  useEffect(() => {
    if ((productInfo?.gallery_360 ?? []).length > 0) {
      productInfo.gallery_360?.forEach((src) => {
        const img = new window.Image();
        img.src = src;
      });
    }
  }, [productInfo?.gallery_360]);

  // 360 Image Slider
  const handleSliderChange = (value: number[]) => {
    setIndex(value[0]);
  };

  const handleAddToCart = (product: Product) => {
    toast.success("Added to cart");
    dispatch(addToCart({ ...product, size: selectedSize || 0 }));
  };

  const handleAddToFavorites = (product: Product) => {
    if (!isAdded) {
      toast.success("Added to favorites");
    } else {
      toast.success("Removed from favorites");
    }
    dispatch(addToFavorites({ ...product }));
  };

  return (
    <div>
      <div
        id="product_section"
        className="container grid sm:mt-[6rem] sm:mb-[4rem] mt-[9rem] mb-[2rem] gap-10   lg:grid-cols-2 grid-cols-1 relative justify-between"
      >
        {/* Left */}
        <div id="left">
          <div id="breadcrumb_container" className="lg:hidden block mb-5">
            <BreadCrambNavComponent productInfo={productInfo} />
          </div>
          <div
            id="image_container"
            className="relative border-1 py-8 rounded-md border-solid border-gray-200"
          >
            {/* Gallery If Available */}
            {productInfo.gallery_360?.length !== 0 ? (
              <div
                id="gallery"
                className="sm:w-[400px] w-[300px]  sm:h-[400px] h-[250px] mx-auto"
              >
                {!isLoaded && (
                  <Skeleton className="sm:w-[400px] w-[300px] sm:h-[400px] h-[250px]  mx-auto" />
                )}
                {productInfo.gallery_360 && productInfo.gallery_360[index] && (
                  <Image
                    src={productInfo.gallery_360[index]}
                    fill
                    alt={``}
                    className="object-contain top-0 absolute"
                    onLoad={() => setIsLoaded(true)}
                  />
                )}
                {productInfo.gallery_360 &&
                  productInfo.gallery_360?.length !== 0 && (
                    <Slider
                      className="cursor-pointer bottom-[-20px] absolute left-[50%] translate-x-[-50%] w-[70%] sm:w-[50%]"
                      min={0}
                      max={(productInfo.gallery_360?.length ?? 0) - 1}
                      step={1}
                      value={[index]}
                      onValueChange={handleSliderChange}
                    />
                  )}
              </div>
            ) : (
              // Single Image If No Gallery
              <div
                id="image"
                className="sm:w-[400px] w-[300px] sm:h-[400px] h-[250px]  mx-auto"
              >
                {!isLoaded && (
                  <Skeleton className="sm:w-[400px] w-[300px] sm:h-[400px] h-[250px]  mx-auto" />
                )}
                {productInfo.image && (
                  <Image
                    src={productInfo.image}
                    fill
                    alt=""
                    className="object-contain top-0 absolute"
                    onLoad={() => setIsLoaded(true)}
                  />
                )}
              </div>
            )}
          </div>

          {/* Tabs */}
          <TabsComponent productInfo={productInfo} />
        </div>

        {/* Right */}
        <div id="right" className="">
          <div
            id="content"
            className="ml-auto flex justify-center flex-col gap-4"
          >
            {/* BreadCramb */}
            <div id="breadcrumb_container" className="lg:block hidden">
              <BreadCrambNavComponent productInfo={productInfo} />
            </div>

            <hr />

            <div
              id="prices"
              className="flex lg:flex-col flex-row flex-nowrap justify-between gap-2"
            >
              <div className="text-xl flex gap-3">
                $
                {productInfo.min_price ? (
                  productInfo.min_price
                ) : (
                  <Skeleton className="w-[60px] h-[28px]" />
                )}
                <div
                  className={`${
                    productInfo.min_price !== null ? "block" : "hidden"
                  } line-through flex text-gray-500 text-xl`}
                >
                  $
                  {productInfo.max_price ? (
                    productInfo.max_price
                  ) : (
                    <Skeleton className="w-[60px] h-[28px]" />
                  )}
                </div>
              </div>
              <div id="in_stock" className="flex gap-2">
                <p className="bg-[#DCFCE7] text-[#16A34A] text-xs py-2 px-5 font-bold rounded-md">
                  In Stock
                </p>
                <p className="bg-[#DCFCE7] text-[#16A34A] text-xs py-2 px-5 font-bold rounded-md">
                  {productInfo.gender === "men"
                    ? "For Him"
                    : productInfo.gender === "women"
                    ? "For Her"
                    : "For Kids"}
                </p>
              </div>
            </div>

            <hr />

            <div id="sizes">
              <h2 className={`font-bold w-fit text-sm`}>Select Size:</h2>

              <div
                id="sizes_container"
                className={`grid xl:grid-cols-10 lg:grid-cols-8 md:grid-cols-12 sm:grid-cols-10 grid-cols-6 ${
                  isHovered ? "shadow-xl" : ""
                } py-3 gap-3 transition-shadow`}
              >
                {/* Adults Sizes */}
                {productInfo.gender !== "kids"
                  ? dummySizes.map((size) => (
                      <button
                        id={`${size.available ? "" : "unavailable"}`}
                        disabled={size.available === false}
                        onClick={() => setSelectedSize(Number(size.size))}
                        title={`${
                          size.available
                            ? ""
                            : "Unavailable – Please choose another size"
                        }`}
                        className={`${
                          Number(size.size) === selectedSize
                            ? "bg-black text-white pointer-events-none focus:bg-black"
                            : ""
                        } overflow-hidden relative  hover:bg-gray-300 cursor-pointer transition duration-100 ease-in-out h-[45px]  sm:h-[55px] w-full flex items-center justify-center border-1 border-black`}
                        key={size.size}
                      >
                        {size.size}
                      </button>
                    ))
                  : // Kids Sizes
                    dummySizesKidsConstant.map((size) => (
                      <button
                        id={`${size.available ? "" : "unavailable"}`}
                        disabled={size.available === false}
                        onClick={() => setSelectedSize(size.size)}
                        title={`${
                          size.available
                            ? ""
                            : "Unavailable – Please choose another size"
                        }`}
                        className={`${
                          size.size === selectedSize
                            ? "bg-black text-white pointer-events-none focus:bg-black"
                            : ""
                        } overflow-hidden relative  hover:bg-gray-300 cursor-pointer transition duration-100 ease-in-out h-[45px]  sm:h-[55px] w-full flex items-center justify-center border-1 border-black`}
                        key={size.size}
                      >
                        {size.size}
                      </button>
                    ))}
              </div>
            </div>

            <hr />

            {/* Add To Cart / Favorites Buttons */}
            <div
              id="buttons_container"
              className="flex justify-between items-center"
            >
              <div
                id="add_to_cart"
                className="sm:w-[90%] w-[85%]"
                onMouseEnter={() => {
                  if (selectedSize === null) {
                    setIsHovered(true);
                  }
                }}
                onMouseLeave={() => {
                  if (selectedSize === null) {
                    setIsHovered(false);
                  }
                }}
              >
                <Button
                  id="add_to_cart_button"
                  disabled={selectedSize === null}
                  size={"lg"}
                  onClick={() => handleAddToCart(productInfo)}
                  variant={"outline"}
                  className={`w-full py-5 ${
                    selectedSize === null ? "bg-gray-200 text-black" : ""
                  }`}
                >
                  {selectedSize === null ? "Select a Size" : "Add To Cart"}
                </Button>
              </div>

              <Button
                id="add_to_favorites"
                onClick={() => handleAddToFavorites(productInfo)}
                size={"lg"}
                variant={"outline"}
                className={`${
                  isAdded
                    ? "bg-black  text-white"
                    : "bg-white text-black hover:bg-[#F2F3F5] hover:text-black"
                } py-5 sm:w-[8%] w-[13%]`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  />
                </svg>
              </Button>
            </div>

            <hr />

            {/* Accordion */}
            <AccordionComponent />
          </div>
        </div>
      </div>

      {/* Product Banner */}
      <ProductBanner />
    </div>
  );
};

export default SingleProduct;

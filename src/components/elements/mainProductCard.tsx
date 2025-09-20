import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";

// Shadcn Ui
import { Skeleton } from "../ui/skeleton";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { addToFavorites } from "@/redux/features/favorites/favoritesSlice";
import { RootState } from "@/redux/store";
import {
  dummySizesConstant,
  dummySizesKidsConstant,
} from "../constants/constants";
import { Product } from "@/types/types";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { usePathname } from "next/navigation";

interface CardItemsProps {
  e: Product;
  imageSrc: string;
  model: string;
  price: number;
  link: string;
  gender: string;
  id: string;
}

const MainProductCard: React.FC<CardItemsProps> = ({
  e,
  imageSrc,
  model,
  price,
  link,
  id,
  gender,
}) => {
  const [isLoaded, setisLoaded] = useState(false);
  const [isHomePage, setIsHomePage] = useState(false);
  const [isArrivalsPath, setIsArrivalsPath] = useState(false);
  const path = usePathname();

  const isAdded = useSelector((state: RootState) =>
    state.favorites.favoritesItems.some((item) => item.id === id)
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (window.location.pathname === "/") {
      setIsHomePage(true);
    }
    if (path.includes("new-arrivals")) {
      setIsArrivalsPath(true);
    }
  }, [path]);

  const handleAddToCart = (product: Product, size: number | string) => {
    toast.success("Added to cart");
    dispatch(addToCart({ ...product, size }));
  };

  const handleAddToFavorites = () => {
    if (!isAdded) {
      toast.success("Added to favorites");
    } else {
      toast.success("Removed from favorites");
    }
    dispatch(
      addToFavorites({
        id,
        model,
        image: imageSrc,
        min_price: price,
        gender: gender,
        isAdded: isAdded,
        size: 0,
        brand: "",
        max_price: 0,
        title: "",
        short_description: "",
        created_at: 0,
        weekly_orders: 0,
        gallery_360: [],
      })
    );
  };

  return (
    <div
      id="product_card"
      className={`relative group ${
        !isHomePage ? "hover:shadow-2xl" : ""
      } w-full max-w-[350px] min-h-[320px] max-h-[355px] sm:min-h-[346px] sm:max-h-[350px] flex flex-col border border-gray-200 rounded-lg shadow-md bg-white`}
    >
      <button
        onClick={() => handleAddToFavorites()}
        id="heart"
        className="absolute top-[10px] right-[10px] z-5"
      >
        <svg
          id={`${isAdded ? "" : "heart_animated"}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`size-6 text-black focus:animate-ping ${
            isAdded ? "fill-[#6457FD] text-[#6457FD]" : ""
          }`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
          />
        </svg>
      </button>
      <div
        id="img_container"
        className="relative bg-white rounded-t-lg m-auto w-[70%] sm:min-h-[185px] min-h-[150px] overflow-hidden h-[50%] sm:h-[60%]"
      >
        {!isLoaded && <Skeleton className="w-[150px] h-[150px] mx-auto mt-5" />}
        <Image
          onLoad={() => setisLoaded(true)}
          src={imageSrc}
          className={`object-contain ${isLoaded ? "opacity-100" : "opacity-0"}`}
          fill
          alt=""
        />
      </div>

      <div id="content" className="h-[30%] px-5 sm:pt-5 pt-3">
        <div id="model_price" className="flex flex-col gap-3">
          <p className="text-md truncate">{model}</p>
          <p className="sm:text-2xl text-xl font-bold">${price}</p>
        </div>
      </div>

      <div id="button_container" className="py-3 px-5 ">
        <button className="w-full" disabled={price === null}>
          <Link
            href={link}
            className="flex gap-2 items-center justify-center  text-[14px] tracking-wider transition-all duration-300 ease-in-out italic bg-white px-5 py-2.5 text-center text-sm font-medium border-1 border-black text-black hover:bg-black hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5 lg:block hidden"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
            Shop Now
          </Link>
        </button>

        {!isHomePage && (
          <>
            <div
              id="sizes_section"
              className={` w-full hidden bg-white pb-5 h-auto z-10 left-0 absolute shadow-xl top-[340px] md:group-hover:block px-5`}
            >
              <h3 className="font-bold block  py-3">Quick Add</h3>
              <div
                id="sizes_container"
                className={`${
                  isArrivalsPath ? "lg:grid-cols-5" : ""
                } grid grid-cols-6 sm:grid-cols-5 md:grid-cols-4 gap-x-4 gap-y-3`}
              >
                {/* Adult Sizes */}
                {gender !== "kids"
                  ? dummySizesConstant.map((size) => (
                      <button
                        onClick={() => {
                          handleAddToCart(e, Number(size.size));
                        }}
                        key={size.size}
                        className={`${size.available ? "block" : "hidden"}
                                  overflow-hidden focus:bg-black focus:text-white relative text-black  hover:bg-gray-300 cursor-pointer transition duration-100 ease-in-out h-[45px] w-[45px] flex items-center justify-center border-1 border-black
                                  `}
                      >
                        {size.size}
                      </button>
                    ))
                  : // Kids Sizes
                    dummySizesKidsConstant.map((size) => (
                      <button
                        onClick={() => {
                          handleAddToCart(e, size.size);
                        }}
                        key={size.size}
                        className={`${size.available ? "block" : "hidden"}
                                  overflow-hidden focus:bg-black focus:text-white relative text-black  hover:bg-gray-300 cursor-pointer transition duration-100 ease-in-out h-[45px] w-[45px] flex items-center justify-center border-1 border-black
                                  `}
                      >
                        {size.size}
                      </button>
                    ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MainProductCard;

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Components
import {
  dummySizesConstant,
  dummySizesKidsConstant,
} from "@/components/constants/constants";
import BreadcrumbNav from "@/components/elements/breadCrumbNave";
import EmptyList from "./emptyList";
import { EmptyButton } from "@/components/elements/emptyButton";

// Shadcn Ui
import { Skeleton } from "@/components/ui/skeleton";

// Redux
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import {
  removeAllItems,
  removeItem,
} from "@/redux/features/favorites/favoritesSlice";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { toast } from "react-toastify";

const Favorites: React.FC = () => {
  const [favoritesProducts, setFavoritesProducts] = useState([]);
  const [isLoaded, setisLoaded] = useState(false);
  const [visibleProductId, setVisibleProductId] = useState<string | null>(null);
  const [isClickedId, setIsClickedId] = useState<string | null>(null);

  const dispatch = useDispatch();
  const favoritesItems = useSelector(
    (state: RootState) => state.favorites.favoritesItems
  );

  useEffect(() => {
    setFavoritesProducts(favoritesItems);
  }, [favoritesItems]);

  const handleAddToCart = (product, size) => {
    toast.success("Added to cart");
    dispatch(addToCart({ ...product, size }));
  };

  const handleRemoveFromFavorites = (id) => {
    dispatch(removeItem({ id }));
  };

  const handleRemoveAllFavorites = () => {
    dispatch(removeAllItems());
  };

  const handleIsVisible = (id) => {
    setVisibleProductId((prev) => (prev === id ? null : id));
  };

  const handleIsClicked = (id) => {
    setIsClickedId((prev) => (prev === id ? null : id));
  };

  return (
    <div
      id="section_container"
      className=" sm:mt-[6rem] sm:mb-[4rem] mt-[9rem] mb-[2rem] container"
    >
      <div id="breadcrumb_container" className="flex justify-between ">
        <BreadcrumbNav
          items={[{ label: "Home", href: "/" }, { label: "Favorites" }]}
        />
        <div id="button_container" className={`sm:hidden block`}>
          <EmptyButton
            favoritesItems={favoritesItems}
            text="Empty List"
            variant={"outline"}
            onClick={() => handleRemoveAllFavorites()}
          ></EmptyButton>
        </div>
      </div>

      <div id="products_list" className="">
        {favoritesItems.length > 0 ? (
          <>
            <div className="flex justify-between items-center mb-5 mt-3">
              <p>
                Everything you liked in one place—shop your saved styles
                anytime.
              </p>
              <div id="button_container" className={`hidden sm:block`}>
                <EmptyButton
                  favoritesItems={favoritesItems}
                  text="Empty List"
                  variant={"outline"}
                  onClick={() => handleRemoveAllFavorites()}
                ></EmptyButton>
              </div>
            </div>

            {/* List Products */}
            <div
              id="products_container"
              className=" grid lg:grid-cols-4  md:grid-cols-3 sm:grid-cols-2 grid-cols-1 justify-between gap-7"
            >
              {favoritesProducts.map((e) => (
                <div id="card_container" key={e.id} className="">
                  <div
                    id="product_card"
                    className="relative min-h-[350px]  group hover:shadow-2xl w-[auto]  flex flex-col border border-gray-200 rounded-lg shadow-md bg-white group"
                  >
                    <button
                      onClick={() => handleRemoveFromFavorites(e.id)}
                      id="close"
                      className="absolute top-[10px] right-[10px] z-5"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6 hover:rotate-90 transition duration-400 ease-in-out"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18 18 6M6 6l12 12"
                        />
                      </svg>
                    </button>

                    <div
                      id="img_container"
                      className="relative bg-white rounded-t-lg m-auto w-[70%] min-h-[185px] overflow-hidden h-[60%]"
                    >
                      {!isLoaded && (
                        <Skeleton className="w-[200px] mt-5 h-[200px] mx-auto " />
                      )}
                      <Image
                        onLoad={() => setisLoaded(true)}
                        src={e.image}
                        className={`object-contain ${
                          isLoaded ? "opacity-100" : "opacity-0"
                        }`}
                        fill
                        alt=""
                      />
                    </div>

                    <div id="content" className="h-[30%] px-5 pt-5">
                      <div id="model_price" className="flex flex-col gap-3">
                        <p className="text-md truncate">{e.model}</p>
                        <p className="text-2xl font-bold">${e.min_price}</p>
                      </div>
                    </div>

                    <div id="button_container" className="py-3 px-5 ">
                      <button className="w-full">
                        <Link
                          href={`/product/${e.id}`}
                          className="flex gap-2 items-center justify-center  text-[14px] tracking-wider transition-all duration-300 ease-in-out italic bg-white px-5 py-2.5 text-center text-sm font-medium border-1 border-black text-black hover:bg-black hover:text-white"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-5"
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

                      {/* Small Screens Sizes Trigger */}
                      <div
                        id="sizes_trigger_container"
                        className="flex justify-between items-center md:hidden"
                      >
                        <h3 className="font-bold py-3">Quick Add</h3>
                        <button
                          className={`${isClickedId === e.id ? "active" : ""}`}
                          id="plus_minus_button"
                          onClick={() => {
                            handleIsVisible(e.id);
                            handleIsClicked(e.id);
                          }}
                        >
                          <span></span>
                          <span></span>
                        </button>
                      </div>
                    </div>

                    <div
                      id="sizes_section"
                      className={`${
                        visibleProductId === e.id ? "block" : "hidden"
                      } w-full md:hidden bg-white pb-5 h-auto z-10 left-0 absolute shadow-xl top-[370px] md:top-[340px] md:group-hover:block px-5`}
                    >
                      <h3 className="font-bold md:block hidden py-3">
                        Quick Add
                      </h3>
                      <div
                        id="sizes_container"
                        className="grid grid-cols-5 sm:grid-cols-4 md:grid-cols-3 xl:grid-cols-4 gap-x-3 gap-y-3"
                      >
                        {e.gender !== "kids"
                          ? dummySizesConstant.map((size) => (
                              <button
                                onClick={() => {
                                  handleAddToCart(e, size.size);
                                }}
                                key={size.size}
                                className={`${
                                  size.available ? "block" : "hidden"
                                }
                          overflow-hidden focus:bg-black focus:text-white relative text-black  hover:bg-gray-300 cursor-pointer transition duration-100 ease-in-out h-[45px] w-auto flex items-center justify-center border-1 border-black
                          `}
                              >
                                {size.size}
                              </button>
                            ))
                          : dummySizesKidsConstant.map((size) => (
                              <button
                                onClick={() => {
                                  handleAddToCart(e, size.size);
                                }}
                                key={size.size}
                                className={`${
                                  size.available ? "block" : "hidden"
                                }
                          overflow-hidden focus:bg-black focus:text-white relative text-black  hover:bg-gray-300 cursor-pointer transition duration-100 ease-in-out h-[45px] w-auto flex items-center justify-center border-1 border-black
                          `}
                              >
                                {size.size}
                              </button>
                            ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          // Empty List
          <EmptyList />
        )}
      </div>
    </div>
  );
};
export default Favorites;

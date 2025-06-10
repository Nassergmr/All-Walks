"use client";

import React from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Shadcn Ui
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

// Components
import { EmptyButton } from "@/components/elements/emptyButton";
import Checkout from "./checkout";
import EmptyCart from "./emptyCart";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  decrementQuantity,
  incrementQuantity,
  removeAllItems,
  removeItem,
} from "@/redux/features/cart/cartSlice";

const DrawerComponent: React.FC = ({ openDrawer, setOpenDrawer }) => {
  const [cartProducts, setCartProducts] = useState([]);

  const dispatch = useDispatch();
  const cartQuantity = useSelector(
    (state: RootState) => state.cart.cartQuantity
  );
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);

  useEffect(() => {
    setCartProducts(cartItems);
  }, [cartItems]);

  const handleIncrementQuantity = (item) => {
    dispatch(incrementQuantity(item));
  };

  const handleDecrementQuantity = (item) => {
    dispatch(decrementQuantity(item));
  };

  const handleRemoveItem = (item) => {
    dispatch(removeItem(item));
  };

  const handleRemoveAllItems = () => {
    dispatch(removeAllItems());
  };

  return (
    <Drawer open={openDrawer} onOpenChange={setOpenDrawer} direction="right">
      <DrawerTrigger id="cart" className="relative">
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
            d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
          />
        </svg>
        <div
          id="cart_quantity"
          className={`absolute -top-2 -right-2 bg-[#6457FD] text-white text-xs w-[22px] h-[22px] rounded-full flex items-center justify-center ${
            cartQuantity > 0 ? "block" : "hidden"
          } font-bold`}
        >
          {cartQuantity}
        </div>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerTitle className="flex h-[80px] justify-between items-center px-5 ">
          <div
            id="cart_quantity"
            className={`${
              cartQuantity > 0 ? "block" : "hidden"
            } relative mr-auto`}
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
                d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
            <div
              id="cart_quantity"
              className={`absolute -top-2 -right-2 bg-[#6457FD] text-white text-xs w-[22px] h-[22px] rounded-full flex items-center justify-center  font-bold`}
            >
              {cartQuantity}
            </div>
          </div>

          <EmptyButton
            cartQuantity={cartQuantity}
            text="Empty Cart"
            variant={"outline"}
            onClick={() => handleRemoveAllItems()}
          ></EmptyButton>

          <DrawerClose className="w-fit ml-auto ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-8 pl-1 hover:rotate-90 transition duration-400 ease-in-out"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </DrawerClose>
        </DrawerTitle>

        <hr
          className={`mx-5 ${cartProducts.length > 0 ? "block" : "hidden"}`}
        />

        {cartItems.length > 0 ? (
          <div
            id="cart_items_container"
            className="flex h-full overflow-y-auto flex-col px-5"
          >
            {cartProducts.map((item, index) => (
              <React.Fragment key={`${item.id} - ${item.size}`}>
                <div
                  id="item_container"
                  className="grid grid-cols-[30%_60%_5%] py-5  items-center"
                  // sm:grid-cols-[40%_40%_20%] grid-cols-[40%_50%_10%]
                >
                  {/* Left */}
                  <div
                    id="left"
                    className="sm:w-[120px] w-[100px] h-full relative"
                  >
                    <Image
                      className="object-contain"
                      src={item.image}
                      fill
                      alt=" "
                    />
                  </div>

                  {/* Center */}
                  <div
                    id="center"
                    className="max-w-full pl-8 flex flex-col gap-2"
                  >
                    <Link
                      onClick={() => setOpenDrawer(false)}
                      href={`/product/${item.id}`}
                    >
                      <h3 className="truncate sm:text-base text-[14px] font-bold mb-1">
                        {item.model}
                      </h3>
                    </Link>
                    <p>size: {item.size}</p>
                    <div
                      id="quantity_container"
                      className="flex w-fit gap-2 items-center border-2 border-gray-200 px-2 "
                    >
                      <button
                        id="decrement_quantity"
                        className=""
                        onClick={() => handleDecrementQuantity(item)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-4 transition ease-in-out duration-200 text-gray-500 hover:text-black"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 12h14"
                          />
                        </svg>
                      </button>

                      <p className="min-w-[20px] text-center">
                        {item.quantity}
                      </p>

                      <button
                        id="increment_quantity"
                        className=""
                        onClick={() => handleIncrementQuantity(item)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-4 transition ease-in-out duration-200 text-gray-500 hover:text-black"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4.5v15m7.5-7.5h-15"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Right */}
                  <div
                    id="rightx"
                    className="ml-auto flex items-end flex-col justify-between"
                  >
                    <button
                      id="remove_item"
                      onClick={() => handleRemoveItem(item)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-5 hover:rotate-90 transition duration-400 "
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18 18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                    ${item.min_price}
                  </div>
                </div>
                <hr key={index} />
              </React.Fragment>
            ))}
          </div>
        ) : (
          // Empty Cart
          <EmptyCart setOpenDrawer={setOpenDrawer} />
        )}

        {/* Checkout */}
        <Checkout setOpenDrawer={setOpenDrawer} />
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerComponent;

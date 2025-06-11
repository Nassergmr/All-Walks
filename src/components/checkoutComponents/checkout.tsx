"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Components
import Stripe from "./stripe";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Shadcn Ui
import { Skeleton } from "../ui/skeleton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Redux
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const Checkout: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const cartQuantity = useSelector(
    (state: RootState) => state.cart.cartQuantity
  );

  const getTotal = () => {
    let totalPrice = 0;
    cartItems.forEach((item) => {
      totalPrice += item.min_price * item.quantity; // Assuming 'price' is the correct property
    });
    setTotalAmount(totalPrice);
  };

  useEffect(() => {
    getTotal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems]);

  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(totalAmount);

  return (
    <div>
      <div id="logo_container" className="py-10 w-fit  px-5 sm:px-12">
        <Link href={"/"} className="w-fit">
          <Image
            src={"/images/logo/allwalks.svg"}
            width={130}
            height={50}
            alt=""
          />
        </Link>
      </div>
      <hr />

      {/* Medium And Large Screens */}
      <div
        id="checkout_section_container"
        className="md:grid hidden  grid-cols-2"
      >
        {/* Left Section*/}
        <div
          id="left_section"
          className="pt-8 sticky h-[100vh] overflow-y-auto top-0 px-12"
        >
          {totalAmount >= 0.5 && (
            <Elements
              stripe={stripePromise}
              options={{
                mode: "payment",
                amount: Math.round(totalAmount * 100),
                currency: "usd",
              }}
            >
              <Stripe totalAmount={totalAmount} />
            </Elements>
          )}
        </div>

        {/* Right Section*/}
        <div id="right_section" className="bg-gray-100">
          <div
            id="checkout_items_container"
            className="flex border-l overflow-y-auto  h-auto flex-col px-12 py-5 bg-gray-100"
          >
            {cartItems.map((item) => (
              <div
                id="item_container"
                className="grid grid-cols-[30%_60%_10%] "
                key={`${item.id}-${item.size}`}
              >
                {/* Left */}
                <div id="left" className="h-full relative">
                  <div
                    id="img_container"
                    className="lg:w-[100px] lg:h-[100px] w-[70px] h-[70px] relative"
                  >
                    {!isLoaded && (
                      <Skeleton className="lg:w-[100px] lg:h-[100px] w-[70px] h-[70px]" />
                    )}
                    <Image
                      className="object-contain mb-auto"
                      src={item.image}
                      fill
                      onLoad={() => setIsLoaded(false)}
                      alt=" "
                    />
                    <div
                      id="cart_quantity"
                      className={`absolute top-2 -right-2 bg-[#6457FD] text-white text-xs w-[22px] h-[22px] rounded-full flex items-center justify-center  font-bold`}
                    >
                      {item.quantity}
                    </div>
                  </div>
                </div>

                {/* Center */}
                <div id="center" className="max-w-full flex flex-col mt-2">
                  <h3 className="truncate mb-1 text-sm">{item.model}</h3>
                  <p className="text-sm text-gray-500">size:{item.size}</p>
                </div>

                {/* Right */}
                <div
                  id="rightx"
                  className="ml-auto flex mt-2 items-end flex-col justify-between"
                >
                  ${item.min_price * item.quantity}
                </div>
              </div>
            ))}
          </div>
          <hr />
          <div
            id="total"
            className="flex mt-auto justify-between items-center border-l px-12 py-5 bg-gray-100"
          >
            <div className="">
              <span className="text-lg font-bold"> Total Cost</span>
              <span className="text-gray-500"> . </span>
              <span className="text-sm text-gray-500">
                {cartQuantity} items
              </span>
            </div>
            <p className="text-lg font-bold">{formattedAmount}</p>
          </div>
        </div>
      </div>

      {/* Small Screens */}
      <div
        id="checkout_section_container"
        className="flex md:hidden flex-col gap-5"
      >
        {/* Top Section*/}
        <div id="top_section" className="bg-gray-100 px-5 sm:px-12">
          <div id="accordion_container">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <div className="flex py-5 justify-between items-center  border-y">
                  <AccordionTrigger className=" flex items-center w-fit gap-1">
                    <p className="">Order Summary</p>
                  </AccordionTrigger>
                  <p className="text-lg font-bold">{formattedAmount}</p>
                </div>
                <AccordionContent>
                  <div
                    id="checkout_items_container"
                    className="flex py-5 flex-col"
                  >
                    {cartItems.map((item) => (
                      <div
                        id="item_container"
                        className="grid grid-cols-[30%_50%_20%] sm:grid-cols-[30%_60%_10%]  "
                        key={`${item.id}-${item.size}`}
                      >
                        {/* Left */}
                        <div id="left" className="h-full relative">
                          <div
                            id="img_container"
                            className="lg:w-[100px] lg:h-[100px] w-[70px] h-[70px] relative"
                          >
                            {!isLoaded && (
                              <Skeleton className="lg:w-[100px] lg:h-[100px] w-[70px] h-[70px]" />
                            )}
                            <Image
                              className="object-contain mb-auto"
                              src={item.image}
                              fill
                              onLoad={() => setIsLoaded(false)}
                              alt=" "
                            />
                            <div
                              id="cart_quantity"
                              className={`absolute top-2 -right-2 bg-[#6457FD] text-white text-xs w-[22px] h-[22px] rounded-full flex items-center justify-center  font-bold`}
                            >
                              {item.quantity}
                            </div>
                          </div>
                        </div>

                        {/* Center */}
                        <div
                          id="center"
                          className="max-w-full flex flex-col mt-2"
                        >
                          <h3 className="truncate mb-1 text-start text-sm">
                            {item.model}
                          </h3>
                          <p className="text-sm text-gray-500 text-start">
                            size:{item.size}
                          </p>
                        </div>

                        {/* Right */}
                        <div
                          id="rightx"
                          className="ml-auto flex mt-2 items-end flex-col justify-between"
                        >
                          ${item.min_price * item.quantity}
                        </div>
                      </div>
                    ))}
                  </div>
                  <hr />
                  <div
                    id="total"
                    className="flex py-5 justify-between items-center"
                  >
                    <div className="">
                      <span className="text-lg font-bold"> Total Cost</span>
                      <span className="text-gray-500"> . </span>
                      <span className="text-sm text-gray-500">
                        {cartQuantity} items
                      </span>
                    </div>
                    <p className="text-lg font-bold">{formattedAmount}</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        {/* Bottom Section */}
        <div id="bottom_section">
          <div id="" className="px-5 sm:px-12">
            <Elements
              stripe={stripePromise}
              options={{
                mode: "payment",
                amount: Math.round(totalAmount * 100),
                currency: "usd",
              }}
            >
              <Stripe totalAmount={totalAmount} />
            </Elements>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

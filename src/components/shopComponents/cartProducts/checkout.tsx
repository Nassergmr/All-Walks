"use client";

import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { CheckoutButton } from "./checkoutButton";
import { useEffect, useState } from "react";

interface checkoutProps {
  setOpenDrawer: (value: boolean) => void;
}

const Checkout: React.FC<checkoutProps> = ({ setOpenDrawer }) => {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const getTotal = () => {
      let total = 0;
      cartItems.forEach((item) => {
        total += item.min_price * item.quantity;
      });
      setTotalPrice(total);
    };
    getTotal();
  }, [cartItems]);

  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(totalPrice);

  return (
    <div
      id="checkout"
      className={`${
        cartItems.length > 0 ? "block" : "hidden"
      } px-5 mt-auto  pt-5 flex flex-col gap-3`}
    >
      <div id="total" className="flex justify-between">
        <p className="font-bold">Total Cost</p>
        <p> {formattedAmount}</p>
      </div>
      <Link href={"/checkout"} onClick={() => setOpenDrawer(false)}>
        <CheckoutButton />
      </Link>
      <div
        id="logos_container"
        className="flex items-end mb-3 justify-center gap-5"
      >
        <Image
          width={85}
          height={85}
          src={"/images/icons/amazon-pay-logo.svg"}
          alt=""
        />
        <Image
          width={85}
          height={85}
          src={"/images/icons/cash-app-logo.svg"}
          alt=""
        />
      </div>
    </div>
  );
};

export default Checkout;

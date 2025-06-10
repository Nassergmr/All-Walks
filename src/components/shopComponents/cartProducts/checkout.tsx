"use client";

import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { CheckoutButton } from "./checkoutButton";

interface checkoutProps {
  setOpenDrawer: (value: boolean) => void;
}

const Checkout: React.FC<checkoutProps> = ({ setOpenDrawer }) => {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);

  const getTotal = () => {
    let totalPrice = 0;
    cartItems.forEach((item) => {
      totalPrice += item.min_price * item.quantity;
    });

    const formattedAmount = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(totalPrice);

    return formattedAmount;
  };

  return (
    <div
      id="checkout"
      className={`${
        cartItems.length > 0 ? "block" : "hidden"
      } px-5 mt-auto  pt-5 flex flex-col gap-3`}
    >
      <div id="total" className="flex justify-between">
        <p className="font-bold">Total Cost</p>
        <p> {getTotal()}</p>
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

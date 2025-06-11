"use client";

import { useEffect, useState } from "react";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { toast } from "react-toastify";

type StripeProps = {
  totalAmount: number;
};

const Stripe: React.FC<StripeProps> = ({ totalAmount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedPaymentElement, setSelectedPaymentElement] = useState(false);

  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(totalAmount);

  useEffect(() => {
    fetch("/api/stripe", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ totalAmount }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [totalAmount]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    toast.error(errorMessage);

    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-success?amount=${totalAmount}`,
      },
    });

    if (error) {
      // This point is only reached if there's an immediate error when
      // confirming the payment. Show the error to your customer (for example, payment details incomplete)
      setErrorMessage(error.message);
    } else {
      // The payment UI automatically closes with a success animation.
      // Your customer is redirected to your `return_url`.
    }

    setLoading(false);
  };

  if (!clientSecret || !stripe || !elements) {
    return (
      <div className="flex flex-col gap-2">
        <Skeleton className="w-full h-[55px]" />
        <Skeleton className="w-full h-[55px]" />
        <Skeleton className="w-full h-[55px]" />
        <Skeleton className="w-full h-[48px] mt-8" />
      </div>
    );
  }

  return (
    <form className="group" onSubmit={handleSubmit} action="">
      {clientSecret && (
        <PaymentElement
          className=""
          onFocus={() => setSelectedPaymentElement(true)}
        />
      )}

      <Button
        disabled={!stripe || loading || !selectedPaymentElement}
        variant={"outline"}
        size={"lg"}
        className={`w-full my-8 cursor-pointer`}
      >
        {loading ? (
          <Loader2 className="animate-spin" />
        ) : !selectedPaymentElement ? (
          <span> Select a payment method</span>
        ) : (
          <>
            <span>Pay Now</span>
            <span>-</span>
            <span>{formattedAmount}</span>
          </>
        )}
      </Button>
    </form>
  );
};

export default Stripe;

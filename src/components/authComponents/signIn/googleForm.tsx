"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import Image from "next/image";

import { usePathname } from "next/navigation";

const GoogleForm: React.FC = () => {
  const route = usePathname();

  return (
    <Button
      onClick={() => signIn("google")}
      className="flex w-full gap-3"
      variant={"outline"}
      size={"lg"}
    >
      <Image
        width={24}
        height={24}
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        loading="lazy"
        alt="google logo"
      />
      <span>
        {route.includes("/sign-in")
          ? "Sign in with google"
          : "Sign up with google"}
      </span>
    </Button>
  );
};

export default GoogleForm;

"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { GoogleLoginAction } from "@/app/actions/googleLoginAction";
import { useActionState } from "react";
import { usePathname } from "next/navigation";

const GoogleForm: React.FC = () => {
  const [dispacthGoogle] = useActionState(GoogleLoginAction, undefined);

  const route = usePathname();

  return (
    <form action={dispacthGoogle}>
      <Button className="flex w-full gap-3" variant={"outline"} size={"lg"}>
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
    </form>
  );
};

export default GoogleForm;

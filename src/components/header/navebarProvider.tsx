"use client";

import { usePathname } from "next/navigation";
import Navebar from "./naveBar";

const NavebarProvider: React.FC = () => {
  const pathname = usePathname();
  const routes = ["/sign-in", "/sign-up", "/checkout", "/payment-success"];
  const excludedNavebarRoutes = !routes.includes(pathname);

  return excludedNavebarRoutes && <Navebar />;
};

export default NavebarProvider;

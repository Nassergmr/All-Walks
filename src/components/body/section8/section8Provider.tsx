"use client";

import { usePathname } from "next/navigation";
import Section8 from "./section8";

const Section8Provider: React.FC = () => {
  const pathname = usePathname();
  const routes = ["/sign-in", "/sign-up", "/checkout", "/payment-success"];
  const excludedNavebarRoutes = !routes.includes(pathname);

  return excludedNavebarRoutes && <Section8 />;
};

export default Section8Provider;

"use client";

import { usePathname } from "next/navigation";
import Footer from "./footer";

const FooterProvider: React.FC = () => {
  const pathname = usePathname();
  const routes = ["/sign-in", "/sign-up", "/checkout", "/payment-success"];
  const excludedNavebarRoutes = !routes.includes(pathname);

  return excludedNavebarRoutes && <Footer />;
};

export default FooterProvider;

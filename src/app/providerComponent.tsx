"use client";

import { useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { ToastContainer } from "react-toastify";
import { Slide } from "react-toastify";

const LottieLoader = dynamic(
  () => import("../components/elements/lottieLoader"),
  {
    ssr: false,
  }
);
const persistor = persistStore(store);

export function ProviderComponent({ children }: { children: React.ReactNode }) {
  const [isAuthCheckoutRoutes, setIsAuthCheckoutRoutes] = useState(false);
  const path = usePathname();

  useEffect(() => {
    const excludedRoutes = ["sign", "checkout", "success"];
    const isExcluded = excludedRoutes.some((route) => path.includes(route));
    setIsAuthCheckoutRoutes(isExcluded);

    // https://www.tidio.com/
    if (!isExcluded) {
      if (!document.getElementById("tidio-script")) {
        const script = document.createElement("script");
        script.id = "tidio-script";
        script.src = `//code.tidio.co/${process.env.NEXT_PUBLIC_TIDIO_SECRET_KEY}.js`;
        script.async = true;
        document.body.appendChild(script);
      }
    }
  }, [path]);

  // Hide The Tidio Widget On Auth And Checkout Pages
  useEffect(() => {
    const checkTidioAndToggle = () => {
      if (window.tidioChatApi) {
        if (isAuthCheckoutRoutes) {
          window.tidioChatApi.hide();
        } else {
          window.tidioChatApi.show();
        }
      } else {
        setTimeout(checkTidioAndToggle, 300);
      }
    };
    checkTidioAndToggle();
  }, [isAuthCheckoutRoutes]);

  // Session Provider And Redux Provider
  return (
    <SessionProvider>
      <Provider store={store}>
        <PersistGate loading={<LottieLoader />} persistor={persistor}>
          {children}
        </PersistGate>
      </Provider>
      <ToastContainer
        position={"top-center"}
        autoClose={isAuthCheckoutRoutes ? false : 500}
        hideProgressBar={false}
        newestOnTop={false}
        rtl={false}
        theme="dark"
        transition={Slide}
        pauseOnHover={false}
      />
    </SessionProvider>
  );
}

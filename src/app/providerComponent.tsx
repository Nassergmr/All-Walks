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
  const [isAuthRoutes, setIsAuthRoutes] = useState(false);

  const route = usePathname();
  useEffect(() => {
    if (route.includes("/sign")) {
      setIsAuthRoutes(true);
    } else {
      setIsAuthRoutes(false);
    }
  }, [route]);

  // https://www.tidio.com/
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `//code.tidio.co/${process.env.NEXT_PUBLIC_TIDIO_SECRET_KEY}.js`;
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <SessionProvider>
      <Provider store={store}>
        <PersistGate loading={<LottieLoader />} persistor={persistor}>
          {children}
        </PersistGate>
      </Provider>
      <ToastContainer
        position={"top-center"}
        autoClose={isAuthRoutes ? 2500 : 800}
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

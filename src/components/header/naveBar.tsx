"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

// Components
import TopNaveBar from "./topNaveBar";
import DialogComponent from "../shopComponents/searchProducts/dialogComponent";
import DrawerComponent from "../shopComponents/cartProducts/drawerComponent";

// Shadcn Ui
import { Avatar } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "../ui/skeleton";

// Redux
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import DrawerSmallScreensComponent from "./drawerSmallScreensComponent";

const Navebar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(true);
  const [visible, setIsVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [openSmallScreensDrawer, setOpenSmallScreensDrawer] = useState(false);

  const { data: session, status } = useSession();

  const homePath = usePathname();

  const favoritesQuantity = useSelector(
    (state: RootState) => state.favorites.favoritesQuantity,
  );

  // Top NaveBar Hidden On Scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      setIsScrolled(scrollY < 40);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Top NaveBar Visible Only In Home Page
  useEffect(() => {
    if (homePath === "/") {
      setIsVisible(true);
    } else setIsVisible(false);
  }, [homePath]);

  return (
    <>
      {/* Top NaveBar */}
      {visible && <TopNaveBar isScrolled={isScrolled} visible={visible} />}

      {/* NaveBar */}
      <nav
        id="navebar"
        style={{ top: isScrolled && visible ? "30px" : "0" }}
        className={`bg-white fixed sm:w-[calc(100%-40px)] w-full left-0 sm:left-1/2 sm:translate-x-[-50%] z-40 shadow-md rounded-lg
        transition-all ease-in-out h-auto duration-400 py-2
        `}
      >
        {/* NaveBar Items Container */}
        <div
          id="navebar_items_container"
          className="container grid grid-cols-3 justify-between items-center"
        >
          {/* Left */}
          <div id="left" className="lg:flex hidden  items-center  gap-7">
            <Link className="nave_links" href="/products-men">
              MEN
            </Link>
            <Link className="nave_links" href="/products-women">
              WOMEN
            </Link>
            <Link className="nave_links" href="/products-kids">
              KIDS
            </Link>
            <Link className="nave_links" href="/new-arrivals-men">
              NEW ARRIVALS
            </Link>
          </div>

          {/* Small Screens Drawer */}
          <DrawerSmallScreensComponent
            open={openSmallScreensDrawer}
            setOpen={setOpenSmallScreensDrawer}
          />

          {/* Logo */}
          <Link href={"/"} className=" mx-auto">
            <Image
              src={"/images/logo/allwalks.svg"}
              width={80}
              height={40}
              alt=""
            />
          </Link>

          {/* Right */}
          <div
            id="right"
            className="items-center flex justify-between ml-auto gap-6"
          >
            <div className="hidden lg:flex gap-6">
              <Link className="nave_links" href="/pages/about">
                ABOUT
              </Link>
              <Link className="nave_links" href="/pages/contact">
                CONTACT
              </Link>
            </div>

            {/* NaveBar Icons */}
            <div id="nave-icons" className="flex items-center gap-3 ">
              {/* If No User Show Default Icon */}
              {status === "unauthenticated" ? (
                <button id="user">
                  <Link href="/sign-in">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-5.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                      />
                    </svg>
                  </Link>
                </button>
              ) : status === "loading" ? (
                <Skeleton className="size-5.5 rounded-full" />
              ) : (
                // If There Is User Show His Profile Picture
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Avatar>
                      {!isLoaded && (
                        <Skeleton className="size-5.5 rounded-full" />
                      )}
                      {/* Profile Picture Exists */}
                      {session?.user?.image ? (
                        <Image
                          onLoad={() => setIsLoaded(true)}
                          src={session?.user?.image}
                          alt=""
                          width={28}
                          height={28}
                        />
                      ) : (
                        // Profile Picture Does Not Exist
                        <div
                          id="user_image"
                          className={`bg-[#6457FD] text-white text-xs absolute size-full rounded-full flex items-center justify-center  font-bold`}
                        >
                          <span className="text-[14px]">
                            {session?.user?.name?.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                    </Avatar>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent className="w-48">
                    <DropdownMenuItem
                      className="hover:bg-gray-100 cursor-pointer"
                      onClick={() => signOut()}
                    >
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}

              {/* Search */}
              <DialogComponent open={open} setOpen={setOpen} />

              {/* Favorites */}
              <button id="heart" className="hidden sm:block">
                <Link href="/favorites" className="relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                    />
                  </svg>

                  <div
                    id="cart_quantity"
                    className={`absolute -top-2 -right-2 bg-[#6457FD] text-white text-xs w-[22px] h-[22px] rounded-full flex items-center justify-center ${
                      favoritesQuantity > 0 ? "block" : "hidden"
                    } font-bold`}
                  >
                    {favoritesQuantity}
                  </div>
                </Link>
              </button>

              {/* Drawer (Cart) */}
              <DrawerComponent
                openDrawer={openDrawer}
                setOpenDrawer={setOpenDrawer}
              />
            </div>
          </div>
        </div>

        {/* Search Button That Triggers The Search Dialog On Small Screens*/}
        <div className="mx-[20px] mb-2 mt-4 sm:hidden block">
          <button
            onClick={() => setOpen(true)}
            className="flex gap-2 w-full rounded-full items-center  bg-gray-100 p-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
            <span className="text-gray-500 sm:text-center text-sm">
              Search Youre Product
            </span>
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navebar;

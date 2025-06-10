"use client";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Link from "next/link";
import Image from "next/image";

interface DrawerSmallScreensProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DrawerSmallScreensComponent: React.FC<DrawerSmallScreensProps> = ({
  open,
  setOpen,
}) => {
  const handleCloseDrawer = () => {
    setOpen(false);
  };
  return (
    <Drawer open={open} onOpenChange={setOpen} direction="top">
      <DrawerTrigger className="lg:hidden block w-fit">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-7 mr-auto"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="grid grid-cols-3 items-center">
            <DrawerClose onClick={() => handleCloseDrawer()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-8 hover:rotate-90 transition duration-400 ease-in-out"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </DrawerClose>

            <Link
              onClick={() => handleCloseDrawer()}
              href={"/"}
              className="mx-auto"
            >
              <Image
                src={"/images/logo/allwalks.svg"}
                width={100}
                height={50}
                alt=""
              />
            </Link>
          </DrawerTitle>
        </DrawerHeader>

        <div id="links_container" className="flex mt-5 flex-col gap-4 px-4">
          <Link
            onClick={() => handleCloseDrawer()}
            href={"/products-men"}
            className="flex justify-between"
          >
            <button className="font-bold tracking-wider uppercase text-sm">
              Men
            </button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </Link>

          <hr />

          <Link
            onClick={() => handleCloseDrawer()}
            href={"/products-women"}
            className="flex justify-between"
          >
            <button className="font-bold tracking-wider uppercase text-sm">
              Women
            </button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </Link>
          <hr />
          <Link
            onClick={() => handleCloseDrawer()}
            href={"/products-kids"}
            className="flex justify-between"
          >
            <button className="font-bold tracking-wider uppercase text-sm">
              Kids
            </button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </Link>
          <hr />
          <Link
            onClick={() => handleCloseDrawer()}
            href={"/new-arrivals-men"}
            className="flex justify-between"
          >
            <button className="font-bold tracking-wider uppercase text-sm">
              New Arrivals
            </button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </Link>
          <hr />
          <Link
            onClick={() => handleCloseDrawer()}
            href={"/favorites"}
            className="flex justify-between sm:hidden"
          >
            <button className="font-bold tracking-wider uppercase  text-sm">
              Favorites
            </button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </Link>
          <hr className="sm:hidden block" />
          <Link
            onClick={() => handleCloseDrawer()}
            href={"/pages/contact"}
            className="flex justify-between"
          >
            <button className="font-bold tracking-wider uppercase text-sm">
              contact
            </button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </Link>
          <hr />
          <Link
            onClick={() => handleCloseDrawer()}
            href={"/pages/about"}
            className="flex justify-between"
          >
            <button className="font-bold tracking-wider uppercase text-sm">
              about
            </button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </Link>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerSmallScreensComponent;

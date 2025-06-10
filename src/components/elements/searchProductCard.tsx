import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Skeleton } from "../ui/skeleton";

interface CardItemsProps {
  imageSrc: string;
  model: string;
  price: number;
  link: string;
  gender: string;
  setOpen: (value: boolean) => void;
}

const SearchProductCard: React.FC<CardItemsProps> = ({
  imageSrc,
  model,
  price,
  link,
  gender,
  setOpen,
}) => {
  const [isLoaded, setisLoaded] = useState(false);

  const handleCloseDialog = () => {
    setOpen(false);
  };
  return (
    <div>
      <div id="card_container" className="">
        <Link
          onClick={handleCloseDialog}
          href={link}
          className="grid pb-5 sm:pb-0 lg:grid-cols-[20%_60%_10%] sm:grid-cols-3 grid-cols-1  items-center hover:bg-gray-100 transition duration-300 ease-in-out justify-between w-full"
        >
          <div id="left">
            <div
              id="img_container"
              className="lg:w-[150px]  lg:h-[150px] md:w-[100px]  md:h-[100px] size-32 relative"
            >
              {!isLoaded && <Skeleton className="w-full h-full" />}
              <Image
                onLoad={() => setisLoaded(true)}
                className="object-contain"
                fill
                src={imageSrc}
                alt=""
              />
            </div>
          </div>

          {/* Small Screens */}
          <div
            id="center"
            className="sm:hidden flex  flex-col sm:items-start sm:justify-center items-start justify-start gap-3"
          >
            <h3 className="lg:text-base text-[14px] max-w-full truncate text-nowrap lg:text-wrap font-bold">
              {model}
            </h3>

            <div
              id="right"
              className="w-full flex items-center justify-between"
            >
              <p className="bg-[#DCFCE7] text-[#16A34A] text-xs py-2 px-5 w-fit font-bold rounded-md">
                {gender === "men"
                  ? "For Him"
                  : gender === "women"
                  ? "For Her"
                  : "For Kids"}
              </p>
              <p>${price}</p>
            </div>
          </div>

          {/* Medium And Large Screens */}
          <div
            id="center"
            className="hidden sm:flex  flex-col sm:items-start sm:justify-center items-start justify-start gap-3"
          >
            <h3 className="lg:text-base text-[14px] max-w-full truncate text-nowrap lg:text-wrap font-bold">
              {model}
            </h3>
            <div id="right" className="w-full items-center justify-between">
              <p className="bg-[#DCFCE7] text-[#16A34A] text-xs py-2 px-5 w-fit font-bold rounded-md">
                {gender === "men"
                  ? "For Him"
                  : gender === "women"
                  ? "For Her"
                  : "For Kids"}
              </p>
            </div>
          </div>
          <div id="right" className="ml-auto sm:block hidden">
            <p>${price}</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SearchProductCard;

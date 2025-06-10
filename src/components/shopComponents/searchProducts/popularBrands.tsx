import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { brandsConstant } from "@/components/constants/constants";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";

interface PopularBrandsProps {
  query: string;
  setOpen: (value: boolean) => void;
}

const PopularBrands: React.FC<PopularBrandsProps> = ({ setOpen, query }) => {
  const brands = brandsConstant;
  const [isLoaded, setIsLoaded] = useState(false);

  const handleCloseDialog = () => {
    setOpen(false);
  };

  return (
    <div>
      {query.trim() === "" && (
        <>
          <div className="text-lg hidden sm:block leading-none font-semibold mt-[30px] mb-[20px]">
            Or Browse Our Most Popular Brands
          </div>
          <div
            id="brands_section"
            className="sm:grid hidden lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2  gap-y-5 items-center"
          >
            {brands.map((item) => (
              <div
                id="image_container"
                key={item.name}
                className="mx-auto group h-[150px] w-[150px] overflow-hidden rounded-full border-2 relative"
              >
                {!isLoaded && (
                  <Skeleton className="h-[150px] w-[150px] rounded-full animate-pulse" />
                )}
                <Image
                  onLoad={() => setIsLoaded(true)}
                  src={item.href}
                  fill
                  alt=""
                  className="object-contain rounded-full object-center"
                />

                <div
                  id="overlay"
                  className="w-full h-full transition duration-300 ease-in-out opacity-0 group-hover:opacity-100 absolute bg-black/60 "
                ></div>

                <div
                  id="buttons_container"
                  className="absolute top-1/2 left-1/2 transition duration-300 opacity-0 group-hover:opacity-100 translate-[-50%] flex z-10 flex-col gap-2"
                >
                  <Link
                    onClick={() => handleCloseDialog()}
                    className="w-full"
                    href={`/products-men/${item.link}`}
                  >
                    <Button className="w-full" variant={"outline"}>
                      Men&apos;s
                    </Button>
                  </Link>

                  <Link
                    onClick={() => handleCloseDialog()}
                    className="w-full"
                    href={`/products-women/${item.link}`}
                  >
                    <Button className="w-full" variant={"outline"}>
                      Women&apos;s
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PopularBrands;

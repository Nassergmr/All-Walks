import Image from "next/image";
// import { Button } from "@/components/ui/button";
import ButtonMain from "@/components/elements/buttonMain";

interface HeroItemsProps {
  imageSrc: string;
  heading: string;
  paragraph: string;
}

const HeroItem: React.FC<HeroItemsProps> = ({
  imageSrc,
  heading,
  paragraph,
}) => {
  return (
    <div
      id="hero_item_1"
      className="w-full h-[100dvh] sm:h-[70vh] lg:h-[100vh] relative"
    >
      <Image
        src={imageSrc}
        alt="Hero Banner"
        fill
        className="object-cover object-center"
        priority
      />
      <div id="overlay" className="absolute inset-0  bg-black/20">
        <div
          id="content"
          className="text-center  h-full pt-[182px] pb-5 sm:pt-[114px] flex sm:items-center sm:justify-center justify-between flex-col"
        >
          <h1 className="sm:text-[100px]/[96px] px-3 max-w-2xl text-6xl text-white font-light font-serif">
            {heading}
          </h1>
          <p className=" text-white sm:my-12 my-10  px-3">{paragraph}</p>

          <div
            id="buttons_container"
            className="flex gap-5 justify-center sm:mt-0 mt-auto"
          >
            <ButtonMain label="Shop Men" href="/products-men" />
            <ButtonMain label="Shop Women" href="products-women" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroItem;

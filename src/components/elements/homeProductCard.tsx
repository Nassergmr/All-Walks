import Image from "next/image";
import ButtonMain2 from "./buttonMain2";

interface cardItemsProps {
  imageSrc: string;
  title: string;
  showManButton?: boolean;
  showKidsButton?: boolean;
  showBoth?: boolean;
  showWomenButton?: boolean;
}
const HomeProductCard: React.FC<cardItemsProps> = ({
  imageSrc,
  title,
  showManButton,
  showKidsButton,
  showBoth,
  showWomenButton,
}) => {
  return (
    <div
      id="product_card"
      className="relative rounded-3xl  hover:rounded-[50%] transition-all ease-in-out overflow-hidden duration-500 sm:h-[70vh] h-[50vh] lg:h-[65vh] lg:w-full sm:mx-1 lg:mx-auto mx-[5px] group bg-black/20 "
    >
      <Image
        src={imageSrc}
        fill
        alt=""
        className="object-cover group-hover:rounded-[50%] transition-all duration-500 rounded-3xl ease-in-out"
      />
      <div id="overlay" className="absolute inset-0  bg-black/30">
        <div
          id="content"
          className={`${title === "New Arrivals" ? "top-[calc(50%+12px)] translate-y-[calc(-50%+12px)]" : "top-1/2 -translate-y-1/2"} absolute  left-1/2 -translate-x-1/2 text-white flex flex-col gap-3 items-center`}
        >
          <h2 className=" text-sm font-medium transition-all ease-in-out duration-500 group-hover:border-transparent rounded-full border border-none sm:border-white px-4.5 py-1.5">
            {title}
          </h2>
          <div
            id="buttons_container"
            className=" lg:group-hover:opacity-100 transition-all duration-500 flex-col flex gap-3 ease-in-out  z-100 mb-0 group-hover:mb-5 justify-center lg:opacity-0 "
          >
            {showBoth && (
              <>
                <ButtonMain2 label="Shop Men" href="/products-men" />
                <ButtonMain2 label="Shop Women" href="/products-women" />
              </>
            )}
            {showManButton && (
              <ButtonMain2 label="Shop Men" href="/products-men" />
            )}
            {showWomenButton && (
              <ButtonMain2 label="Shop Women" href="/products-women" />
            )}
            {showKidsButton && (
              <ButtonMain2 label="Shop Kids" href="/products-kids" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomeProductCard;

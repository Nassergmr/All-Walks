import Image from "next/image";
import ButtonMain from "./buttonMain";

interface cardItemsProps {
  imageSrc: string;
  title: string;
  paragraph: string;
}
const HomeProductCard: React.FC<cardItemsProps> = ({
  imageSrc,

  title,
  paragraph,
}) => {
  return (
    <div
      id="product_card"
      className="relative overflow-hidden sm:h-[70vh] h-[60vh] lg:h-[90vh] lg:w-full sm:mx-1 lg:mx-auto  group bg-black/20 "
    >
      <Image
        src={imageSrc}
        fill
        alt=""
        className="object-cover lg:group-hover:scale-110 transition-transform duration-500 ease-in-out "
      />
      <div id="overlay" className="absolute inset-0  bg-black/20">
        <div
          id="content"
          className="flex pt-7 lg:pt-20 h-full text-white flex-col items-center gap-3"
        >
          <h2 className="md:text-2xl sm:text-4xl text-2xl font-bold">
            {title}
          </h2>
          <p>{paragraph}</p>

          <div
            id="buttons_container"
            className="flex lg:group-hover:opacity-100 transition-opactity duration-500 ease-in-out  z-100 sm:mb-5 mb-7 gap-3 mt-auto justify-center lg:opacity-0"
          >
            <ButtonMain label="Shop Men" href="/products-men" />
            <ButtonMain label="Shop Women" href="/products-women" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomeProductCard;

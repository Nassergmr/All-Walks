import Image from "next/image";
import { Product } from "@/types/types";

interface CardItemsProps {
  e: Product;
  imageSrc: string;
  model: string;
  price: number;
  link: string;
  gender: string;
  id: string;
}

const MainProductCard2: React.FC<CardItemsProps> = ({
  imageSrc,
  model,
  price,
}) => {
  return (
    <div
      id="product_card"
      className={`relative group  xl:w-[550px]  xl:h-[500px] lg:w-[500px] sm:w-[400px] sm:h-[300px] size-[250px] lg:h-[300px] flex flex-col  bg-transparent mx-auto`}
    >
      <div id="img_container" className="relative w-full h-full bg-none">
        <Image src={imageSrc} className={`object-contain`} fill alt="" />
      </div>
      <div
        id="content"
        className={`  flex flex-col items-center  transition-all duration-500 pt-5`}
      >
        <div id="model_price" className="flex flex-col items-center gap-3">
          <p className={`text-md text-2xl truncate max-w-[400px] lg:w-full`}>
            {model}
          </p>
          <p className="text-sm">${price}</p>
        </div>
      </div>
    </div>
  );
};

export default MainProductCard2;

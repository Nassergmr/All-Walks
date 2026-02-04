import ButtonMain from "@/components/elements/buttonMain";
import Image from "next/image";

export default function Hero_2() {
  return (
    <div className=" sm:mb-[4rem] sm:mt-[6rem] my-[2rem] sm:px-[20px] px-0 grid md:grid-cols-2 grid-cols-1 gap-2 gap-y-5 justify-between">
      <div id="left" className="sm:h-[90vh] h-[70vh]">
        <div
          id="product_card"
          className="relative mx-auto h-full  rounded-xl flex overflow-hidden group"
        >
          <div id="img_container" className="">
            <Image
              src="/images/hero_images/pexels-dennis_icap-2942249-11058029.jpg"
              fill
              alt=""
              className={`object-cover rounded-xl
              `}
            />
          </div>

          <div id="overlay" className="absolute inset-0  bg-black/30">
            <div
              id="content"
              className="flex text-center md:text-left h-full mx-auto  sm:mx-3 lg:mx-9 text-white justify-end gap-3  flex-col"
            >
              <h2 className="text-3xl font-bold">
                Nike Street-Ready Cushioning
              </h2>
              <p className="mb-[180px] sm:px-0 px-3">
                Track-tested materials and desert-inspired hues come together
                for all-day, any-surface performance.
              </p>
            </div>
          </div>
          <div
            id="buttons_container"
            className="flex z-10 mb-[90px] mx-auto md:mx-3   lg:mx-9 gap-3 mt-auto justify-center "
          >
            <ButtonMain label="SHOP MEN" href="/products-men/Nike" />
            <ButtonMain label="SHOP WOMEN" href="/products-women/Nike" />
          </div>
        </div>
      </div>

      <div id="right" className="sm:h-[90vh] h-[70vh]">
        <div
          id="product_card"
          className="relative mx-auto h-full rounded-xl flex overflow-hidden group"
        >
          <div id="img_container" className="">
            <Image
              src="/images/hero_images/midjourneyjordanex_2048x2048 (1).jpg"
              fill
              alt=""
              className={`object-cover rounded-xl
               
               `}
            />
          </div>

          <div id="overlay" className="absolute inset-0  bg-black/30">
            <div
              id="content"
              className="flex text-center md:text-left h-full mx-auto  sm:mx-3 lg:mx-9 text-white justify-end gap-3  flex-col"
            >
              <h2 className="text-3xl font-bold">Jordan Court-Ready Swagger</h2>
              <p className="mb-[180px] sm:px-0 px-3">
                Performance-engineered designs and iconic style unite for
                all-day comfort, whether on the court or the street.
              </p>
            </div>
          </div>
          <div
            id="buttons_container"
            className="flex z-10 mb-[90px] mx-auto md:mx-3   lg:mx-9 gap-3 mt-auto justify-center "
          >
            <ButtonMain label="SHOP MEN" href="/products-men/Jordan" />
            <ButtonMain label="SHOP WOMEN" href="/products-women/Jordan" />
          </div>
        </div>
      </div>
    </div>
  );
}

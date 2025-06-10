import Image from "next/image";

const Section2: React.FC = () => {
  return (
    <div className="  sm:my-[4rem] my-[2rem] relative w-full h-[400px]">
      <Image
        src="/images/banners/24Q3_AugustCore_Statement_Module_Site_Desktop_IMG_2880x720-min.png"
        fill
        alt=""
        className="object-cover"
      />
      <div
        id="content"
        className="absolute inset-0 w-full justify-center gap-8 items-center flex flex-col"
      >
        <h1 className="text-white text-2xl text-center uppercase ">
          Designed By Nature, Perfected By Us
        </h1>
        <p className="text-white md:w-[50%] w-[90%] text-center text-md">
          From earth-friendly materials to biomechanically inspired designs, we
          create shoes that nurture your feet while nurturing the planet.
        </p>
        <Image
          src={"/images/logo/allwalks_white.svg"}
          width={120}
          height={50}
          alt=""
        />
        <p className="uppercase text-white text-xs font-bold tracking-wider mt-[-28px]">
          By nature
        </p>
      </div>
    </div>
  );
};

export default Section2;

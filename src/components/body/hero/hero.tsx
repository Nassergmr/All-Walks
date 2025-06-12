"use client";

import HeroItem from "./heroItem";
import Slider from "react-slick";

const Hero: React.FC = () => {
  const settings = {
    infinite: true,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    speed: 1000,
    cssEase: "ease-in-out",
    arrows: false,
    pauseOnHover: false,
  };
  return (
    <div
      id="hero"
      className="w-full slider-container h-[100dvh] sm:h-[70vh] lg:h-[100vh]"
    >
      <Slider {...settings}>
        <HeroItem
          imageSrcSm="/images/banners_small_screen/pexels-bemistermister-3490360.jpg"
          imageSrc="/images/banners/pexels-pluyar-786003.jpg"
          heading="Slip Into Simplicity"
          paragraph="The extra-durable Utility Collection is up for everything."
        />
        <HeroItem
          imageSrcSm="/images/banners_small_screen/pexels-chuck-3261069.jpg"
          imageSrc="/images/banners/pexels-alican-helik-362148343-17849532-min.jpg"
          heading="Style That Moves With You"
          paragraph="Engineered for performance. Designed for every day."
        />
        <HeroItem
          imageSrcSm="/images/banners_small_screen/pexels-kowalievska-1040427.jpg"
          imageSrc="/images/banners/pexels-photosbycollis-3185424.jpg"
          heading="Less Noise, More Sole"
          paragraph="Minimalist design meets maximum versatility.."
        />
        <HeroItem
          imageSrcSm="/images/banners_small_screen/pexels-craytive-1476209.jpg"
          imageSrc="/images/banners/pexels-mart-production-8121750.jpg"
          heading="Reimagine Your Walk"
          paragraph="Crafted with purpose. Styled for wherever you go."
        />
      </Slider>
    </div>
  );
};

export default Hero;

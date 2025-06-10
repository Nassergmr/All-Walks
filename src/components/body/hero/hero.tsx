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
          imageSrc="/images/banners/pexels-pluyar-786003.jpg"
          heading="Slip Into Simplicity"
          paragraph="The extra-durable Utility Collection is up for everything."
        />
        <HeroItem
          imageSrc="/images/banners/pexels-alican-helik-362148343-17849532-min.jpg"
          heading="Style That Moves With You"
          paragraph="Engineered for performance. Designed for every day."
        />
        <HeroItem
          imageSrc="/images/banners/pexels-photosbycollis-3185424.jpg"
          heading="Less Noise, More Sole"
          paragraph="Minimalist design meets maximum versatility.."
        />
        <HeroItem
          imageSrc="/images/banners/pexels-mart-production-8121750.jpg"
          heading="Reimagine Your Walk"
          paragraph="Crafted with purpose. Styled for wherever you go."
        />
      </Slider>
    </div>
  );
};

export default Hero;

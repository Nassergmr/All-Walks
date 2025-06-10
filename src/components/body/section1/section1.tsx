"use client";

import HomeProductCard from "@/components/elements/homeProductCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Section1: React.FC = () => {
  const settings = {
    infinite: true,
    // fade: true,
    // slidesToShow: 1,
    // slidesToScroll: 1,

    speed: 500,
    cssEase: "ease-in-out",
    arrows: false,
    pauseOnHover: false,
    initialSlide: 0,
    centerMode: false,
    className: "center",

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          autoplay: true,
          autoplaySpeed: 3000,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          centerPadding: "50px",
          centerMode: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
          autoplay: true,
          autoplaySpeed: 2000,
        },
      },
    ],
  };

  return (
    <div className="sm:px-[20px] px-0 sm:my-[4rem] my-[2rem]">
      {/* Large Screens */}
      <div className="gap-2 lg:grid hidden grid-cols-3">
        <HomeProductCard
          imageSrc="/images/home-images/25Q1_HB_A11475_W_OnBody_KneeDown_01789-min-min.png"
          title="New Arrivals
"
          paragraph="Fresh styles, just dropped."
        />

        <HomeProductCard
          imageSrc="/images/home-images/24Q4_A10961_A11094_A11161_TreeRunnerGo_WoolDasher2Mizzle_ColorFlow1_04405-min-min.png"
          title="Lightweight Comfort"
          paragraph="Feels like walking on air."
        />
        <HomeProductCard
          imageSrc="/images/home-images/pexels-jose-martin-segura-benites-1422456152-27100548-min.jpg"
          title="Everyday Classics"
          paragraph="Go-to comfort. Timeless style."
        />
      </div>

      {/* Medium & Small Screens */}
      <div className="w-full lg:hidden block h-[60vh] sm:h-[70vh]">
        <Slider {...settings}>
          <HomeProductCard
            imageSrc="/images/home-images/25Q1_HB_A11475_W_OnBody_KneeDown_01789-min-min.png"
            title="New Arrivals"
            paragraph="Fresh styles, just dropped."
          />

          <HomeProductCard
            imageSrc="/images/home-images/24Q4_A10961_A11094_A11161_TreeRunnerGo_WoolDasher2Mizzle_ColorFlow1_04405-min-min.png"
            title="Lightweight Comfort"
            paragraph="Feels like walking on air."
          />
          <HomeProductCard
            imageSrc="/images/home-images/pexels-jose-martin-segura-benites-1422456152-27100548-min.jpg"
            title="Everyday Classics"
            paragraph="Go-to comfort. Timeless style."
          />
        </Slider>
      </div>
    </div>
  );
};

export default Section1;

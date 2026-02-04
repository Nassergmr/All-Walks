"use client";

import HomeProductCard from "@/components/elements/homeProductCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Section1: React.FC = () => {
  const settings = {
    infinite: true,
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
          autoplay: true,
          autoplaySpeed: 2000,
          centerMode: true,
          className: "center",
          centerPadding: "30px",
        },
      },
    ],
  };

  return (
    <div className="sm:px-[20px] px-0 sm:my-[4rem] my-[2rem]">
      {/* Large Screens */}
      <div className="gap-2 lg:grid hidden grid-cols-4 uppercase">
        <HomeProductCard
          imageSrc="/images/banners_small_screen/pexels-kowalievska-1040427.jpg"
          title="New Arrivals"
          showBoth={true}
        />

        <HomeProductCard
          imageSrc="/images/banners_small_screen/pexels-ralph-rabago-3214701.jpg"
          title="MENS"
          showManButton={true}
          showBoth={false}
        />
        <HomeProductCard
          imageSrc="/images/banners_small_screen/pexels-madsdonald-1615748.jpg"
          title="WOMENS"
          showWomenButton={true}
          showBoth={false}
        />

        <HomeProductCard
          imageSrc="/images/banners_small_screen/pexels-cottonbro-7207554.jpg"
          title="KIDS"
          showKidsButton={true}
          showBoth={false}
        />
      </div>

      {/* Medium & Small Screens */}
      <div className="w-full lg:hidden block h-[50vh] sm:h-[70vh]">
        <Slider {...settings}>
          <HomeProductCard
            imageSrc="/images/banners_small_screen/pexels-kowalievska-1040427.jpg"
            title="New Arrivals"
            showBoth={true}
          />

          <HomeProductCard
            imageSrc="/images/banners_small_screen/pexels-ralph-rabago-3214701.jpg"
            title="MENS"
            showManButton={true}
            showBoth={false}
          />
          <HomeProductCard
            imageSrc="/images/banners_small_screen/pexels-madsdonald-1615748.jpg"
            title="WOMENS"
            showWomenButton={true}
            showBoth={false}
          />
          <HomeProductCard
            imageSrc="/images/banners_small_screen/pexels-cottonbro-7207554.jpg"
            title="KIDS"
            showKidsButton={true}
            showBoth={false}
          />
        </Slider>
      </div>
    </div>
  );
};

export default Section1;

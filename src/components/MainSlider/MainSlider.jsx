import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import mainSlider from "../../assets/images/slider-image-3.jpeg";
import fixedImg from "../../assets/images/slider-image-2.jpeg";
import secondSlider from "../../assets/images/grocery-banner-2.jpeg";
import thirdSlider from "../../assets/images/grocery-banner.png";

export default function MainSlider() {
  let settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
  };

  return (
    <>
      <div className="row dark:bg-gray-900">
        <div className="w-full md:w-3/4 px-1">
          <Slider className="overflow-y-hidden" {...settings}>
            <img className="w-full h-[400px] dark:brightness-90" src={mainSlider} />
            <img className="w-full h-[400px] dark:brightness-90" src={secondSlider} />
            <img className="w-full h-[400px] dark:brightness-90" src={thirdSlider} />
          </Slider>
        </div>
        <div className="w-1/2 md:w-1/4">
          <div className="flex flex-row md:flex-col">
            <img src={thirdSlider} className="w-full h-[200px] dark:brightness-90" />
            <img src={fixedImg} className="w-full h-[200px] dark:brightness-90" />
          </div>
        </div>
      </div>
    </>
  );
}

import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Slider.css';

import slider1 from './sliderimages/slider1.png';
// import slider2 from './slider2.png';
// import slider3 from './slider3.png';
import slider4 from './sliderimages/slider4.png';
import slider5 from './sliderimages/slider5.jpg';
import slider6 from './sliderimages/slider6.png';
import slider7 from './sliderimages/slider7.png';
import firstimg from './sliderimages/first.png';
import secondimg from './sliderimages/second.png';
import thirdimg from './sliderimages/third.png';

function SliderSection() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000, // Slightly slower autoplay speed for better visibility
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 969,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          arrows: false,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          arrows: false,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          arrows: false,
        },
      },
    ],
  };

  return (
    <>
      <Slider {...settings}>
        <div className="slidersec">
          <img src={firstimg} alt="First Slide" />
        </div>

        <div className="slidersec">
          <img src={thirdimg} alt="Third Slide" />
        </div>
        <div className="slidersec">
          <img src={secondimg} alt="Second Slide" />
        </div>

        <div className="slidersec">
          <img src={slider6} alt="Slider Six" />
        </div>

        <div className="slidersec">
          <img src={slider7} alt="Slider Seven" />
        </div>
        <div className="slidersec">
          <img src={slider4} alt="Slider Four" />
        </div>
      </Slider>
    </>
  );
}

export default SliderSection;

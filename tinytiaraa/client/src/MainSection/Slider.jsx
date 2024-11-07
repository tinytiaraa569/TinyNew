import React from 'react';
import Slider from 'react-slick';
import { useQuery } from 'react-query';
import axios from 'axios';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Slider.css';
import { useNavigate } from 'react-router-dom';
import { imgdburl, server } from '@/server';

const SliderSection = () => {
  const navigate = useNavigate();
  
  // Fetch banners using React Query
  const { data: banners, isLoading } = useQuery(
    'banners',
    async () => {
      const response = await axios.get(`${server}/get-allbanners`);
      if (response.data.success) {
        return response.data.banners.sort((a, b) => a.order - b.order);
      }
      throw new Error('Failed to fetch banners');
    }
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 8000,
    swipeToSlide: true,
    responsive: [
      { breakpoint: 969, settings: { slidesToShow: 1, slidesToScroll: 1 } },
      { breakpoint: 769, settings: { slidesToShow: 1, slidesToScroll: 1 } },
      { breakpoint: 500, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <Slider {...settings}>
      {/* Default slide shown while loading or if banners array is empty */}
      {/* {(isLoading || !banners?.length) && (
        <div className="slidersec cursor-pointer">
          <img
            src="https://backend.tinytiaraa.com:8000/uploads/images/slidersbanner/upglf2ndz3cgbfhnsgbk.webp"
            alt="Default Slide"
          />
        </div>
      )} */}

      {/* Map over banners once loaded */}
      {banners?.map((banner) => (
        <div key={banner._id} className="slidersec cursor-pointer">
          <img
            loading="lazy"
            src={`${imgdburl}${banner.images[0].url}`}
            alt={banner.title}
            // onClick={() => banner.link && navigate(`/${banner.link}`)}
          />
        </div>
      ))}
    </Slider>
  );
};

export default SliderSection;

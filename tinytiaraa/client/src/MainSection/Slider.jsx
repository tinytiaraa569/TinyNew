import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Slider.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { imgdburl, server } from '@/server';

const SliderSection = () => {
  const [banners, setBanners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch banners on component mount
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await axios.get(`${server}/get-allbanners`);
        if (response.data.success) {
          const sortedBanners = response.data.banners.sort((a, b) => a.order - b.order);
          setBanners(sortedBanners);
        }
      } catch (error) {
        console.error('Error fetching banners:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBanners();
  }, []);

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
    <Slider {...settings}>
      {isLoading ? (
        // Default slide during loading
        <div className="slidersec cursor-pointer">
          <img
            src="https://backend.tinytiaraa.com:8000/uploads/images/slidersbanner/upglf2ndz3cgbfhnsgbk.webp"
            alt="Default Slide"
          />
        </div>
      ) : (
        banners.map((banner) => (
          <div key={banner._id} className="slidersec cursor-pointer">
            <img
              loading="lazy"
              src={`${imgdburl}${banner.images[0].url}`}
              alt={banner.title}
              // onClick={() => banner.link && navigate(`/${banner.link}`)}
            />
          </div>
        ))
      )}
    </Slider>
  );
};

export default SliderSection;
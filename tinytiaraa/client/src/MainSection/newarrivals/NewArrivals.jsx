import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import styles from '../../Styles/styles';
import ProductCard from '../Productcard/ProductCard';
import './newarrivals.css';

function NewArrivals() {
  const { products } = useSelector((state) => state.products);
  const [visibleCount, setVisibleCount] = useState(10); // Default to 10 for larger screens
  const loaderRef = useRef(null); // Ref to trigger lazy loading

  const updateVisibleCount = () => {
    const screenWidth = window.innerWidth;

    if (screenWidth <= 768) {
      setVisibleCount(6); // Show 6 products on smaller screens (mobile/tablet)
    } else {
      setVisibleCount(10); // Show 10 products on larger screens (desktop)
    }
  };

  const handleViewMore = () => {
    // Save the current scroll position
    const scrollPosition = window.scrollY;
    
    // Load 10 more products
    setVisibleCount((prevCount) => prevCount + 10);

    // Restore the scroll position after the DOM is updated
    window.requestAnimationFrame(() => {
      window.scrollTo(0, scrollPosition);
    });
  };

  useEffect(() => {
    if (Array.isArray(products)) {
      updateVisibleCount(); // Set visibleCount based on screen size initially
    }

    // Listen for window resize events to update the product count
    window.addEventListener('resize', updateVisibleCount);

    // Cleanup event listener
    return () => {
      window.removeEventListener('resize', updateVisibleCount);
    };
  }, [products]);

  // Lazy load more products when the user scrolls near the bottom
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          handleViewMore(); // Load more products when the user scrolls near the bottom
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [loaderRef.current]);

  return (
    <div className='bg-[#fff] py-5'>
      <div className={`customheadingnewarrivals ${styles.section}`}>
        <div className={`${styles.heading} customheadingnewarrivalsheading`}>
          <h1 className='text-[#01463A] text-[30px] font-[400] text-center'>Featured product</h1>
          <p className='text-[#3A3A3A] text-[20px] text-center font-[300]'>Shop by our top-selling categories, bought frequently by most customers</p>
        </div>
        <div className="grid custom-grid gap-[20px]">
          {
            products && Array.isArray(products) && products.slice(0, visibleCount).map((i, index) => (
              <ProductCard data={i} key={index} />
            ))
          }
        </div>
      </div>

      {
        Array.isArray(products) && visibleCount < products.length && (
          <div className="text-center mt-[15px]">
            <button 
              className='productviewmore text-[17px] font-[600] font-Poppins cursor-pointer'
              onClick={handleViewMore}
            >
              View More
            </button>
          </div>
        )
      }

      {/* Lazy load trigger */}
      {
        Array.isArray(products) && visibleCount < products.length && (
          <div ref={loaderRef} className="lazy-load-trigger" style={{ height: '20px', marginBottom: '20px' }} />
        )
      }
    </div>
  );
}

export default NewArrivals;

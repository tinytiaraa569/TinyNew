import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from '../../Styles/styles';
import ProductCard from '../Productcard/ProductCard';

function NewArrivals() {
  const { products } = useSelector((state) => state.products);
  const [visibleCount, setVisibleCount] = useState(10); // Start with 10 products

  const handleViewMore = () => {
    // Preserve the scroll position
    const scrollPosition = window.scrollY;

    // Increase the visible count to show more products
    setVisibleCount((prevCount) => prevCount + 10);

    // Restore the scroll position after the update
    window.requestAnimationFrame(() => {
      window.scrollTo(0, scrollPosition);
    });
  };

  useEffect(() => {
    if (Array.isArray(products)) {
      setVisibleCount(10); // Reset to show only the first 10 products initially
    }
  }, [products]);

  return (
    <div className='bg-[#fff] py-5'>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1 className='text-[#01463A] text-[35px] font-[400] text-center'>Featured product</h1>
          <p className='text-[#3A3A3A] text-[22px] text-center font-[300]'>Shop by our top-selling categories, bought frequently by most customers</p>
        </div>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
          {
            products && Array.isArray(products) && products.slice(0, visibleCount).map((i, index) => (
              <ProductCard data={i} key={index} />
            ))
          }
        </div>
      </div>
      {
        Array.isArray(products) && visibleCount < products.length && (
          <div className="text-center">
            <h4
              className='text-[17px] font-[600] font-Poppins cursor-pointer'
              onClick={handleViewMore}
            >
              View More
            </h4>
          </div>
        )
      }
    </div>
  );
}

export default NewArrivals;

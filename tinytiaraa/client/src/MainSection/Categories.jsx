// import React from 'react'
// import './Slider.css'
// import { categoriesData } from '@/static/data'
// import { useNavigate } from 'react-router-dom';

// function Categories() {

//     const navigate = useNavigate();

//     const handleViewProducts = (categoryTitle) => {
//         // Navigate to the products page with the category as a query parameter
//         navigate(`/products?category=${categoryTitle}`);
//         window.scrollTo({ top: 0, behavior: "smooth" }); 
//       };
//     return (
//         <div className='Categories pb-5'  >
//             <h1 className='Categoriesexplore text-[30px] font-[450]'>Explore By Category</h1>

//             <div className="categoriessection">
//                 {categoriesData.slice(0, 8).map((category) => (
//                     <div className="categoriescard" key={category.id} onClick={() => handleViewProducts(category.title)}>
//                         <div className="categoriesimg">
//                             <img loading='lazy' src={category.bannerimg} alt={category.title} />
//                             <div className="categoriestext">
//                                 <div className='adjust'>
//                                     <h3>{category.title}</h3>
//                                     <button>view products</button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 ))}





//                 {/* <div className="categoriescard">
//         <div className="categoriesimg">
//             <img src="https://www.tanishq.co.in/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dwc7d4e224/images/hi-res/50D2FFFQRAA02_1.jpg" alt="" />
//             <div className="categoriestext">
//                 <div className='adjust'>

//                 <h3>Gold & Diamond Rings</h3>
//                 <button>view products</button>
//                 </div>

//             </div>
//         </div>

//         </div>
//         <div className="categoriescard">
//         <div className="categoriesimg">
//             <img src="https://www.tanishq.co.in/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw25ff2a18/images/hi-res/50D3B2BUCAA02_1.jpg" alt="" />
//             <div className="categoriestext">
//                 <div className='adjust'>

//                 <h3>Diamond Bracelets</h3>
//                 <button>view products</button>
//                 </div>

//             </div>
//         </div>

//         </div>
//         <div className="categoriescard">
//         <div className="categoriesimg">
//             <img src="https://www.tanishq.co.in/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw278a7c39/images/hi-res/50D1D2SJZAGA09_1.jpg" alt="" />
//             <div className="categoriestext">
//                 <div className='adjust'>

//                 <h3>Gold & Diamond Earrings</h3>
//                 <button>view products</button>
//                 </div>

//             </div>
//         </div>

//         </div>
//         <div className="categoriescard">
//         <div className="categoriesimg">
//             <img src="https://www.tanishq.co.in/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw65fd7088/images/hi-res/50D1D1VEM1S02_1.jpg" alt="" />
//             <div className="categoriestext">
//                 <div className='adjust'>

//                 <h3>Diamond Bangles</h3>
//                 <button>view products</button>
//                 </div>

//             </div>
//         </div>

//         </div>
//         <div className="categoriescard">
//         <div className="categoriesimg">
//             <img src="https://www.tanishq.co.in/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw76c4dc41/images/hi-res/50D3I1PSDAAA02_1.jpg" alt="" />
//             <div className="categoriestext">
//                 <div className='adjust'>

//                 <h3>Diamond Pendants</h3>
//                 <button>view products</button>
//                 </div>

//             </div>
//         </div>

//         </div>
        
//         <div className="categoriescard">
//         <div className="categoriesimg">
//             <img src="https://www.tanishq.co.in/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw6b1a1df1/images/hi-res/51C2ECXAAAAA00.jpg" alt="" />
//             <div className="categoriestext">
//                 <div className='adjust'>

//                 <h3>Gold Coin</h3>
//                 <button>view products</button>
//                 </div>

//             </div>
//         </div>

//         </div>
//         <div className="categoriescard">
//         <div className="categoriesimg">
//             <img src="https://www.onlinepng.com/media/catalog/product/cache/571072fdb4ae023a8c393de549460086/g/a/ganpati-coin_1_1.jpg" alt="" />
//             <div className="categoriestext">
//                 <div className='adjust'>

//                 <h3>Silver Coin</h3>
//                 <button>view products</button>
//                 </div>

//             </div>
//         </div>

//         </div>
       
//         <div className="categoriescard">
//         <div className="categoriesimg">
//             <img src="https://www.tanishq.co.in/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw23b41aef/images/hi-res/50F1KPBCTAA32_1.jpg" alt="" />
//             <div className="categoriestext">
//                 <div className='adjust'>

//                 <h3>Black Beed Bracelets</h3>
//                 <button>view products</button>
//                 </div>

//             </div>
//         </div>

//         </div> */}
//             </div>
//         </div>
//     )
// }

// export default Categories

import React, { useEffect, useState } from 'react';
import './Slider.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { server, imgdburl } from '@/server';

function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${server}/get-allcategories`);
        setCategories(response.data.categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
        alert('Failed to fetch categories');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleViewProducts = (categoryTitle) => {
    navigate(`/products?category=${categoryTitle}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="Categories pb-5">
      <h1 className="Categoriesexplore text-[30px] font-[450]">Explore By Category</h1>

      <div className="categoriessection">
        {loading ? (
          // Render skeletons with a greyish color and loading effect
          Array(8).fill(0).map((_, index) => (
            <div className="categoriescard" key={index}>
              <div className="categoriesimg">
                <Skeleton
                  height={150}
                  width="100%"
                  baseColor="#e0e0e0" // Greyish base color
                  highlightColor="#f0f0f0" // Slightly lighter highlight color for loading effect
                />
              </div>
              <div className="categoriestext">
                <div className="adjust">
                  <Skeleton
                    height={20}
                    width="70%"
                    baseColor="#e0e0e0"
                    highlightColor="#f0f0f0"
                  />
                  <Skeleton
                    height={15}
                    width="50%"
                    baseColor="#e0e0e0"
                    highlightColor="#f0f0f0"
                    style={{ marginTop: 8 }}
                  />
                </div>
              </div>
            </div>
          ))
        ) : categories.length > 0 ? (
          categories.slice(0, 8).map((category) => (
            <div
              className="categoriescard"
              key={category.id}
              onClick={() => handleViewProducts(category.title)}
            >
              <div className="categoriesimg">
                <img loading="lazy" src={`${imgdburl}${category?.bannerimg?.url}`} alt={category.title} />
                <div className="categoriestext">
                  <div className="adjust">
                    <h3>{category.title}</h3>
                    <button>View Products</button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No categories available</p>
        )}
      </div>
    </div>
  );
}

export default Categories;


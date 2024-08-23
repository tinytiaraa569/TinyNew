import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ProductCard from "../MainSection/Productcard/ProductCard";
import './productpage.css'
import { RiCloseFill } from "react-icons/ri"; // Import the cross icon
import { IoSearchOutline } from "react-icons/io5";
import { categoriesData } from "@/static/data";
import bannerimg from './banner.jpg'
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 60000]);
  const [sortOption, setSortOption] = useState("");
  const [selectedMetalColor, setSelectedMetalColor] = useState("");
  const { products } = useSelector((state) => state.products);
  const [selectedEnamelColor, setSelectedEnamelColor] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [selectedAgeGroup, setSelectedAgeGroup] = useState("");

  const [isFilterVisible, setIsFilterVisible] = useState(true);


  console.log(products, "products")

  const categoryData = searchParams.get("category");

  // Handle loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const toggleFilterVisibility = () => {
    setIsFilterVisible(prev => !prev);
  };

  useEffect(() => {
    // Extract price range from query params
    const minPrice = parseInt(searchParams.get("priceMin"), 10);
    const maxPrice = parseInt(searchParams.get("priceMax"), 10);

    // Set the priceRange state based on query parameters or leave it empty
    if (!isNaN(minPrice) && !isNaN(maxPrice)) {
      setPriceRange([minPrice, maxPrice]);
    } else {
      setPriceRange([]); // No price range filtering
    }

    if (products) {
      setLoading(false);
      filterProducts();
    } else {
      setLoading(true);
    }
  }, [searchParams, products, selectedEnamelColor]); // Include only searchParams and products as dependencies

  useEffect(() => {
    const ageGroupParam = searchParams.get("ageGroup");
    if (ageGroupParam) {
      setSelectedAgeGroup(ageGroupParam);
    }
  }, [searchParams]);
  useEffect(() => {
    filterProducts();
  }, [priceRange, selectedAgeGroup])

  console.log("slected", selectedAgeGroup)
  const filterProducts = () => {
    try {
      if (!products || !Array.isArray(products)) {
        throw new Error("Products data is not available.");
      }

      let filteredProducts = [...products];

      // Filter by category
      if (categoryData) {
        filteredProducts = filteredProducts.filter(
          (product) => product.category === categoryData
        );
      }

      // Filter by search query
      if (searchQuery) {
        filteredProducts = filteredProducts.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      // Filter by price range only if priceRange is set
      if (priceRange.length === 2) {

        filteredProducts = filteredProducts.filter(
          (product) =>
            product.discountPrice >= priceRange[0] &&
            product.discountPrice <= priceRange[1]
        );
      }


      // Filter by metal color
      if (selectedMetalColor) {
        filteredProducts = filteredProducts.filter((product) =>
          Object.keys(product.MetalColor).includes(selectedMetalColor)
        );
      }

      //filter enamel color
      if (selectedEnamelColor === "Pink") {
        console.log(`${selectedEnamelColor} selected color`);
        const normalizedSelectedColor = selectedEnamelColor.toLowerCase(); // Convert the selected color to lowercase
        const requiredMetalColors = ['YellowGoldclr', 'RoseGoldclr', 'WhiteGoldclr'];
        filteredProducts = filteredProducts.filter((product) => {
          console.log("Checking product:", product); // Log the product being checked

          // Check if all required metal colors have the selected enamel color
          const hasAllColors = requiredMetalColors.every((metalColor) => {
            // Construct the dynamic key for the enamel color
            const key = `${normalizedSelectedColor}${metalColor}`;
            console.log(`Checking key: ${key} in enamelColors:`, product.enamelColors?.Pink);

            // Check if the product has enamel colors for this key
            const hasColor = product.enamelColors?.Pink?.pinkYellowGoldclr?.length > 0 || product.enamelColors?.Pink?.pinkRoseGoldclr?.length > 0 || product.enamelColors?.Pink?.pinkWhiteGoldclr?.length > 0;
            console.log(`Product has ${key}:`, hasColor);

            return hasColor;
          });

          console.log(`Product ${product.name} has all colors:`, hasAllColors);
          return hasAllColors;
        });
        console.log("Filtered by enamel color:", filteredProducts);
      } else if (selectedEnamelColor === "Black") {
        console.log(`${selectedEnamelColor} selected color`);
        const normalizedSelectedColor = selectedEnamelColor.toLowerCase(); // Convert the selected color to lowercase
        const requiredMetalColors = ['YellowGoldclr', 'RoseGoldclr', 'WhiteGoldclr'];
        filteredProducts = filteredProducts.filter((product) => {
          console.log("Checking product:", product); // Log the product being checked

          // Check if all required metal colors have the selected enamel color
          const hasAllColors = requiredMetalColors.every((metalColor) => {
            // Construct the dynamic key for the enamel color
            const key = `${normalizedSelectedColor}${metalColor}`;
            console.log(`Checking key: ${key} in enamelColors:`, product.enamelColors?.Black);

            // Check if the product has enamel colors for this key
            const hasColor = product.enamelColors?.Black?.blackYellowGoldclr?.length > 0 || product.enamelColors?.Black?.blackRoseGoldclr?.length > 0 || product.enamelColors?.Black?.blackWhiteGoldclr?.length > 0;
            console.log(`Product has ${key}:`, hasColor);

            return hasColor;
          });

          console.log(`Product ${product.name} has all colors:`, hasAllColors);
          return hasAllColors;
        });
        console.log("Filtered by enamel color:", filteredProducts);
      } else if (selectedEnamelColor === "Red") {
        console.log(`${selectedEnamelColor} selected color`);
        const normalizedSelectedColor = selectedEnamelColor.toLowerCase(); // Convert the selected color to lowercase
        const requiredMetalColors = ['YellowGoldclr', 'RoseGoldclr', 'WhiteGoldclr'];
        filteredProducts = filteredProducts.filter((product) => {
          console.log("Checking product:", product); // Log the product being checked

          // Check if all required metal colors have the selected enamel color
          const hasAllColors = requiredMetalColors.every((metalColor) => {
            // Construct the dynamic key for the enamel color
            const key = `${normalizedSelectedColor}${metalColor}`;
            console.log(`Checking key: ${key} in enamelColors:`, product.enamelColors?.Red);

            // Check if the product has enamel colors for this key
            const hasColor = product.enamelColors?.Red?.redYellowGoldclr?.length > 0;
            console.log(`Product has ${key}:`, hasColor);

            return hasColor;
          });

          console.log(`Product ${product.name} has all colors:`, hasAllColors);
          return hasAllColors;
        });
        console.log("Filtered by enamel color:", filteredProducts);
      } else if (selectedEnamelColor === "Deep_Blue") {
        console.log(`${selectedEnamelColor} selected color`);
        const normalizedSelectedColor = selectedEnamelColor.toLowerCase(); // Convert the selected color to lowercase
        const requiredMetalColors = ['YellowGoldclr', 'RoseGoldclr', 'WhiteGoldclr'];
        filteredProducts = filteredProducts.filter((product) => {
          console.log("Checking product:", product); // Log the product being checked

          // Check if all required metal colors have the selected enamel color
          const hasAllColors = requiredMetalColors.every((metalColor) => {
            // Construct the dynamic key for the enamel color
            const key = `${normalizedSelectedColor}${metalColor}`;
            console.log(`Checking key: ${key} in enamelColors:`, product.enamelColors?.Deep_Blue);

            // Check if the product has enamel colors for this key
            const hasColor = product.enamelColors?.Deep_Blue?.deepblueYellowGoldclr?.length > 0 || product.enamelColors?.Deep_Blue?.deepblueRoseGoldclr?.length > 0 || product.enamelColors?.Deep_Blue?.deepblueWhiteGoldclr?.length > 0;
            console.log(`Product has ${key}:`, hasColor);

            return hasColor;
          });

          console.log(`Product ${product.name} has all colors:`, hasAllColors);
          return hasAllColors;
        });
        console.log("Filtered by enamel color:", filteredProducts);
      } else if (selectedEnamelColor === "Lotus_Green") {
        console.log(`${selectedEnamelColor} selected color`);
        const normalizedSelectedColor = selectedEnamelColor.toLowerCase(); // Convert the selected color to lowercase
        const requiredMetalColors = ['YellowGoldclr', 'RoseGoldclr', 'WhiteGoldclr'];
        filteredProducts = filteredProducts.filter((product) => {
          console.log("Checking product:", product); // Log the product being checked

          // Check if all required metal colors have the selected enamel color
          const hasAllColors = requiredMetalColors.every((metalColor) => {
            // Construct the dynamic key for the enamel color
            const key = `${normalizedSelectedColor}${metalColor}`;
            console.log(`Checking key: ${key} in enamelColors:`, product.enamelColors?.Lotus_Green);

            // Check if the product has enamel colors for this key
            const hasColor = product.enamelColors?.Lotus_Green?.lotusgreenYellowGoldclr?.length > 0 || product.enamelColors?.Lotus_Green?.lotusgreenRoseGoldclr?.length > 0 || product.enamelColors?.Lotus_Green?.lotusgreenWhiteGoldclr?.length > 0;
            console.log(`Product has ${key}:`, hasColor);

            return hasColor;
          });

          console.log(`Product ${product.name} has all colors:`, hasAllColors);
          return hasAllColors;
        });
        console.log("Filtered by enamel color:", filteredProducts);
      } else if (selectedEnamelColor === "Deep_Green") {
        console.log(`${selectedEnamelColor} selected color`);
        const normalizedSelectedColor = selectedEnamelColor.toLowerCase(); // Convert the selected color to lowercase
        const requiredMetalColors = ['YellowGoldclr', 'RoseGoldclr', 'WhiteGoldclr'];
        filteredProducts = filteredProducts.filter((product) => {
          console.log("Checking product:", product); // Log the product being checked

          // Check if all required metal colors have the selected enamel color
          const hasAllColors = requiredMetalColors.every((metalColor) => {
            // Construct the dynamic key for the enamel color
            const key = `${normalizedSelectedColor}${metalColor}`;
            console.log(`Checking key: ${key} in enamelColors:`, product.enamelColors?.Deep_Green);

            // Check if the product has enamel colors for this key
            const hasColor = product.enamelColors?.Deep_Green?.deepgreenYellowGoldclr?.length > 0 || product.enamelColors?.Deep_Green?.deepgreenRoseGoldclr?.length > 0 || product.enamelColors?.Deep_Green?.deepgreenWhiteGoldclr?.length > 0;
            console.log(`Product has ${key}:`, hasColor);

            return hasColor;
          });

          console.log(`Product ${product.name} has all colors:`, hasAllColors);
          return hasAllColors;
        });
        console.log("Filtered by enamel color:", filteredProducts);
      } else if (selectedEnamelColor === "Turquoise") {
        console.log(`${selectedEnamelColor} selected color`);
        const normalizedSelectedColor = selectedEnamelColor.toLowerCase(); // Convert the selected color to lowercase
        const requiredMetalColors = ['YellowGoldclr', 'RoseGoldclr', 'WhiteGoldclr'];
        filteredProducts = filteredProducts.filter((product) => {
          console.log("Checking product:", product); // Log the product being checked

          // Check if all required metal colors have the selected enamel color
          const hasAllColors = requiredMetalColors.every((metalColor) => {
            // Construct the dynamic key for the enamel color
            const key = `${normalizedSelectedColor}${metalColor}`;
            console.log(`Checking key: ${key} in enamelColors:`, product.enamelColors?.Turquoise);

            // Check if the product has enamel colors for this key
            const hasColor = product.enamelColors?.Turquoise?.turquoiseYellowGoldclr?.length > 0 || product.enamelColors?.Turquoise?.turquoiseRoseGoldclr?.length > 0 || product.enamelColors?.Turquoise?.turquoiseWhiteGoldclr?.length > 0;
            console.log(`Product has ${key}:`, hasColor);

            return hasColor;
          });

          console.log(`Product ${product.name} has all colors:`, hasAllColors);
          return hasAllColors;
        });
        console.log("Filtered by enamel color:", filteredProducts);
      }

      if (selectedTag) {
        filteredProducts = filteredProducts.filter((product) =>
          product.tags.toLowerCase().includes(selectedTag.toLowerCase())
        );
      }


      if (selectedAgeGroup) {
        filteredProducts = filteredProducts.filter((product) => {
          // Check if `ageGroup` is defined and is an object
          if (product.ageGroup && typeof product.ageGroup === 'object') {
            // Check if `selectedAgeGroup` exists in `ageGroup`
            return product.ageGroup[selectedAgeGroup] === true;
          }
          return false; // Exclude products with undefined or invalid `ageGroup`
        });
      }
      // Sort products
      switch (sortOption) {
        case "priceLowToHigh":
          filteredProducts.sort((a, b) => a.discountPrice - b.discountPrice);
          break;
        case "priceHighToLow":
          filteredProducts.sort((a, b) => b.discountPrice - a.discountPrice);
          break;
        case "nameAToZ":
          filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case "nameZToA":
          filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
          break;
        case "bestseller":
          filteredProducts.sort((a, b) => (b.sold_out || 0) - (a.sold_out || 0)); // Sort by highest sold_out first
          console.log("Sorted by bestseller:", filteredProducts.map(p => p.sold_out)); // Debug
          break;
        default:
          break;
      }
      console.log("Final filtered products:", filteredProducts);
      setFilteredData(filteredProducts);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    updateURLParams({ search: e.target.value });
  };

  const handlePriceChange = (e, index) => {
    const newValue = Number(e.target.value);
    setPriceRange((prevRange) => {
      const updatedRange = [...prevRange];
      updatedRange[index] = newValue;

      // updateURLParams({ priceMin: updatedRange[0], priceMax: updatedRange[1] });
      return updatedRange;
    });
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    updateURLParams({ sort: e.target.value });
  };

  const handleMetalColorChange = (e) => {
    setSelectedMetalColor(e.target.value);
    updateURLParams({ metalColor: e.target.value });
  };

  const updateURLParams = (newParams) => {
    const params = new URLSearchParams(searchParams.toString());

    for (const [key, value] of Object.entries(newParams)) {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    }

    setSearchParams(params);
  };

  const handleAgeGroupChange = (e) => {
    setSelectedAgeGroup(e.target.value);
    updateURLParams({ ageGroup: e.target.value });
  };
  const handleTagClick = (tag) => {
    console.log(tag.toLowerCase(), "product tagselcted")
    setSelectedTag(tag.toLowerCase());
    updateURLParams({ tag });
  };
  const removeFilter = (type) => {
    switch (type) {
      case "price":
        setPriceRange([]);
        updateURLParams({ priceMin: '', priceMax: '' });
        break;
      case "metalColor":
        setSelectedMetalColor("");
        updateURLParams({ metalColor: '' });
        break;
      case "search":
        setSearchQuery("");
        updateURLParams({ search: '' });
        break;
      case "sort":
        setSortOption("");
        updateURLParams({ sort: '' });
        break;

      case "enamelColor":
        setSelectedEnamelColor("");
        updateURLParams({ enamelColor: '' });
        break;
      case "tag":
        setSelectedTag("");
        updateURLParams({ tag: '' });
        break;
      case "ageGroup":
        setSelectedAgeGroup("");
        updateURLParams({ ageGroup: '' });
        break;

      default:
        break;
    }
    filterProducts(); // Reapply filters after removal
  };

  const handleEnamelColorChange = (color) => {
    setSelectedEnamelColor(color);
    updateURLParams({ enamelColor: color });
  };
  const navigate = useNavigate();

  const handleViewProducts = (categoryTitle) => {
    // Navigate to the products page with the category as a query parameter
    navigate(`/products?category=${categoryTitle}`);
  };
  return (
    <>
      <div className="productbanner">
        <img src={bannerimg} alt="" />
      </div>
      <button
        onClick={toggleFilterVisibility}
        className="flex items-center bg-gray-100 hover:bg-gray-200 text-gray-800 p-2 rounded-md border border-gray-300 shadow-sm transition-all duration-150 ease-in-out"
      >
        <span className="font-medium">
          {isFilterVisible ? 'Hide filter' : 'Show filter'}
        </span>
        {isFilterVisible ? (
          <FiChevronUp size={20} className="ml-2 text-gray-600" />
        ) : (
          <FiChevronDown size={20} className="ml-2 text-gray-600" />
        )}
      </button>
      <div className={`productpagemain flex  ${isFilterVisible ? '' : 'justify-center'}`} >
        {/* Sidebar Filter Section */}

        {isFilterVisible && (
          <div className={`filtersection ${isFilterVisible ? 'visible' : 'hidden'}  `}>

            <div className="filtersechead">

              {/* Applied Filters */}
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Applied Filters</h3>

                <div className="flex flex-wrap gap-2">
                  {searchQuery && (
                    <div className="flex items-center bg-blue-200 px-2 py-1 rounded-md">
                      <span>Search: {searchQuery}</span>
                      <RiCloseFill
                        className="ml-2 cursor-pointer"
                        onClick={() => removeFilter("search")}
                      />
                    </div>
                  )}
                  {priceRange.length === 2 && (
                    <div className="flex items-center bg-blue-200 px-2 py-1 rounded-md">
                      <span>Price: {priceRange[0]} - {priceRange[1]}</span>
                      <RiCloseFill
                        className="ml-2 cursor-pointer"
                        onClick={() => removeFilter("price")}
                      />
                    </div>
                  )}
                  {selectedMetalColor && (
                    <div className="flex items-center bg-blue-200 px-2 py-1 rounded-md">
                      <span>Metal Color: {selectedMetalColor}</span>
                      <RiCloseFill
                        className="ml-2 cursor-pointer"
                        onClick={() => removeFilter("metalColor")}
                      />
                    </div>
                  )}
                  {sortOption && (
                    <div className="flex items-center bg-blue-200 px-2 py-1 rounded-md">
                      <span>Sort: {sortOption}</span>
                      <RiCloseFill
                        className="ml-2 cursor-pointer"
                        onClick={() => removeFilter("sort")}
                      />
                    </div>
                  )}
                  {selectedEnamelColor && (
                    <div className="flex items-center bg-blue-200 px-2 py-1 rounded-md">
                      <span>Enamel Color: {selectedEnamelColor}</span>
                      <RiCloseFill
                        className="ml-2 cursor-pointer"
                        onClick={() => removeFilter("enamelColor")}
                      />
                    </div>
                  )}
                  {selectedTag && (
                    <div className="flex items-center bg-blue-200 px-2 py-1 rounded-md">
                      <span>Tag: {selectedTag}</span>
                      <RiCloseFill
                        className="ml-2 cursor-pointer"
                        onClick={() => removeFilter("tag")}
                      />
                    </div>
                  )}

                  {selectedAgeGroup && (
                    <div className="flex items-center bg-blue-200 px-2 py-1 rounded-md">
                      <span>AgeGroup: {selectedAgeGroup}</span>
                      <RiCloseFill
                        className="ml-2 cursor-pointer"
                        onClick={() => removeFilter("ageGroup")}
                      />
                    </div>
                  )}
                </div>
              </div>



              <div className="searchfilter">
                <input type="text" placeholder="Search product..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="searchfilterinp" />

                <IoSearchOutline className="serachiconfilter" />

              </div>
            </div>

            <div className="filterprice ml-4">
              <h5>Filter by Price</h5>
              <div className="card-conteiner">
                <div className="card-content">
                  <div className="rangeslider mb-2">
                    <input
                      className="min input-ranges"
                      name="range_1"
                      type="range"
                      min={0}
                      max={priceRange[1]}
                      value={priceRange[0] || 0}
                      onChange={(e) => handlePriceChange(e, 0)}
                    />
                    <input
                      className="max input-ranges"
                      name="range_1"
                      type="range"
                      min={priceRange[0]}
                      max={60000}
                      value={priceRange[1] || 60000}
                      onChange={(e) => handlePriceChange(e, 1)}
                    />
                  </div>
                </div>

              </div>
              <span>Price: ₹{priceRange[0] || 0}</span>
              <span className="pl-1 pr-1">-</span>
              <span className="mb-5">₹{priceRange[1] || 60000}</span>
            </div>
            <div className="marginbottom"></div>

            <div className="filtercategory ml-2">
              <h5>Product Categories</h5>
              <div className="filtercategorylist">
                {categoriesData.map((category) => (
                  <div key={category.id} onClick={() => handleViewProducts(category.title)}>
                    <ul>
                      <li>
                        {category.title}
                      </li>
                    </ul>
                  </div>
                ))}
              </div>
              <div className="marginbottom"></div>
            </div>

            <div className="Enamelcolours">
              <h5>Enamel Colors</h5>
              <div className="enamelscolorlist">
                <div className="enamelclrbox deepblue" onClick={() => handleEnamelColorChange('Deep_Blue')}></div>
                <div className="enamelclrbox pink" onClick={() => handleEnamelColorChange('Pink')}></div>
                <div className="enamelclrbox turquoise" onClick={() => handleEnamelColorChange('Turquoise')}></div>
                <div className="enamelclrbox red" onClick={() => handleEnamelColorChange('Red')}></div>
                <div className="enamelclrbox black" onClick={() => handleEnamelColorChange('Black')}></div>
                <div className="enamelclrbox deepgreen" onClick={() => handleEnamelColorChange('Deep_Green')}></div>
                <div className="enamelclrbox lotusgreen" onClick={() => handleEnamelColorChange('Lotus_Green')}></div>
              </div>
              <div className="marginbottom"> </div>
            </div>

            <div className="producttags">
              <h5>Product Tags</h5>

              <div className="producttagflex">
                <div className="producttagsingle" onClick={() => handleTagClick("Pendant")}>
                  Pendant
                </div>
                <div className="producttagsingle" onClick={() => handleTagClick("Earrings")}>
                  Earrings
                </div>
                <div className="producttagsingle" onClick={() => handleTagClick("Bracelets")}>
                  Bracelets
                </div>

                <div className="producttagsingle" onClick={() => handleTagClick("Nazariya")}>
                  Nazariya
                </div>
                <div className="producttagsingle" onClick={() => handleTagClick("Mom & me")}>
                  Mom & me
                </div>
                <div className="producttagsingle" onClick={() => handleTagClick("Gifts")}>
                  Gifts
                </div>

              </div>
            </div>




            {/* Price Range Filter */}
            {/* <div className="mb-4">
          <h3 className="font-semibold mb-2">Price Range</h3>
          <div className="flex items-center gap-2">
            <input
            type="number"
              min={0}
              value={priceRange[0] || ""}
              onChange={(e) => handlePriceChange(e, 0)}
              className="w-1/2 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Min"
            />
            <input
            type="number"
              min={0}
              value={priceRange[1] || ""}
              onChange={(e) => handlePriceChange(e, 1)}
              className="w-1/2 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Max"
            />
          </div>
        </div> */}


          </div>
        )
        }
        {/* Products Display Section */}
        <div className={`parentfilteradjustlast transition-all duration-300 ${isFilterVisible ? 'w-3/4' : 'w-[95%]'}`}>
          <div className="sortfilter">
            <div className="mb-4 flex items-center justify-end gap-3">
              <h3 className="font-semibold mb-2">Sort By</h3>
              <select
                value={sortOption}
                onChange={handleSortChange}
                className=" border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select</option>
                <option value="priceLowToHigh">Price: Low to High</option>
                <option value="priceHighToLow">Price: High to Low</option>
                <option value="nameAToZ">Name: A to Z</option>
                <option value="nameZToA">Name: Z to A</option>
                <option value="bestseller">Bestseller</option> {/* Add bestseller option */}
              </select>

            </div>
            <div className="sortline"></div>

          </div>
          <div className="section filtsecbig">
            <h1 className="text-center text-2xl font-semibold mb-8">
              {categoryData ? categoryData : "All Products"}
            </h1>

            {loading ? (
              <p className="text-center">Loading products...</p>
            ) : error ? (
              <p className="text-center text-red-500">{error}</p>
            ) : filteredData.length === 0 ? (
              <h1 className="text-center text-lg">No product found</h1>
            ) : (
              <div className={`adjustgridfilter grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 ${isFilterVisible ? 'xl:grid-cols-4' : 'xl:grid-cols-5'} mb-12`}>
                {filteredData.map((product, index) => (
                  <ProductCard data={product} key={index} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductsPage;

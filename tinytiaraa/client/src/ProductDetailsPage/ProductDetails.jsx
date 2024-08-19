import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from '../Styles/styles'
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage, AiOutlineShoppingCart } from 'react-icons/ai';
import { MdOutlineEmail, MdOutlineVerified } from "react-icons/md";
import { RiRefund2Line } from "react-icons/ri";
import { RiExchangeFundsLine } from "react-icons/ri";
import { CiCalendarDate, CiFacebook } from "react-icons/ci";
import { AiOutlineGold } from "react-icons/ai";
import { IoChevronBackOutline, IoChevronForwardOutline, IoDiamondOutline } from "react-icons/io5";
import { RxDimensions } from "react-icons/rx";
import { MdFeaturedPlayList } from "react-icons/md";
import { MdHealthAndSafety } from "react-icons/md";
import { FaAngleRight, FaChild, FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { TbBrandMinecraft } from "react-icons/tb";
import { TbCertificate } from "react-icons/tb";
import { MdOutlineAppRegistration } from "react-icons/md";
import { GiHeartNecklace } from "react-icons/gi";
import { GiMaterialsScience } from "react-icons/gi";



import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { backend_url, server } from '@/server';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@/redux/actions/cart';
import { toast } from 'react-toastify';
import { addToWishlist, removeFromWishlist } from '@/redux/actions/wishlist';
import Ratings from './Ratings';
import review1img from './reviewsimages/review1.jpg'
import review2img from './reviewsimages/review2.jpg'
import axios from 'axios';
import Modal from 'react-modal';
import './productdetails.css'

import withchainimg from './withchain.svg'
import withoutchainimg from './withoutchain.svg'


import { EmailIcon, FacebookIcon, WhatsappIcon, } from "react-share";
import { EmailShareButton, FacebookShareButton, WhatsappShareButton, } from "react-share";


Modal.setAppElement('#root'); // Replace '#root' with the ID of your root element

function ProductDetails({ data }) {

    const { wishlist } = useSelector((state) => state.wishlist)
    const { cart } = useSelector((state) => state.cart)
    const { user, isAuthenticated } = useSelector((state) => state.user)




    const navigate = useNavigate()
    const dispatch = useDispatch()


    const [count, setCount] = useState(1)
    const [click, setClick] = useState(false)
    const [select, setSelect] = useState(0)


    const [selectedColorIndex, setSelectedColorIndex] = useState(null);
    const [validationError, setValidationError] = useState('');

    const [showGallery, setShowGallery] = useState(false); // State for gallery modal
    const [currentImageIndex, setCurrentImageIndex] = useState(0); // Track the current image index in modal


    const [selectedEnamelColor, setSelectedEnamelColor] = useState(null)

    const createSlug = (name) => {
        return name.toLowerCase().replace(/[\s]+/g, '-').replace(/[^\w-]+/g, '');
    };

    const productSlug = createSlug(data.name);
    const productUrl = `https://tiny-tiaraanew.vercel.app/product/${productSlug}`;


    // // console.log(data.withchainimages)
    // const addToCartHandler = (id) => {

    //     const isItemExists = cart && cart.find((i) => i._id === id)

    //     if (isItemExists) {
    //         toast.error("Item Already in cart")
    //     } else {
    //         if (data.stock < count) {
    //             toast.error("Product Stock limited")

    //         } else {
    //             const cartData = { ...data, qty: count }
    //             dispatch(addToCart(cartData))
    //             toast.success("Product Added to cart")
    //         }
    //     }

    // }
    const addToCartHandler = (id, shouldNavigate = false) => {
        console.log("Selected Color:", selectedColor);
        console.log("Show With Chain:", showWithChain);
        console.log("Selected Enamel Color:", selectedEnamelColor);

        if (validateForm()) {
            // Check if the item already exists in the cart with the same combination of options
            const isItemExists = cart && cart.find((i) =>
                i._id === id &&
                i.selectedColor === selectedColor &&
                i.showWithChain === showWithChain &&
                i.selectedEnamelColor === selectedEnamelColor
            );

            if (isItemExists) {
                toast.error("Item Already in cart");
            } else {
                if (data.stock < count) {
                    toast.error("Product Stock limited");
                } else {
                    const cartData = {
                        ...data,
                        qty: count,
                        selectedColor: selectedColor,
                        showWithChain: showWithChain,
                        selectedEnamelColor: selectedEnamelColor
                    };
                    dispatch(addToCart(cartData));
                    toast.success("Product Added to cart");

                    // Console log the updated cart value
                    console.log("Updated Cart:", cart); // Assuming `cart` is from useSelector

                    // Optionally, you can also console log the `cartData` if needed
                    console.log("Added to Cart:", cartData);
                    if (shouldNavigate) {
                        navigate('/cart');
                    }
                }
            }
        } else {
            toast.error("Please select color and chain options.");
        }
    };

    const calculateDiscountPercentage = (originalPrice, discountPrice) => {
        if (originalPrice > 0 && discountPrice > 0 && originalPrice > discountPrice) {
            return Math.round(((originalPrice - discountPrice) / originalPrice) * 100);
        }
        return 0;
    };
    const discountPercentage = calculateDiscountPercentage(data.originalPrice, data.discountPrice);



    const shareOnInstagram = (product) => {
        // const caption = `Check out this amazing product: ${product.name}!`;

        console.log(product, "share data")
        const url = `https://www.instagram.com/?url=${productUrl}`;
        window.open(url, '_blank');
    };

    useEffect(() => {

        if (wishlist && wishlist.find((i) => i._id === data._id)) {
            setClick(true)

        } else {
            setClick(false)
        }

    }, [wishlist])

    const removeFromWishlistHandler = (data) => {
        setClick(!click)
        dispatch(removeFromWishlist(data))


    }
    const addToWishlistHandler = (data) => {
        setClick(!click)
        dispatch(addToWishlist(data))


    }



    const decrementCount = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    };

    const incrementCount = () => {
        setCount(count + 1);
    };



    const [selectedColor, setSelectedColor] = useState(null);
    const handleColorChange = (colorIndex) => {
        setSelectedColor(colorIndex); // Update selectedColor state with the index of the color
        setSelect(0); // Reset selected image index to 0 when color changes

        setShowWithChain(null);
    };
    const [showWithChain, setShowWithChain] = useState(null);

    const toggleChainOption = (option) => {
        setShowWithChain(option === 'with'); // Set showWithChain based on the selected option ('with' or 'without')
        setSelect(0); // Reset selected image index when toggling chain option
        // setSelectedColorIndex(null);
    };

    // const imagesArray =
    // selectedColor === 0
    //     ? data.MetalColor.YellowGoldclr
    //     : selectedColor === 1
    //         ? data.MetalColor.RoseGoldclr
    //         : selectedColor === 2
    //             ? data.MetalColor.WhiteGoldclr

    //             : showWithChain === true
    //                 ? data.withchainimages
    //                 : showWithChain === false
    //                     ? data.withchainoutimages


    //                     : data.images;

    // Function to normalize key format (remove underscores and convert to camel case)






    const renderImages = () => {
        // Determine which array of images to render based on selectedColor


        const displayedImages = imagesArray.slice(0, 4); // Limit to first 4 images
        const remainingImageCount = imagesArray.length - displayedImages.length;

        return (
            <div className='w-full flex '>
                {displayedImages &&
                    displayedImages.map((image, index) => (
                        <div
                            key={index}
                            className={`relative w-[24%] ${select === index ? 'border' : ''} cursor-pointer`}
                            onClick={() => setSelect(index)}
                        >
                            <img
                                src={`${image?.url}`}
                                alt=""
                                className='w-[100%] h-[160px] object-contain'
                            />
                            {index === 3 && remainingImageCount > 0 && (
                                <div
                                    className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white font-bold cursor-pointer"
                                    onClick={() => {
                                        setCurrentImageIndex(3);
                                        setShowGallery(true);
                                    }} // Open gallery modal
                                >
                                    + {remainingImageCount} more
                                </div>
                            )}
                        </div>
                    ))}
            </div>
        );
    };

    const handleMessageSubmit = async () => {

        console.log(data, "checking")

        if (isAuthenticated) {
            const groupTitle = data._id + user._id
            const userId = user._id
            const sellerId = data.shopId
            await axios.post(`${server}/conversation/create-new-conversation`, {
                groupTitle, userId, sellerId
            }).then((res) => {
                navigate(`/conversation/${res.data.conversation._id}`)

            }).catch((error) => {
                toast.error(error.response.data.message)
            })
        } else {
            toast.error("Please Login to create a conversation")
        }

    }

    // const validateForm = () => {
    //     const hasChainOptions = data.withchainimages.length > 0 || data.withchainoutimages.length > 0;
    //     if (!hasChainOptions) {
    //         return selectedColor !== null;
    //     }
    //     return selectedColor !== null && showWithChain !== null;
    // };
    const validateForm = () => {
        const hasChainOptions = data.withchainimages.length > 0 || data.withchainoutimages.length > 0;
        const isEnamelColorRequired = shouldShowEnamel && availableEnamelColors.length > 0;
    
        if (!hasChainOptions) {
            if (selectedColor === null) {
                setValidationError('Please select a metal color.');
                return false;
            }
            if (isEnamelColorRequired && selectedEnamelColor === null) {
                setValidationError('Please select an enamel color.');
                return false;
            }
            return true;
        }
    
        if (selectedColor === null) {
            setValidationError('Please select a metal color.');
            return false;
        }
        if (showWithChain === null) {
            setValidationError('Please select a chain option.');
            return false;
        }
        if (isEnamelColorRequired && selectedEnamelColor === null) {
            setValidationError('Please select an enamel color.');
            return false;
        }
        
        return true;
    };
    useEffect(() => {
        // Reset validation error on color or chain change
        
        setValidationError('');
    }, [selectedColorIndex, showWithChain ,selectedColor ,selectedEnamelColor]);

    // Determine if chain options should be displayed
    const shouldShowChainOptions = data.withchainimages.length > 0 || data.withchainoutimages.length > 0;

    // const getAvailableEnamelColors = (enamelColors) => {
    //     return Object.entries(enamelColors)
    //         .filter(([color, colorData]) => {
    //             // Format the enamel color part
    //             const baseColor = color.toLowerCase().replace(/_/g, '');

    //             // Construct the correct keys for data access
    //             const yellowGoldKey = `${baseColor}YellowGoldclr`;
    //             const roseGoldKey = `${baseColor}RoseGoldclr`;
    //             const whiteGoldKey = `${baseColor}WhiteGoldclr`;

    //             // Safeguard checks to ensure arrays are defined and not empty
    //             const hasYellowGoldclr = Array.isArray(colorData[yellowGoldKey]) && colorData[yellowGoldKey].length > 0;
    //             const hasRoseGoldclr = Array.isArray(colorData[roseGoldKey]) && colorData[roseGoldKey].length > 0;
    //             const hasWhiteGoldclr = Array.isArray(colorData[whiteGoldKey]) && colorData[whiteGoldKey].length > 0;

    //             // Debug: Log the availability status
    //             console.log(`Color: ${color}, YellowGold: ${hasYellowGoldclr}, RoseGold: ${hasRoseGoldclr}, WhiteGold: ${hasWhiteGoldclr}`);

    //             // Return true if any of the arrays are non-empty
    //             return hasYellowGoldclr || hasRoseGoldclr || hasWhiteGoldclr;
    //         })
    //         .map(([color]) => ({ _id: color, enamelColorName: color.replace(/_/g, ' ') })); // Format color names
    // };

    // Determine if there are any available enamel colors



    // const availableEnamelColors = getAvailableEnamelColors(data.enamelColors || {});
    // const shouldShowEnamel = availableEnamelColors.length > 0;

    // // Debug: Print available enamel colors
    // console.log("Available Enamel Colors:", availableEnamelColors);





    // Gallery Navigation Handlers

    // const getAvailableEnamelColors = (enamelColors, selectedMetalColor) => {
    //     return Object.entries(enamelColors)
    //         .filter(([color, colorData]) => {
    //             // Format the enamel color part
    //             const baseColor = color.toLowerCase().replace(/_/g, '');

    //             // Construct the correct key for the selected metal color
    //             const metalColorKey = `${baseColor}${selectedMetalColor}`;

    //             // Safeguard checks to ensure the array is defined and not empty
    //             const hasMetalColor = Array.isArray(colorData[metalColorKey]) && colorData[metalColorKey].length > 0;

    //             // Debug: Log the availability status
    //             console.log(`Color: ${color}, Metal Color Key: ${metalColorKey}, Has Metal Color: ${hasMetalColor}`);

    //             // Return true if the array for the selected metal color is non-empty
    //             return hasMetalColor;
    //         })
    //         .map(([color]) => ({ _id: color, enamelColorName: color.replace(/_/g, ' ') })); // Format color names
    // };

    // // Call the function with the selected metal color
    // const selectedMetalColorKey = selectedColor === 0 ? "YellowGoldclr" : selectedColor === 1 ? "RoseGoldclr" : "WhiteGoldclr";
    // const availableEnamelColors = getAvailableEnamelColors(data.enamelColors || {}, selectedMetalColorKey);
    // const shouldShowEnamel = availableEnamelColors.length > 0;

    // Debug: Print available enamel colors based on selected metal color
    // console.log("Available Enamel Colors for Selected Metal:", availableEnamelColors);


  const getAvailableEnamelColors = (enamelColors, selectedMetalColor) => {
    return Object.entries(enamelColors)
        .filter(([color, colorData]) => {
            const baseColor = color.toLowerCase().replace(/_/g, '');
            const enamelKeys = [
                `${baseColor}YellowGoldclr`,
                `${baseColor}RoseGoldclr`,
                `${baseColor}WhiteGoldclr`
            ];

            if (selectedMetalColor) {
                // Filter based on specific metal color
                const enamelKey = `${baseColor}${selectedMetalColor}clr`;
                return Array.isArray(colorData[enamelKey]) && colorData[enamelKey].length > 0;
            } else {
                // Show all colors that have images in any metal color
                return enamelKeys.some(key => Array.isArray(colorData[key]) && colorData[key].length > 0);
            }
        })
        .map(([color]) => {
            const baseColor = color.toLowerCase().replace(/_/g, '');
            const availableKeys = [
                `${baseColor}YellowGoldclr`,
                `${baseColor}RoseGoldclr`,
                `${baseColor}WhiteGoldclr`
            ].filter(key => Array.isArray(enamelColors[color][key]) && enamelColors[color][key].length > 0);

            return {
                _id: color,
                enamelColorName: color.replace(/_/g, ' '),
                availableKeys
            };
        });
};
    
    

    // In your component, update the code to use the selected metal color when available:
    const availableEnamelColors = getAvailableEnamelColors(
        data.enamelColors || {},
        selectedColor !== null ? ["YellowGold", "RoseGold", "WhiteGold"][selectedColor] : null
    );
    const shouldShowEnamel = availableEnamelColors.length > 0;
    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex < imagesArray.length - 1 ? prevIndex + 1 : 0
        );
    };

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex > 0 ? prevIndex - 1 : imagesArray.length - 1
        );
    };

    const imagesArray = (() => {
        const enamelColorData = data.enamelColors[selectedEnamelColor] || {};
        console.log(enamelColorData, "see enamel data");
        console.log(selectedEnamelColor, "see enamel color");

        if (selectedEnamelColor) {
            const formattedColor = selectedEnamelColor.toLowerCase().replace(/_/g, '');
    
            if (selectedColor !== null) {
                // Construct the enamel key for the selected metal color
                const enamelKey = `${formattedColor}${["YellowGold", "RoseGold", "WhiteGold"][selectedColor]}clr`;
                console.log("Enamel Key:", enamelKey);
    
                // Return images for the selected enamel and metal color
                const images = enamelColorData[enamelKey] || [];
                if (images.length > 0) {
                    return images;
                } else {
                    // Reset selectedEnamelColor if no images are found for the selected metal color
                    setSelectedEnamelColor(null);
                }
            } else {
                // Initial state: Show all images for the selected enamel color across all metal colors
                const availableKeys = getAvailableEnamelColors(data.enamelColors || {}, null)
                    .find(color => color._id === selectedEnamelColor)?.availableKeys || [];
    
                return availableKeys.flatMap(key => enamelColorData[key] || []);
            }
        }
    

        // Default to metal color images if no enamel color is selected
        if (showWithChain === true) return data.withchainimages || [];
        if (showWithChain === false) return data.withchainoutimages || [];
        if (selectedColor === 0) return data.MetalColor.YellowGoldclr || [];
        if (selectedColor === 1) return data.MetalColor.RoseGoldclr || [];
        if (selectedColor === 2) return data.MetalColor.WhiteGoldclr || [];

        return data.images || [];
    })();

    console.log(imagesArray, "see image array");

    return (
        <div className='bg-white'>
            {
                data ?
                    <div className={`${styles.section} w-[95%] 800px:w-[80%]`}>
                        <div className='w-full py-5'>
                            <div className='flex w-full 800px:flex flex-col sm:flex-row'>
                                <div className="w-full 800px:w-[50%] mr-5">

                                    {/* {select !== null && (
                                        selectedColor === 0 && data.MetalColor.YellowGoldclr ? (
                                            <img
                                                src={`${data.MetalColor.YellowGoldclr[select]?.url}`}
                                                alt=""
                                                className='w-[100%] h-[60vh] object-contain'
                                            />
                                        ) : selectedColor === 1 && data.MetalColor.RoseGoldclr ? (
                                            <img
                                                src={`${data.MetalColor.RoseGoldclr[select]?.url}`}
                                                alt=""
                                                className='w-[100%] h-[60vh] object-contain'
                                            />
                                        ) : selectedColor === 2 && data.MetalColor.WhiteGoldclr ? (
                                            <img
                                                src={`${data.MetalColor.WhiteGoldclr[select]?.url}`}
                                                alt=""
                                                className='w-[100%] h-[60vh] object-contain'
                                            />
                                        ) : (
                                            data.images && data.images[select] ? (
                                                <img
                                                    src={`${data.images[select]?.url}`}
                                                    alt=""
                                                    className='w-[100%] h-[60vh] object-contain'
                                                />
                                            ) : (
                                                <img
                                                    src={`${data.images && data.images[0]?.url}`} // Default to the first image if select is null or out of range
                                                    alt=""
                                                    className='w-[100%] h-[60vh] object-contain'
                                                />
                                            )
                                        )
                                    )
                                    } */}

                                    {select !== null && imagesArray.length > 0 ? (
                                        <img
                                            src={`${imagesArray[select]?.url}`}
                                            alt=""
                                            className='w-[100%] h-[60vh] object-contain'
                                        />
                                    ) : (
                                        <img
                                            src={`${data.images && data.images[0]?.url}`} // Default to the first image if select is null or out of range
                                            alt=""
                                            className='w-[100%] h-[60vh] object-contain'
                                        />
                                    )}


                                    <div className='w-full flex'>
                                        {renderImages()}
                                        <Modal
                                            isOpen={showGallery}
                                            onRequestClose={() => setShowGallery(false)}
                                            className="flex justify-center items-center outline-none"
                                            overlayClassName="fixed inset-0 bg-black bg-opacity-75 z-50"
                                            style={{
                                                overlay: { zIndex: 1000 },
                                                content: { border: 'none', background: 'transparent', padding: 0 },
                                            }}
                                        >
                                            <div className="relative bg-white p-4 rounded-lg shadow-lg w-full h-full max-w-4xl flex justify-center items-center">
                                                <button
                                                    className="absolute top-4 right-4 text-black text-2xl"
                                                    onClick={() => setShowGallery(false)}
                                                >
                                                    &times;
                                                </button>
                                                <button
                                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-black text-3xl"
                                                    onClick={handlePrevImage}
                                                >
                                                    <IoChevronBackOutline />
                                                </button>
                                                <button
                                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-black text-3xl"
                                                    onClick={handleNextImage}
                                                >
                                                    <IoChevronForwardOutline />

                                                </button>
                                                <div className="flex flex-col items-center">
                                                    <img
                                                        src={`${imagesArray[currentImageIndex]?.url}`}
                                                        alt=""
                                                        className="w-auto max-h-full object-contain"
                                                    />
                                                    <div className="mt-4 text-black">
                                                        {currentImageIndex + 1} / {imagesArray.length}
                                                    </div>
                                                </div>
                                            </div>
                                        </Modal>



                                    </div>



                                </div>


                                <div className='w-full 800px:w-[50%] pt-5'>

                                    <h1 className={`${styles.productTitle} !font-[450]`}>{data.name}</h1>
                                    <h3 className={`text-[#727386] text-left  text-[16px] font-Poppins pt-2`}>{data.skuid}</h3>
                                    <p className="font-Poppins pt-1 text-[14px]">{data.description}</p>


                                    <div className="flex items-center pt-3">
                                        <h5 className={`${styles.productDiscountPrice} !stext-[#01463A]`}>
                                            ₹
                                            {data.originalPrice === 0
                                                ? data.originalPrice
                                                : data.discountPrice}
                                        </h5>
                                        <h4 className={`${styles.price} line-through`}>
                                            {data.originalPrice ? " ₹" + data.originalPrice : null}
                                        </h4>
                                        {discountPercentage > 0 && (
                                            <span className="ml-2  text-[#4B4B4B] font-[450]">
                                                Save {discountPercentage}%
                                            </span>
                                        )}

                                    </div>

                                    <div className="instockcon">
                                        <div className='instockconflex'>
                                            <svg width="13" height="11" viewBox="0 0 13 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M13 1.1566L4.08571 11L0 6.48844L1.04743 5.33184L4.08571 8.6786L11.9526 0L13 1.1566Z" fill="#0B8D08" />
                                            </svg>
                                            <span>
                                                In Stock
                                            </span>
                                        </div>
                                    </div>

                                    {/* metal options */}

                                    {/* <div>
                                        {Object.keys(data.MetalColor).length > 0 && (
                                            <div className="metal-color-options">
                                                <h3 className='text-[20px] font-[600] font-Poppins'>Metal Color</h3>
                                                {Object.keys(data.MetalColor).map((key, index) => {
                                                    // Remove "clr" from the end of color name
                                                    const label = key.replace(/clr$/i, '');

                                                    return (
                                                        <div key={index} className='flex items-center text-[16px] font-Poppins py-1'>
                                                            <input
                                                                type="radio"
                                                                name='colorcode'
                                                                id={`color-${key}`}
                                                                value={key}
                                                                checked={selectedColor === index}
                                                                onChange={() => handleColorChange(index) || setSelectedColor(index)}
                                                            />
                                                            <label
                                                                className='pl-2 cursor-pointer'
                                                                htmlFor={`color-${key}`}
                                                            >
                                                                {label}
                                                            </label>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div> */}
                                    {/* <div className='metaloptionproduct'>
                                        {Object.keys(data.MetalColor).length > 0 && (
                                            <>
                                                <div className='metaltitle'>
                                                    <h3>Metal Color :</h3>
                                                </div>
                                                <div className='metalmaincolor'>
                                                    {Object.keys(data.MetalColor).map((key, index) => {
                                                        // Remove "clr" from the end of color name
                                                        const label = key.replace(/clr$/i, '');
                                                        const isSelected = selectedColor === index;

                                                        return (
                                                            <div key={index} className={`metalcolor ${isSelected ? 'selected' : ''}`}>
                                                                <input
                                                                    type="radio"
                                                                    name='colorcode'
                                                                    id={`color-${key}`}
                                                                    value={key}
                                                                    checked={isSelected}
                                                                    onChange={() => handleColorChange(index) || setSelectedColor(index)}
                                                                    className='hidden' // Hide the default radio button
                                                                />
                                                                <label
                                                                    htmlFor={`color-${key}`}
                                                                    className='flex items-center flex-col cursor-pointer'
                                                                >
                                                                    <span className={`metalcolorcon ${key} ${isSelected ? 'selected' : ''}`}></span>
                                                                    <span className='ml-2'>{label}</span>
                                                                </label>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </>
                                        )}
                                    </div> */}
                                    <div className='metaloptionproduct'>
                                        {Object.keys(data.MetalColor).length > 0 && (
                                            <>
                                                <div className='metaltitle'>
                                                    <h3>Metal Color :</h3>
                                                </div>
                                                <div className='metalmaincolor'>
                                                    {Object.keys(data.MetalColor).map((key, index) => {
                                                        // Remove "clr" from the end of color name
                                                        const label = key.replace(/clr$/i, '');
                                                        const isSelected = selectedColor === index;

                                                        return (
                                                            <div key={index} className={`metalcolor ${isSelected ? 'selected' : ''}`}>
                                                                <input
                                                                    type="radio"
                                                                    name='colorcode'
                                                                    id={`color-${key}`}
                                                                    value={key}
                                                                    checked={isSelected}
                                                                    onChange={() => handleColorChange(index)}
                                                                    className='hidden' // Hide the default radio button
                                                                />
                                                                <label
                                                                    htmlFor={`color-${key}`}
                                                                    className='flex items-center flex-col cursor-pointer'
                                                                >
                                                                    <span className={`metalcolorcon ${key} ${isSelected ? 'selected' : ''}`}></span>
                                                                    <span className='ml-2'>{label}</span>
                                                                </label>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </>
                                        )}
                                    </div>

                                    {/* enamel option */}

                                    {/* {shouldShowEnamel && (
                                        <div className="enamelotion pt-3">
                                            <div className='enameltitle'>
                                                <h3 className="text-[20px] font-[600] font-Poppins">Enamel Color : </h3>
                                            </div>
                                            <div className="enamelselect text-[16px] font-Poppins py-1">
                                                <select
                                                    name="enamelColors"
                                                    id="enamelColors"
                                                    className="border"
                                                    onChange={(e) => setSelectedEnamelColor(e.target.value)}
                                                    value={selectedEnamelColor}
                                                >
                                                    <option value="">Select Enamel Color</option>
                                                    {availableEnamelColors.map((color) => (
                                                        <option key={color._id} value={color._id}>
                                                            {color.enamelColorName}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    )} */}
                                    {shouldShowEnamel && (
                                        <div className="enamelotion pt-3">
                                            <div className='enameltitle'>
                                                <h3 className="text-[20px] font-[600] font-Poppins">Enamel Color : </h3>
                                            </div>
                                            <div className="enamelselect text-[16px] font-Poppins py-1">
                                                <select
                                                    name="enamelColors"
                                                    id="enamelColors"
                                                    className="border"
                                                    onChange={(e) => setSelectedEnamelColor(e.target.value)}
                                                    value={selectedEnamelColor}
                                                >
                                                    <option value="">Select Enamel Color</option>
                                                    {availableEnamelColors.map((color) => (
                                                        <option key={color._id} value={color._id}>
                                                            {color.enamelColorName}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    )}

                                    {/* chain options */}
                                    {/* {shouldShowChainOptions && (

                                        <div className='pt-3'>
                                            <h3 className='text-[20px] font-[600] font-Poppins'>Chain</h3>
                                            <div className='radio-option  text-[16px] font-Poppins py-1'>
                                                <input
                                                    type='radio'
                                                    id='withChain'
                                                    name='chainOption'
                                                    value='with'
                                                    onChange={() => toggleChainOption('with')}
                                                    checked={showWithChain}
                                                />
                                                <label htmlFor='withChain' className='pl-2 cursor-pointer'>
                                                    With 1 gm Chain ( 13 inches) (+₹ 7,200)
                                                </label>
                                            </div>
                                            <div className='radio-option text-[16px] font-Poppins py-1'>
                                                <input
                                                    type='radio'
                                                    id='withoutChain'
                                                    name='chainOption'
                                                    value='without'
                                                    onChange={() => toggleChainOption('without')}
                                                    checked={!showWithChain}
                                                />
                                                <label htmlFor='withoutChain' className='pl-2 cursor-pointer'>
                                                    Without Chain
                                                </label>
                                            </div>
                                        </div>
                                    )} */}



                                    {shouldShowChainOptions && (
                                        <div className='chainotionproduct'>
                                            <div className='chainopiontitle'>
                                                <h3>Chain Type :</h3>
                                            </div>

                                            <div className='chainotionproductflex'>
                                                <div className='withchainoption'>
                                                    <div className='withchainoptioncon text-[16px] font-Poppins py-1'>
                                                        <input
                                                            type='radio'
                                                            id='withChain'
                                                            name='chainOption'
                                                            value='with'
                                                            onChange={() => toggleChainOption('with')}
                                                            checked={showWithChain}
                                                        />
                                                        <label htmlFor='withChain' className='pl-2 cursor-pointer'>
                                                            With 1 gm Chain
                                                            <span>( 13 inches) (+₹ 7,200)</span>

                                                            <div className='withchainimgcon'>
                                                                <img src={withchainimg} alt="" />
                                                            </div>
                                                        </label>
                                                    </div>

                                                </div>
                                                <div className='withchainoption'>
                                                    <div className='withchainoptioncon text-[16px] font-Poppins py-1'>
                                                        <input
                                                            type='radio'
                                                            id='withoutChain'
                                                            name='chainOption'
                                                            value='without'
                                                            onChange={() => toggleChainOption('without')}
                                                            checked={!showWithChain}
                                                        />
                                                        <label htmlFor='withoutChain' className='pl-2 cursor-pointer'>
                                                            Without Chain
                                                            <div className='withchainimgcon mt-[22px]'>
                                                                <img src={withoutchainimg} alt="" />
                                                            </div>
                                                        </label>
                                                    </div>

                                                </div>



                                            </div>

                                        </div>

                                    )}



                                    {/* Validation Error */}
                                    {validationError && (
                                        <p className='text-red-500 text-sm mt-2'>{validationError}</p>
                                    )}





                                    <div className='flex items-center mt-5 gap-[20px] pr-3'>
                                        <div className='cartqtycon overflow-hidden'>
                                            <button onClick={decrementCount} className="text-black font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out">-</button>
                                            <span className="bg-white text-black font-medium px-4 py-[9.1px] font-Poppins overflow-hidden">
                                                {count}
                                            </span>
                                            <button onClick={incrementCount}
                                                className="text-black font-bold rounded-br rounded-tr px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                                            >+ </button>
                                        </div>

                                        <div
                                            className={`${styles.button} mt-2 rounded-[4px] !h-[45px] flex items-center !bg-[#01463A]`}
                                            onClick={() => addToCartHandler(data._id)}
                                        >
                                            <span className="text-[#fff] flex items-center font-Poppins">
                                                Add to cart <AiOutlineShoppingCart className="ml-1" />
                                            </span>
                                        </div>
                                    </div>

                                    <div
                                        className={`${styles.button} productbuynowbtn mt-2 rounded-[4px]  flex items-center `}
                                        onClick={() => addToCartHandler(data._id, true)}
                                    >
                                        <span className="flex items-center font-Poppins">
                                            Buy Now
                                        </span>
                                    </div>


                                    {/* add to wishlist */}

                                    <div className='productaddtowish'>
                                        {
                                            click ?

                                                <div className='productaddtowishflex cursor-pointer ' onClick={() => removeFromWishlistHandler(data)}>
                                                    <AiFillHeart
                                                        size={24}
                                                        className='cursor-pointer '
                                                        color={click ? "red" : "#333"}

                                                        title='Remove from wishlist'
                                                    />

                                                    <span>Already in wishlist</span>

                                                </div>
                                                :
                                                <div className='productaddtowishflex cursor-pointer ' onClick={() => addToWishlistHandler(data)}>
                                                    <AiOutlineHeart
                                                        size={24}

                                                        color={click ? "red" : "#333"}

                                                        title='Add to wishlist'


                                                    />
                                                    <span>Add to wishlist</span>
                                                </div>
                                        }
                                    </div>

                                    {/* share product */}
                                    <div className='shareproductlist'>
                                        <div className='sharelisttitle'>
                                            <h3>Share this product :</h3>

                                        </div>

                                        <div className='productsharelisticon'>
                                            <FacebookShareButton url={productUrl} >
                                                <FaFacebook size={28} className="share-icon" />

                                                {/* <FacebookIcon size={32} round={true} /> */}
                                            </FacebookShareButton>

                                            <WhatsappShareButton url={productUrl} >
                                                <FaWhatsapp size={28} className="share-icon" />

                                                {/* <WhatsappIcon size={28} round={true} /> */}
                                            </WhatsappShareButton>

                                            <EmailShareButton url={productUrl} >
                                                <MdOutlineEmail size={28} className="share-icon" />

                                                {/* <EmailIcon size={28} round={true} /> */}
                                            </EmailShareButton>

                                            <div onClick={() => { shareOnInstagram(data) }}>
                                                <FaInstagram size={28} className="share-icon" />

                                                {/* <i className="fa-brands fa-square-instagram instasty" style={{ cursor: 'pointer' }}></i> */}

                                            </div>

                                        </div>

                                    </div>

                                    {/* <div className={`${styles.button} mt-6 !w-[190px] p-4 !rounded !h-[40px]`} onClick={handleMessageSubmit}>
                                        <span className='text-white flex items-center'> Send Message <AiOutlineMessage className='ml-2' /></span>
                                    </div> */}



                                </div>

                            </div>

                        </div>

                        <ProductDetailsInfo data={data} />


                    </div>
                    :
                    null
            }


        </div>
    )
}


const ProductDetailsInfo = ({ data }) => {
    const [active, setActive] = useState(1)
    console.log(data, "see the data")


    return (
        <div className='bg-[#fafafa] mb-5 px-10 800px:px-2 py-2 rounded pb-5'>
            <div className="w-full flex justify-between border-b pt-10 pb-2">
                <div className="relative">
                    <h5 className={`${active === 1 ? "text-[#1BB8E5] font-[700]" : "text-[#000]"} text-[18px]  px-1 leading-5 cursor-pointer 800px:text-[20px] font-Poppins `} onClick={() => setActive(1)} >Product Details</h5>
                    {/* {
                    active === 1 ?
                     (
                        <div className={`${styles.active_indicator}`} />
                    ) : null} */}
                </div>
                <div className="relative">
                    <h5 className={`${active === 2 ? "text-[#1BB8E5] font-[700]" : "text-[#000]"} text-[18px] px-1 leading-5 cursor-pointer 800px:text-[20px] font-Poppins`} onClick={() => setActive(2)}>Product Reviews</h5>

                </div>

            </div>
            {
                active === 1 ?
                    <>
                        <div className='mb-3'>
                            <h1 className={`text-[20px] font-[600] font-Poppins text-[#333] pt-1`}>{data.name}</h1>
                            <p className="font-Poppins pt-1">{data.description}</p>
                            <h3 className={`text-[#727386] text-left  text-[16px] font-Poppins pt-1`}>{data.skuid}</h3>

                        </div>

                        {/* table section */}

                        <div className='flex flex-wrap  gap-5'>

                            <div className="bg-[#fff3e9] w-[320px] font-Poppins mb-3">
                                <div className="t1sec px-[12.5px] py-[16px] gap-2 flex items-center">
                                    <span><AiOutlineGold /></span>
                                    <span className='font-[500]'>Gold</span>
                                </div>
                                <div className="tsec2 flex font-Poppins">
                                    <div className='w-[200px] bg-[#fff9f5] mr-[1.5px] px-[10px] py-[10px]'>
                                        <div className='pb-[8px] font-[600] '>Weight</div>
                                        <p className='text-[#4f3267] text-[14px]'> {data?.goldWeight ? data.goldWeight.weight : "Not Updated"} </p>
                                    </div>
                                    <div className='w-[200px] bg-[#fff9f5] mr-[1.5px] px-[10px] py-[10px]'>
                                        <div className='pb-[8px] font-[600] '>Purity</div>
                                        <p className='text-[#4f3267] text-[14px]'>{data?.goldWeight ? data.goldWeight.purity : "18 kt"}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-[#fff3e9] w-[320px] font-Poppins mb-3">
                                <div className="t1sec px-[12.5px] py-[16px] gap-2 flex items-center">
                                    <span><IoDiamondOutline /></span>
                                    <span className='font-[500]'>Diamond</span>
                                </div>
                                <div className="tsec2 flex font-Poppins">
                                    <div className='w-[200px] bg-[#fff9f5] mr-[1.5px] px-[10px] py-[10px]'>
                                        <div className='pb-[8px] font-[600] '>Weight</div>
                                        <p className='text-[#4f3267] text-[14px]'>{data?.diamondWeight ? data.diamondWeight.weight : "Not Updated"} </p>
                                    </div>
                                    <div className='w-[200px] bg-[#fff9f5] mr-[1.5px] px-[10px] py-[10px]'>
                                        <div className='pb-[8px] font-[600] '>Quality</div>
                                        <p className='text-[#4f3267] text-[14px]'>{data?.diamondWeight ? data.diamondWeight.quality : " GH-VS"}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-[#fff3e9] w-[320px] font-Poppins mb-3">
                                <div className="t1sec px-[12.5px] py-[16px] gap-2 flex items-center">
                                    <span><RxDimensions /></span>
                                    <span className='font-[500]'>Dimension</span>
                                </div>
                                <div className="tsec2 flex font-Poppins">
                                    <div className='w-[200px] bg-[#fff9f5] mr-[1.5px] px-[10px] py-[10px]'>
                                        <div className='pb-[8px] font-[600] '>Height</div>
                                        <p className='text-[#4f3267] text-[14px]'> {data?.dimension ? data.dimension.height : "Not Updated"}</p>
                                    </div>
                                    <div className='w-[200px] bg-[#fff9f5] mr-[1.5px] px-[10px] py-[10px]'>
                                        <div className='pb-[8px] font-[600] '>Width</div>
                                        <p className='text-[#4f3267] text-[14px]'>{data?.dimension ? data.dimension.width : "Not Updated"} </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-[#fff3e9] w-[320px] font-Poppins mb-3">
                                <div className="t1sec px-[12.5px] py-[16px] gap-2 flex items-center">
                                    <span><GiHeartNecklace /></span>
                                    <span className='font-[500]'>Chain </span>
                                </div>
                                <div className="tsec2 flex font-Poppins">
                                    <div className='w-[200px] bg-[#fff9f5] mr-[1.5px] px-[10px] py-[10px]'>
                                        <div className='pb-[8px] font-[600] '>Length</div>
                                        <p className='text-[#4f3267] text-[14px]'>13 inch</p>
                                    </div>
                                    <div className='w-[200px] bg-[#fff9f5] mr-[1.5px] px-[10px] py-[10px]'>
                                        <div className='pb-[8px] font-[600] '>Weight</div>
                                        <p className='text-[#4f3267] text-[14px]'> 1gm </p>
                                    </div>
                                </div>
                            </div>

                        </div>
                        {/* table section */}




                        <div className="bg-[#fff3e9] w-full font-Poppins mb-3">
                            <Accordion >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    <div className="t1sec px-[12.5px] py-[16px] gap-2 flex items-center">
                                        <span><MdFeaturedPlayList /></span>
                                        <span className='font-[500]'>Features</span>
                                    </div>
                                </AccordionSummary>
                                <AccordionDetails className="bg-[#fff9f5]">
                                    <div className="tsec2 flex flex-col font-Poppins">
                                        <div className='w-[320px] bg-[#fff9f5] mb-[1.5px] px-[10px] py-[10px] flex gap-[10px] items-center '>
                                            <div className='font-[500] '><GiMaterialsScience /></div>
                                            <p className='text-[#4f3267] text-[15px]'> Hypoallergenic Material</p>
                                        </div>
                                        <div className='w-[320px] bg-[#fff9f5] mb-[1.5px] px-[10px] py-[10px] flex gap-[10px] items-center'>
                                            <div className='font-[500] '><MdHealthAndSafety /></div>
                                            <p className='text-[#4f3267] text-[15px]'>Quality and Safety First</p>
                                        </div>
                                        <div className='w-[320px] bg-[#fff9f5] mb-[1.5px] px-[10px] py-[10px] flex gap-[10px] items-center'>
                                            <div className='font-[500] '><FaChild /></div>
                                            <p className='text-[#4f3267] text-[15px]'>Age-Appropriate Styles</p>
                                        </div>
                                        <div className='w-[320px] bg-[#fff9f5] mb-[1.5px] px-[10px] py-[10px] flex gap-[10px] items-center'>
                                            <div className='font-[500] '><GiHeartNecklace /></div>
                                            <p className='text-[#4f3267] text-[15px]'>Everyday Use Jewellery</p>
                                        </div>
                                        <div className='w-[320px] bg-[#fff9f5] mb-[1.5px] px-[10px] py-[10px] flex gap-[10px] items-center'>
                                            <div className='font-[500] '><TbBrandMinecraft /></div>
                                            <p className='text-[#4f3267] text-[15px]'>Crafted with Love</p>
                                        </div>
                                        <div className='w-[320px] bg-[#fff9f5] mb-[1.5px] px-[10px] py-[10px] flex gap-[10px] items-center'>
                                            <div className='font-[500] '><TbCertificate /></div>
                                            <p className='text-[#4f3267] text-[14px]'>Natural Diamonds with SGL Certificate</p>
                                        </div>
                                        <div className='w-[320px] bg-[#fff9f5] mb-[1.5px] px-[10px] py-[10px] flex gap-[10px] items-center'>
                                            <div className='font-[500] '><MdOutlineAppRegistration /></div>
                                            <p className='text-[#4f3267] text-[15px]'>Design Registration No. 417519-003</p>
                                        </div>




                                    </div>
                                </AccordionDetails>
                            </Accordion>


                        </div>



                        <div className="w-full mt-3 moreinfoproduct bg-white rounded-lg shadow-sm">
                            <div className="moreinfosec py-[20px] flex flex-wrap justify-center gap-4 md:gap-10">
                                <div className="flex flex-col justify-center items-center text-center w-1/2 md:w-auto">
                                    <span className="flex justify-center">
                                        <span
                                            className="w-[50px] h-[50px] flex justify-center items-center"
                                            style={{ backgroundColor: '#e8ffda', borderRadius: '50%' }}
                                        >
                                            <MdOutlineVerified size={25} />
                                        </span>
                                    </span>
                                    <span className="font-Poppins text-[1rem]">
                                        100% Certified
                                    </span>
                                </div>

                                <div className="flex flex-col justify-center items-center text-center w-1/2 md:w-auto">
                                    <span className="flex justify-center">
                                        <span
                                            className="w-[50px] h-[50px] flex justify-center items-center"
                                            style={{ backgroundColor: '#dbecff', borderRadius: '50%' }}
                                        >
                                            <RiRefund2Line size={25} />
                                        </span>
                                    </span>
                                    <span className="font-Poppins text-[1rem]">
                                        7 Days Money-Back
                                    </span>
                                </div>

                                <div className="flex flex-col justify-center items-center text-center w-1/2 md:w-auto">
                                    <span className="flex justify-center">
                                        <span
                                            className="w-[50px] h-[50px] flex justify-center items-center"
                                            style={{ backgroundColor: '#fff9ca', borderRadius: '50%' }}
                                        >
                                            <RiExchangeFundsLine size={25} />
                                        </span>
                                    </span>
                                    <span className="font-Poppins text-[1rem]">
                                        Lifetime Exchange
                                    </span>
                                </div>

                                <div className="flex flex-col justify-center items-center text-center w-1/2 md:w-auto">
                                    <span className="flex justify-center items-center">
                                        <span
                                            className="w-[50px] h-[50px] flex justify-center items-center"
                                            style={{ backgroundColor: '#ffe1e3', borderRadius: '50%' }}
                                        >
                                            <CiCalendarDate size={25} />
                                        </span>
                                    </span>
                                    <span className="font-Poppins text-[1rem]">
                                        One Year Warranty
                                    </span>
                                </div>
                            </div>

                            <p className="text-center text-[15px] font-[300] pb-4 font-Poppins text-[#333] mt-3">
                                Learn more about our{' '}
                                <Link className="text-[#4d9dbd]" to="/terms-and-conditions">
                                    TERMS & POLICIES
                                </Link>
                            </p>
                        </div>

                    </>
                    : null
            }


            {
                active === 2
                    ?
                    <div className='w-full  min-h-[40vh] flex flex-col items-center py-3 overflow-y-scroll'>
                        {
                            data && data.reviews.map((item, index) => (
                                <div key={index} className='w-full flex my-2'>
                                    <img src={`${backend_url}/${item.user.avatar}`} className='w-[60px] h-[60px] rounded-full' alt="" />

                                    <div className='pl-3'>
                                        <h1 className='font-[500] capitalize'>{item.user.name}</h1>
                                        <Ratings rating={data?.ratings} />
                                        <div className='w-full flex mt-2 gap-4'>

                                            <img src={review1img} alt="" className='w-[200px] h-[200px] border object-fill shadow rounded-[5px]' />
                                            <img src={review2img} alt="" className='w-[200px] h-[200px] border object-fill shadow rounded-[5px]' />
                                        </div>
                                        <p className='w-[60%] mt-3'>{item.comment}</p>

                                    </div>


                                </div>
                            ))
                        }

                        <div className="w-full flex  justify-center">
                            {
                                data && data.reviews.length === 0 && (
                                    <h5>No Reviews have for this product</h5>
                                )
                            }


                        </div>
                    </div>
                    :
                    null
            }




        </div>



    )
}
export default ProductDetails

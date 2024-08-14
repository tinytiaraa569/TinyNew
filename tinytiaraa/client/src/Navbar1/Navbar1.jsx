import React, { useState } from 'react'
import './Navbar1.css'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaRegHeart, FaRegUser, FaSearch } from 'react-icons/fa';
import { MdChevronRight, MdOutlineKeyboardArrowRight, MdOutlineShoppingBag } from 'react-icons/md';
import navimg from './about.jpg'
import { categoriesData } from '@/static/data';
import styles from '@/Styles/styles';
import Wishlist from '../Wishlist/Wishlist.jsx'
import { useSelector } from 'react-redux';
import Badge from '@mui/material/Badge';

import { AiOutlineHeart } from 'react-icons/ai';
import { CgProfile, CgSearch } from 'react-icons/cg';
import { BiMenuAltLeft } from 'react-icons/bi';
import { RxCross1 } from 'react-icons/rx';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import DropDown from '@/Navbar/DropDown';
import { backend_url } from '@/server';
import { LuUserCircle2 } from 'react-icons/lu';
import { usePriceRange } from '@/pricerange/PriceRangeContext';
import logo from './logo.png'


function Navbar1() {
    const [isShopDropdownOpen, setShopDropdownOpen] = useState(false);
    const { wishlist } = useSelector((state) => state.wishlist)
    const { isAuthenticated, user, loading } = useSelector((state) => state.user)
    const { products } = useSelector((state) => state.products)

    const { cart } = useSelector((state) => state.cart)

    const [active, setActive] = useState(false);

    const [openWishlist, setOpenWishlist] = useState(false)
    const [bars, setbars] = useState(false)
    const [open, setOpen] = useState(false)

    const [dropDown, setDropDown] = useState(false)
    window.addEventListener("scroll", () => {
        if (window.scrollY > 70) {
            setActive(true);
        } else {
            setActive(false);
        }
    });

    const [searchTerm, setsearchTerm] = useState("")
    const [searchData, setsearchData] = useState(null)


    const { setPriceRange } = usePriceRange();
    const handlePriceFilter = (min, max) => {
        setPriceRange([min, max]);
    };

    const buildQueryString = (min, max) => {
        return `?priceMin=${min}&priceMax=${max}`;
    };
    const navigate = useNavigate()
    const submitHandle = (i) => {
        navigate(`/products?category=${i.title}`)
        // window.location.reload()
        setShopDropdownOpen(false);

    }
    const toggleShopDropdown = () => {
        setShopDropdownOpen((prevState) => !prevState);
    };

    var settings = {
        dots: false,
        infinite: true,
        speed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 2000,
        swipeToSlide: true,
        fade: true,
    };
    const handleSearchChange = (e) => {
        const term = e.target.value
        setsearchTerm(term)

        const filteredProducts = products && products.filter((product) => {
            return product.name.toLowerCase().includes(term.toLowerCase())

        })
        setsearchData(filteredProducts)

    }

    const handleMouseEnter = () => {
        setDropDown(true);
    };

    const handleMouseLeave = () => {
        setDropDown(false);
    };

    const closenavbar = () => {
        setOpen(false);
        setbars(false);
    };

    const openclosewhislist = () => {
        setOpen(false);
        setOpenWishlist(true)
    }
    return (
        <>

            <div className="navbar1mian">
                {           /* //top nav */}
                <div className='nav1banner '>
                    <div className='customerinfo '>
                        <span>Customer Care: +91 86570 62511 |</span>
                        <span className='ml-[3px]'>care@tinytiaraa.com</span>

                    </div>

                    <div className='couponscetion w-[70%]'>
                        <Slider {...settings} >
                            <div className='text-center'>
                                <span>Get ₹500 Off On Your First Order Of ₹5000 Or More! :- Welcome500</span>

                            </div>
                            <div className='text-center'>

                                <span>Get 10% Off On Your Order above ₹5000 Or More! :- Tiny10</span>
                            </div>

                        </Slider>

                    </div>

                    <div className="social-icons ">
                        <Link to="https://www.facebook.com/profile.php?id=61552003617016">
                            <i className="fab fa-facebook" />
                        </Link>
                        <Link to="https://www.instagram.com/tiny_tiaraa/">
                            <i className="fab fa-instagram" />
                        </Link>
                        <Link to="https://web.whatsapp.com/send?phone=+91%208657062511">
                            <i className="fab fa-whatsapp" />
                        </Link>

                        <Link to="mailto:care@tinytiaraa.com">
                            <i className="fa-regular fa-envelope"></i>
                        </Link>
                    </div>

                </div>

                {/* Navbar */}

                <div className="navbar1">
                    <div className="mobileresp" onClick={() => { setbars(!bars) }}>
                        {
                            bars ?
                                <i className="fa-solid fa-xmark"></i>
                                :
                                <i className="fa-solid fa-bars"></i>
                        }
                    </div>
                    <div className='w-[45%] '>
                        <ul className='menu'>
                            <li><NavLink to="/" activeClassName="active">Home</NavLink></li>
                            <li><NavLink to="/about" activeClassName="active">Our Story</NavLink></li>
                            <span className=' parenthover' >
                                <li ><NavLink to="/shop" activeClassName="active">Shop</NavLink>

                                    <div className='shopdrop shadow-sm`'>
                                        <div className='flex gap-5'>

                                            <div className='navshopimg mt-5 ml-10'>
                                                <img src={navimg} alt="" className='shadow' />
                                            </div>


                                            <div className='mt-5 ml-4'>
                                                <div className='mb-2'>
                                                    <h3 className='font-[500]'>Shop Now</h3>
                                                </div>

                                                <h6 className='pb-2 collectionnav1' onClick={() => { navigate("/products") }}>Gold</h6>
                                                <h6 className='pb-2 collectionnav1'>Silver</h6>



                                            </div>

                                            <div className='mt-5 ml-6'>
                                                <div className='borderright'>
                                                    <div className='mb-2'>
                                                        <h3 className='font-[500]'>Collection</h3>
                                                    </div>

                                                    <h6 className='pb-2 collectionnav1'>Baby (0-3 Yrs)</h6>
                                                    <h6 className='pb-2 collectionnav1'>Kids (3-10 Yrs)</h6>
                                                    <h6 className='pb-2 collectionnav1'>Teens</h6>
                                                    <h6 className='pb-2 collectionnav1'>Mom & Me <span className='text-[red]'> | New</span></h6>
                                                    <h6 className='pb-2 collectionnav1'>Customization</h6>
                                                    <h6 className='pb-2 collectionnav1'>Gifts</h6>
                                                    <h6 className='pb-2 collectionnav1'>Gallery </h6>
                                                    <h6 className='pb-2 collectionnav1'>Media</h6>



                                                </div>


                                            </div>


                                            <div className='mt-5 ml-7'>
                                                <div className='mb-2 '>
                                                    <h3 className='font-[500]'>By Category</h3>
                                                </div>
                                                <div>
                                                    {
                                                        categoriesData && categoriesData.map((i, index) => {
                                                            // console.log(i.subcategories)
                                                            return (
                                                                <>
                                                                    <div key={index} className={`subcatmain ${styles.noramlFlex} relative`} onClick={() => { submitHandle(i) }}>
                                                                        <img src={i.image_Url} alt="" style={{ width: "35px", height: "45px", objectFit: "contain", userSelect: "none" }} />
                                                                        <h3 className='m-1 cursor-pointer select-none font-Poppins hover:text-[#1BB8E5]'>{i.title}</h3>


                                                                        <div className={`subcatchild top-3 left-[100%]  pb-4 w-[250px] bg-[#fff] absolute z-30 rounded-b-md shadow-sm`}>
                                                                            {
                                                                                i.subcategories.map((val) => {
                                                                                    return (
                                                                                        <div>
                                                                                            <h3 className='m-3 cursor-pointer select-none font-Poppins hover:text-[#1BB8E5]'>{val.name}</h3>
                                                                                        </div>
                                                                                    )

                                                                                })
                                                                            }
                                                                        </div>
                                                                    </div>


                                                                </>
                                                            )

                                                        })
                                                    }
                                                </div>


                                            </div>


                                            <div className='mt-5 ml-4'>
                                                <div className='mb-2'>
                                                    <h3 className='font-[500] text-black'>By Price</h3>
                                                </div>

                                                <Link
                                                    to={`/products${buildQueryString(0, 5000)}`}
                                                    className='pb-2 collectionnav1 text-white'
                                                >
                                                    Jewelry Under ₹ 5000
                                                </Link>
                                                <Link
                                                    to={`/products${buildQueryString(0, 10000)}`}
                                                    className='pb-2 collectionnav1 text-white'
                                                >
                                                    Jewelry Under ₹ 10000
                                                </Link>
                                                <Link
                                                    to={`/products${buildQueryString(0, 20000)}`}
                                                    className='pb-2 collectionnav1 text-white'
                                                >
                                                    Jewelry Under ₹ 20000
                                                </Link>
                                                <Link
                                                    to={`/products${buildQueryString(0, 30000)}`}
                                                    className='pb-2 collectionnav1 text-white'
                                                >
                                                    Jewelry Under ₹ 30000
                                                </Link>
                                            </div>
                                        </div>

                                    </div>

                                </li>
                            </span>
                            <li><NavLink to="/personalised-prosperity" activeClassName="active">Customization</NavLink></li>
                            <li><NavLink to="/contacts" activeClassName="active">Contact Us</NavLink></li>
                        </ul>
                    </div>
                    <div className='w-[55%] flex justify-between'>


                        <div>
                            <div className="logo py-1" onClick={() => navigate("/")}>
                                <img src={logo} alt="" />
                            </div>
                        </div>


                        <div className='flex gap-[10px] items-center'>
                            <div className={`${styles.noramlFlex}`}>
                                <div className="relative cursor-pointer mr-[2px]">
                                    {/* <FaSearch size={23} className='iconnav' /> */}
                                    <CgSearch size={28} className='mt-1' />
                                </div>
                            </div>


                            {/* wishlist */}
                            <div className={`${styles.noramlFlex}`}>
                                <div
                                    className="relative cursor-pointer mr-[2px]"
                                    onClick={() => setOpenWishlist(true)}

                                >
                                    <Badge badgeContent={wishlist && wishlist.length} color="primary">
                                        <AiOutlineHeart size={28} />
                                    </Badge>

                                </div>
                            </div>
                            {
                                openWishlist ?
                                    (
                                        <Wishlist setOpenWishlist={setOpenWishlist} />
                                    )
                                    :
                                    null
                            }


                            <div className={`${styles.noramlFlex}`}>
                                <div
                                    className="relative cursor-pointer mr-[2px]"

                                >
                                    {
                                        isAuthenticated ?
                                            (
                                                <Link to="/profile">
                                                    {/* <CgProfile size={30} /> */}
                                                    <LuUserCircle2 size={28} />

                                                    {/* <img className='w-[35px] h-[35px] rounded-full' src={`${backend_url}${user.avatar}`} alt="" /> */}
                                                </Link>
                                            )
                                            :
                                            (
                                                <Link to="/login">
                                                    <LuUserCircle2 size={28} />

                                                    {/* <CgProfile size={30} /> */}
                                                </Link>)
                                    }


                                </div>
                            </div>

                            <div onClick={() => {
                                navigate("/cart")

                            }}>
                                <Badge badgeContent={cart && cart.length} color="primary" badgeContentClassName="custom-badge-content">
                                    <MdOutlineShoppingBag size={26} className='iconnav' />
                                </Badge>



                            </div>

                            <div>

                            </div>



                        </div>
                    </div>

                </div>

            </div>


            {/* Mobile Navbar */}
            <div
                className={`mobile-nav  ${active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
                    }
      w-full h-[70px] bg-[#fff] z-50 top-0 left-0 shadow-sm 800px:hidden`}
            >
                <div className="w-full flex items-center justify-between">
                    <div>
                        <BiMenuAltLeft size={40} className='ml-4' onClick={() => setOpen(true)} />
                    </div>

                    <div className="logo pt-2" onClick={() => {
                        setbars(false)
                        navigate("/")
                    }} >
                        <img className='w-[150px] h-[60px] object-contain' src="https://lirp.cdn-website.com/48f148a6/dms3rep/multi/opt/Tiny+Tiaraa_C5-1920w.png" alt="" />
                    </div>

                    <div>
                        <div onClick={() => {
                            closenavbar()
                            navigate("/cart")

                        }} className='mr-[20px]'>

                            <i className="fa-solid fa-cart-shopping text-[25px]" ></i>


                        </div>

                    </div>

                </div>


                {/* navbar sidebar */}

                {
                    open && (
                        <div className='fixed w-full bg-[#0000005f] z-[20] h-full top-0 left-0'>
                            <div className='fixed w-[60%] bg-[white] h-screen top-0 left-0 z-10'>
                                <div className="w-full justify-between flex pr-3">
                                    <div>



                                        <div className="mt-5 ml-5 mr-[15px]" onClick={() => openclosewhislist()}>
                                            <Badge badgeContent={wishlist && wishlist.length} color="primary">
                                                <AiOutlineHeart size={30} />
                                            </Badge>

                                        </div>
                                        {openWishlist ? <Wishlist setOpenWishlist={setOpenWishlist} /> : null}
                                    </div>
                                    <RxCross1 size={30} className='ml-4 mt-5' onClick={() => setOpen(false)} />

                                </div>

                                <div className='my-8 w-[92%] m-auto h-[40px]'>
                                    <input type="search" placeholder='Search Product..' className='h-[40px] w-full border-[#000] border-[2px] px-2 rounded-md' value={searchTerm} onChange={handleSearchChange} />

                                    {
                                        searchData && searchData.length !== 0 ?
                                            (
                                                <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4">
                                                    {
                                                        searchData && searchData.map((i, index) => {
                                                            const d = i.name;
                                                            const Product_name = d.replace(/\s+/g, "-")
                                                            return (
                                                                <>
                                                                    <Link to={`/product/${Product_name}`}>
                                                                        <div className="w-full flex items-center pb-3 overflow-hidden">
                                                                            <img src={i.image_Url[0].url} alt="" className='w-[60px] h-[50px] mr-[10px] scale-150 object-contain' />
                                                                            <p className='font-Poppins text-[15px]'>{i.name}</p>
                                                                        </div>
                                                                    </Link>
                                                                </>
                                                            )

                                                        })
                                                    }

                                                </div>
                                            ) :
                                            null
                                    }

                                </div>


                                <div className="mobilenavigation font-Poppins flex justify-start pl-6 ">
                                    <ul className={`flex flex-col gap-10  ${bars ? "menuopen menu" : "menu"}`}  >

                                        <li><NavLink to="/" onClick={closenavbar} activeClassName="active">Home</NavLink></li>
                                        <li><NavLink to="/about" onClick={closenavbar} activeClassName="active">About</NavLink></li>
                                        <li className='relative parenthover' >
                                            <NavLink to="/shop" onClick={closenavbar} activeClassName="active">Products</NavLink>
                                            {
                                                dropDown ?
                                                    <IoIosArrowUp
                                                        size={20}
                                                        className="absolute right-0 top-0 cursor-pointer"
                                                    // onClick={() => setDropDown(!dropDown)}
                                                    />

                                                    :

                                                    <IoIosArrowDown
                                                        size={20}
                                                        className="absolute right-0 top-0 cursor-pointer"
                                                    // onClick={() => setDropDown(!dropDown)}
                                                    />

                                            }

                                            {/* {
    dropDown ? (
        <DropDown
            categoriesData={categoriesData}
            setDropDown={setDropDown}
        />

    ) :
        null
} */}
                                            <ul className='productnavmaincategory w-[150px] pb-4 bg-[#fff] mt-5 z-30 rounded-b-md shadow-sm'  >
                                                <li className='relative pb-2' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} >
                                                    <span className='flex justify-between items-center '>
                                                        <Link href="">18 KT Diamond</Link>
                                                        <MdOutlineKeyboardArrowRight />
                                                    </span>
                                                    <ul className='absolute top-0 left-[97%] chngcat'>

                                                        <li className='py-2'>

                                                            {
                                                                dropDown ? (
                                                                    <DropDown
                                                                        categoriesData={categoriesData}
                                                                        setDropDown={setDropDown}
                                                                    />

                                                                ) :
                                                                    null
                                                            }
                                                        </li>
                                                    </ul>




                                                </li>

                                            </ul>



                                        </li>
                                        <li><NavLink to="/personalised-prosperity" onClick={closenavbar} activeClassName="active">Customized Jewellery</NavLink></li>
                                        <li><Link to="/contacts" onClick={closenavbar} activeClassName="active">Contact</Link></li>
                                    </ul>
                                </div>

                                <div className="flex w-full justify-center mt-6">
                                    {
                                        isAuthenticated ?
                                            <>
                                                <div className='flex flex-col items-center mt-6 font-Poppins'>
                                                    <img className='w-[50px] h-[50px] rounded-full' src={`${backend_url}${user.avatar}`} alt="" />
                                                    <h3 className='capitalize font-[500]'>{user.name}</h3>
                                                </div>

                                            </>

                                            :
                                            <>
                                                <Link to="/login" onClick={closenavbar} className='text-[18px] font-Poppins pr-[10px]'>Login /</Link>
                                                <Link to="/sign-up" onClick={closenavbar} className='text-[18px] font-Poppins'>Sign Up</Link>


                                            </>



                                    }
                                </div>





                            </div>

                        </div>
                    )
                }




            </div>

        </>
    )
}

export default Navbar1

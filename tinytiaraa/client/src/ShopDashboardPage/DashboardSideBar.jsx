import React, { useState } from 'react'
import { FiPackage, FiShoppingBag } from 'react-icons/fi'
import { RxDashboard } from 'react-icons/rx'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { MdOutlineAddBusiness, MdOutlineContactPhone, MdOutlinePriceChange } from "react-icons/md";
import { MdOutlineLocalOffer } from "react-icons/md";
import { VscNewFile } from "react-icons/vsc";
import { BiCustomize, BiSolidOffer } from "react-icons/bi";
import { BiMessageDetail } from "react-icons/bi";
import { RiRefund2Line } from "react-icons/ri";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa";
import { FaMoneyCheckAlt } from "react-icons/fa";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"

import { BiCategory } from "react-icons/bi";
import { TbCategoryPlus, TbUsersGroup } from "react-icons/tb";
import { IoIosOptions } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa";
import { PiSpinnerBallDuotone } from "react-icons/pi";
import { TbLibraryPhoto } from "react-icons/tb";


function DashboardSideBar({ active }) {

    const [openMenu,setOpenMenu] =useState(false)
    const [activeLink, setActiveLink] = useState(null); // Track the selected link
    const navigate = useNavigate()
    const location = useLocation(); // Get the current location object
    const currentPath = location.pathname; // Get the current path
    const cataloglinks = [
        {
            title: "Banner",
            href: '/create-Banners',
            icon:<TbLibraryPhoto />
        },
        {
            title: "Category",
            href: '/create-category',
            icon:<BiCategory />
        }
        
       
    ]

    const handleToggleMenu = (index) => {
        // Set the openMenuIndex to the clicked index or null if it's already open
        setOpenMenu(openMenu === index ? null : index);
    };

    function handlemove(url){
        navigate(url)
    }

    console.log(openMenu,"open menu stte ")

    return (
        <div className='w-full h-auto md:h-[auto] bg-white shadow-sm sticky top-0 left-0 z-10'>
            <div className="w-full flex items-center p-4 mt-4 ">
                <Link to="/dashboard" className='w-full flex items-center justify-center flex-col md:flex-row md:justify-start ' >
                    <RxDashboard size={30} color={`${active === 1 ? "#3d9bc0" : "#555"}`} />
                    <h5 className={`pl-2 text-[15px]  md:text-[18px]   font-400 ${active === 1 ? "text-[#3d9bc0]  font-600" : "text-[#555]"} font-Poppins`}>DashBoard</h5>

                </Link>
            </div>
            {/* <div className="w-full flex items-center p-4">
            <Link href="" className='w-full flex items-center justify-center flex-col md:flex-row md:justify-start '>
                <FiShoppingBag size={30} color={`${active === 2 ? "#3d9bc0" : "#555" }`}/>
                <h5 className={`pl-2 text-[18px]   text-center font-[400] ${active === 2 ? "text-[#3d9bc0] " :"text-[#555]"} font-Poppins`}>All Orders</h5>
            </Link>
        </div> */}
            <Collapsible>
                <div className="w-full flex items-center p-4">
                    <Link href="" className='w-full flex items-center justify-center flex-col md:flex-row md:justify-start '>
                        <CollapsibleTrigger className='w-full flex items-center justify-center flex-col md:flex-row md:justify-start ' onClick={()=>{setOpenMenu(!openMenu)}}>
                            <FiShoppingBag size={30} color={`${active === 2 ? "#3d9bc0" : "#555"}`} />
                            <h5 className={`pl-2 text-[18px]   text-center font-[400] ${active === 2 ? "text-[#3d9bc0] " : "text-[#555]"} font-Poppins`}>catalog</h5>
                            {
                                openMenu ? 
                                <FaAngleDown  size={20} color='#555' className='ml-7' />
                                :
                                <FaAngleRight size={20} color='#555' className='ml-7' />

                            }
                        </CollapsibleTrigger>
                    </Link>

                </div>
                {
                    openMenu && (
                        <CollapsibleContent className='w-full flex items-center flex-col md:flex-row md:justify-start'>
             
                    <div className="w-full flex flex-col pl-6"  >
                    
                    {cataloglinks.map((item, i) => (
                        <div key={i} className="pb-2"  onClick={()=>{handlemove(item.href)}}>
                        <span
                           
                            className={`cursor-pointer w-full flex items-center justify-center flex-col md:flex-row md:justify-start ${
                            currentPath === item.href ? 'text-[#3d9bc0]' : 'text-[#555]' // Highlight the active link
                            }`}
                        >
                            <span>{item.icon}</span>
                            <h5 className={`pl-2 text-[16px] font-[400] font-Poppins`}>
                            {item.title}
                            </h5>
                        </span>
                        </div>
                    ))}
                    </div>
                 </CollapsibleContent>
                        
                    )
                }
                
            </Collapsible>

            <div className="w-full flex items-center p-4">
                <Link to="/dashboard-orders" className='w-full flex items-center justify-center flex-col md:flex-row md:justify-start '>
                    <FiPackage size={30} color={`${active === 10 ? "#3d9bc0" : "#555"}`} />
                    <h5 className={`pl-2 text-[18px] font-[400] text-center ${active === 10 ? "text-[#3d9bc0] " : "text-[#555]"} font-Poppins`}>All orders</h5>
                </Link>
            </div>

            <div className="w-full flex items-center p-4">
                <Link to="/dashboard-products" className='w-full flex items-center justify-center flex-col md:flex-row md:justify-start '>
                    <FiPackage size={30} color={`${active === 3 ? "#3d9bc0" : "#555"}`} />
                    <h5 className={`pl-2 text-[18px] font-[400] text-center ${active === 3 ? "text-[#3d9bc0] " : "text-[#555]"} font-Poppins`}>All Products</h5>
                </Link>
            </div>
            <div className="w-full flex items-center p-4">
                <Link to="/dashboard-create-product" className='w-full flex items-center justify-center flex-col md:flex-row md:justify-start '>
                    <MdOutlineAddBusiness size={30} color={`${active === 4 ? "#3d9bc0" : "#555"}`} />
                    <h5 className={`pl-2 text-[18px] text-center font-[400] ${active === 4 ? "text-[#3d9bc0] " : "text-[#555]"} font-Poppins`}>Create Product</h5>
                </Link>
            </div>
            <div className="w-full flex items-center p-4">
                <Link to="/dashboard-events" className='w-full flex items-center justify-center flex-col md:flex-row md:justify-start '>
                    <MdOutlineLocalOffer size={30} color={`${active === 5 ? "#3d9bc0" : "#555"}`} />
                    <h5 className={`pl-2 text-[18px] text-center font-[400] ${active === 5 ? "text-[#3d9bc0] " : "text-[#555]"} font-Poppins`}>All Events</h5>
                </Link>
            </div>
            <div className="w-full flex items-center p-4">
                <Link to="/dashboard-create-event" className='w-full flex items-center justify-center flex-col md:flex-row md:justify-start '>
                    <VscNewFile size={30} color={`${active === 6 ? "#3d9bc0" : "#555"}`} />
                    <h5 className={`pl-2 text-[18px] text-center font-[400] ${active === 6 ? "text-[#3d9bc0] " : "text-[#555]"} font-Poppins`}>Create Events</h5>
                </Link>
            </div>
            <div className="w-full flex items-center p-4">
                <Link to="/dashboard-coupons" className='w-full flex items-center justify-center flex-col md:flex-row md:justify-start '>
                    <BiSolidOffer size={30} color={`${active === 7 ? "#3d9bc0" : "#555"}`} />
                    <h5 className={`pl-2 text-[18px] text-center font-[400] ${active === 7 ? "text-[#3d9bc0] " : "text-[#555]"} font-Poppins`}>Coupoun</h5>
                </Link>
            </div>
           
            <div className="w-full flex items-center p-4">
                <Link to="/dashboard-refunds" className='w-full flex items-center justify-center flex-col md:flex-row md:justify-start '>
                    <RiRefund2Line size={30} color={`${active === 8 ? "#3d9bc0" : "#555"}`} />
                    <h5 className={`pl-2 text-[18px] font-[400] ${active === 8 ? "text-[#3d9bc0] " : "text-[#555]"} font-Poppins`}>Refunds</h5>
                </Link>
            </div>
            <div className="w-full flex items-center p-4">
                <Link to="/dashboard-messages" className='w-full flex items-center justify-center flex-col md:flex-row md:justify-start '>
                    <BiMessageDetail size={30} color={`${active === 9 ? "#3d9bc0" : "#555"}`} />
                    <h5 className={`pl-2 text-[18px] font-[400] ${active === 9 ? "text-[#3d9bc0] " : "text-[#555]"} font-Poppins`}>Message Inbox</h5>
                </Link>
            </div>
            <div className="w-full flex items-center p-4">
                <Link to="/dashboard-referral" className='w-full flex items-center justify-center flex-col md:flex-row md:justify-start '>
                    <FaPeopleGroup size={30} color={`${active === 11 ? "#3d9bc0" : "#555"}`} />
                    <h5 className={`pl-2 text-[18px] font-[400] ${active ===11 ? "text-[#3d9bc0] " : "text-[#555]"} font-Poppins`}>Affiliate Status</h5>
                </Link>
            </div>

            <div className="w-full flex items-center p-4">
                <Link to="/dashboard-requests" className='w-full flex items-center justify-center flex-col md:flex-row md:justify-start '>
                    <BiCustomize  size={28} color={`${active === 12 ? "#3d9bc0" : "#555"}`} />
                    <h5 className={`pl-2 text-[16px] font-[400] ${active ===12 ? "text-[#3d9bc0] " : "text-[#555]"} font-Poppins`}>Customization Requests</h5>
                </Link>
            </div>
            <div className="w-full flex items-center p-4">
                <Link to="/dashboard-Contactus" className='w-full flex items-center justify-center flex-col md:flex-row md:justify-start '>
                <MdOutlineContactPhone  size={30} color={`${active === 13 ? "#3d9bc0" : "#555"}`} />
                    <h5 className={`pl-2 text-[18px] font-[400] ${active ===13 ? "text-[#3d9bc0] " : "text-[#555]"} font-Poppins`}>Contact Requests</h5>
                </Link>
            </div>

            <div className="w-full flex items-center p-4">
                <Link to="/dashboard-ratecard" className='w-full flex items-center justify-center flex-col md:flex-row md:justify-start '>
                <MdOutlinePriceChange  size={30} color={`${active === 14 ? "#3d9bc0" : "#555"}`} />
                    <h5 className={`pl-2 text-[18px] font-[400] ${active ===14 ? "text-[#3d9bc0] " : "text-[#555]"} font-Poppins`}>Rate Card</h5>
                </Link>
            </div>


            <div className="w-full flex items-center p-4">
                <Link to="/dashboard-allusers" className='w-full flex items-center justify-center flex-col md:flex-row md:justify-start '>
                <TbUsersGroup  size={30} color={`${active === 15 ? "#3d9bc0" : "#555"}`} />
                    <h5 className={`pl-2 text-[18px] font-[400] ${active ===15 ? "text-[#3d9bc0] " : "text-[#555]"} font-Poppins`}>All Users</h5>
                </Link>
            </div>

            <div className="w-full flex items-center p-4">
                <Link to="/dashboard-allspin" className='w-full flex items-center justify-center flex-col md:flex-row md:justify-start '>
                <PiSpinnerBallDuotone size={30} color={`${active === 16 ? "#3d9bc0" : "#555"}`} />
                    <h5 className={`pl-2 text-[18px] font-[400] ${active ===16 ? "text-[#3d9bc0] " : "text-[#555]"} font-Poppins`}>Spin Data</h5>
                </Link>
            </div>

            <div className="w-full flex items-center p-4">
                <Link to="/dashboard-currency" className='w-full flex items-center justify-center flex-col md:flex-row md:justify-start '>
                <FaMoneyCheckAlt  size={30} color={`${active === 17 ? "#3d9bc0" : "#555"}`} />
                    <h5 className={`pl-2 text-[18px] font-[400] ${active ===17 ? "text-[#3d9bc0] " : "text-[#555]"} font-Poppins`}>Currency Conversion</h5>
                </Link>
            </div>



        </div>
    )
}

export default DashboardSideBar
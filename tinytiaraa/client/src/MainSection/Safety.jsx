import React from 'react';
import { FaUserPlus, FaLink, FaShareAlt, FaGift } from 'react-icons/fa';
import './Safety.css'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import referbanner from './referbanner.png'

const Safety = () => {
  const { isAuthenticated, user, loading } = useSelector((state) => state.user)
  const navigate = useNavigate()


  return (
    <>

      <div className='referbanner'>
        <div>
          <h1>Referral Program</h1>
          <p>Here's how to spread the cheer</p>
          <div className='referbannerimg'>
            <img src={referbanner} alt="" />

            <div className='refrbannercontenttext'>
              <p>Invite your friends to shop at Tiny Tiaraa and give them a special 5% discount on their first purchase. As a thank you, you'll earn rewards upto5 % off</p>
              <button  onClick={() => { isAuthenticated ? navigate("/referrals") : navigate("/sign-up") }}>Join us</button>

            </div>

          </div>
        </div>

      </div>




      <div className="safetbg flex flex-col items-center pt-5 pb-10 rounded-lg shadow-xl text-black">
        {/* <h2 className="text-4xl font-extrabold mb-12 ">Referral Program</h2> */}
        <div className="flex flex-wrap gap-10 justify-center w-full max-w-7xl">
          {/* Step 1: Sign Up */}
          

          <div className='refermainbox flex flex-col items-center' onClick={() => { isAuthenticated ? navigate("/referrals") : navigate("/sign-up") }}>
            <div className="refergreen h-full bg-white text-[#01463A] hover:shadow-2xl transform transition duration-300 hover:scale-105">
              <div className="w-20 h-20 flex items-center justify-center bg-[#5DC2B0] text-[#012D25] rounded-full mb-4 mx-auto">
              <FaUserPlus size={40} />
              </div>
              <h3 className="text-2xl font-[400] text-center">Sign Up</h3>

              <div className='referround mt-9'>
                <p className="text-center text-[#000000]">
                Create an account on our platform to get started & Earn.
                </p>

              </div>

            </div>

          </div>

          {/* Step 2: Generate Link */}
          

          <div className='refermainbox flex flex-col items-center'>
            <div className="refergreen h-full bg-white text-[#01463A] hover:shadow-2xl transform transition duration-300 hover:scale-105">
              <div className="w-20 h-20 flex items-center justify-center bg-[#5DC2B0] text-[#012D25] rounded-full mb-4 mx-auto">
              <FaLink size={40} />
              </div>
              <h3 className="text-2xl font-[400] text-center">Generate Link</h3>

              <div className='referround mt-9'>
                <p className="text-center text-[#000000;]">
                Generate your unique referral link from your dashboard.
                </p>

              </div>

            </div>

          </div>

          {/* Step 3: Share */}
          


          <div className='refermainbox flex flex-col items-center'>
            <div className="refergreen h-full bg-white text-[#01463A] hover:shadow-2xl transform transition duration-300 hover:scale-105">
              <div className="w-20 h-20 flex items-center justify-center bg-[#5DC2B0] text-[#012D25] rounded-full mb-4 mx-auto">
                <FaGift size={40} />
              </div>
              <h3 className="text-2xl font-[400] text-center">Share</h3>

              <div className='referround mt-9'>
                <p className="text-center text-[#000000;]">
                Share your referral link with your friends and family & Earn .
                </p>

              </div>

            </div>

          </div>

         
        {/* Step 4: Get Reward */}
          <div className='refermainbox flex flex-col items-center'>
            <div className="refergreen h-full bg-white text-[#01463A] hover:shadow-2xl transform transition duration-300 hover:scale-105">
              <div className="w-20 h-20 flex items-center justify-center bg-[#5DC2B0] text-[#012D25] rounded-full mb-4 mx-auto">
                <FaGift size={40} />
              </div>
              <h3 className="text-2xl font-[400] text-center">Get Reward</h3>

              <div className='referround mt-9'>
                <p className="text-center text-[#000000;]">
                  Earn 5% amount for each successful order placed through your link.
                </p>

              </div>

            </div>

          </div>
        </div>
      </div>


    </>
  );
};

export default Safety;

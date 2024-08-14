import React from 'react'
import "./WhyPage.css"
import img1 from './whyimages/img1.svg'
import img2 from './whyimages/img2.svg'
import img3 from './whyimages/img3.svg'
import img4 from './whyimages/img4.svg'
import img5 from './whyimages/img5.svg'
import img6 from './whyimages/img6.svg'
import img7 from './whyimages/img7.svg'




function WhyPage() {
  return (
    <div className='whypage'>
      <div className='whypagecon'>
        <h5>Why TinyTiaraa ?</h5>
        <span>Delight your little ones with our enchanting collection of kids' jewelry</span>
      </div>

      <div className='whypiconcon'>
        <div className='whypiconconflex'>
          <img src={img1} alt="" />

          <div>
            <h6>Hypoallergenic Materials</h6>
          </div>
        </div>

        <div className='whypiconconflex'>
          <img src={img2} alt="" />

          <div>
            <h6>SGL Certified Jewellery</h6>
          </div>
        </div>

        <div className='whypiconconflex'>
          <img src={img3} alt="" />

          <div>
            <h6>Crafted with Love</h6>
          </div>
        </div>

        <div className='whypiconconflex'>
          <img src={img4} alt="" />

          <div>
            <h6>Customizable Options</h6>
          </div>
        </div>

      
        <div className='whypiconconflex'>
          <img src={img5} alt="" />

          <div>
            <h6>Magical Gifting</h6>
          </div>
        </div>

        <div className='whypiconconflex'>
          <img src={img6} alt="" />

          <div>
            <h6>Age-Appropriate Styles</h6>
          </div>
        </div>
        <div className='whypiconconflex'>
          <img src={img7} alt="" />

          <div>
            <h6>Free Delivery Services</h6>
          </div>
        </div>




      </div>


    </div>
  )
}

export default WhyPage

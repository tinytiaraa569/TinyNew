import React from 'react'
import './Aboutsection5.css'
import img1 from './images/first.svg'
import img2 from './images/second.png'
import img3 from './images/third.svg'
import img4 from './images/fourth.svg'



function Aboutsection5() {
  return (
    <div className='Aboutsection5'>
      <div className='association'>
        <h3>Association</h3>
      </div>

      <div className='assocflex'>
        <div className='assocflexadjust'>

        <div className="associmgs">
            <img src={img1} alt="" />
        </div>
        <div className="associmgs">
            <img src={img2} alt="" />
        </div>
        <div className="associmgs">
            <img src={img3} alt="" />
        </div>
        <div className="associmgs">
            <img src={img4} alt="" />
        </div>
        </div>

      </div>

      <div className='sec5sub'>
        <div className='sec5flex'>
            <div>
                <h6>Sign us for more offer updates</h6>
            </div>
            <div className='sec5inp'>
                <input type="email" placeholder='Your email address' />
            </div>
            <div className='sec5inp'>
                <input type="tel" placeholder='Your mobile number' />
            </div>
            <div>
                <button>Subscribe Now</button>
            </div>

        </div>

      </div>
    </div>
  )
}

export default Aboutsection5

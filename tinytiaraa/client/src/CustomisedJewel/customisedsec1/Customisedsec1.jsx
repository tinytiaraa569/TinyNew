import React from 'react'
import './Customised1.css'
// import custombanner1 from './custombanner1.jpg'
import custombanner3 from './custombanner3.jpg'


function Customisedsec1() {
  return (
    // <div className='Customisedsec1'>
    //     {/* <div className="customisedcon1">
    //         <h1>Design Your Own Masterpiece</h1>
    //     </div> */}

    // </div>

    <div>
      <div className="slidersec sliderseccustom">
        <img loading='lazy' src="https://backend.tinytiaraa.com:8000/uploads/images/custombanner/dsnfxccnwbqplfiinopd.webp" alt="Banner promoting customizable jewelry designs for children by Tiny Tiaraa"  />

        <div className="text-overlay">
          <h1>Customize Your Own Masterpiece</h1>
        </div>
      </div>
    </div>
  )
}

export default Customisedsec1

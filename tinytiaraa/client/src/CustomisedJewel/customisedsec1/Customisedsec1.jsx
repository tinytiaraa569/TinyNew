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
        <img src={custombanner3} alt="First Slide" />

        <div className="text-overlay">
          <h1>Customize Your Own Masterpiece</h1>
        </div>
      </div>
    </div>
  )
}

export default Customisedsec1

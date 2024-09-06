import React from 'react'
import './Customised1.css'
// import custombanner1 from './custombanner1.jpg'
import custombanner2 from './custombanner2.jpg'


function Customisedsec1() {
  return (
    // <div className='Customisedsec1'>
    //     {/* <div className="customisedcon1">
    //         <h1>Design Your Own Masterpiece</h1>
    //     </div> */}

    // </div>

    <div>
      <div className="slidersec sliderseccustom">
        <img src={custombanner2} alt="First Slide" />

        <div className="text-overlay">
          <h1>Customize Your Own Masterpiece</h1>
        </div>
      </div>
    </div>
  )
}

export default Customisedsec1

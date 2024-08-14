import React from 'react'
import './Aboutsection.css'
import about1img from './images/about1.svg'
import about2img from './images/about2.svg'
import about3img from './images/about3.svg'
import about4img from './images/about4.svg'




function Aboutsecion2() {
    return (
        <div className='aboutsection2'>
            <div>
                <h1 className='text-[#01463A] font-[400] text-[40px] text-center'>Our Strengths</h1>
            </div>

            <div className="aboutcardsec">
                <div className="aboutcard flex justify-center flex-col items-center">
                    <img src={about1img} alt="" />

                    <div className='text-center'>
                        <h5>Join the Magic</h5>


                        <div className='w-[215px] h-[100px] font-[400] text-[12px] text-center'>


                            <p>Craftsmanship is our core. Every piece is meticulously handcrafted with quality materials, ensuring beauty, safety, and comfort for children.</p>

                        </div>
                    </div>
                </div>

                <div className="aboutcard flex justify-center flex-col items-center">
                    <img src={about2img} alt="" />

                    <div className='text-center'>
                        <h5>Collections</h5>


                        <div className='w-[215px] h-[100px] font-[400] text-[12px] text-center'>


                            <p>Craftsmanship is our core. Every piece is meticulously handcrafted with quality materials, ensuring beauty, safety, and comfort for children.</p>

                        </div>
                    </div>
                </div>

                <div className="aboutcard flex justify-center flex-col items-center">
                    <img src={about3img} alt="" />

                    <div className='text-center'>
                        <h5>Safety First</h5>


                        <div className='w-[215px] h-[100px] font-[400] text-[12px] text-center'>


                            <p>Craftsmanship is our core. Every piece is meticulously handcrafted with quality materials, ensuring beauty, safety, and comfort for children.</p>

                        </div>
                    </div>
                </div>

                <div className="aboutcard flex justify-center flex-col items-center">
                    <img src={about4img} alt="" />

                    <div className='text-center'>
                        <h5>Craftsmanship</h5>


                        <div className='w-[215px] h-[100px] font-[400] text-[12px] text-center'>


                            <p>Craftsmanship is our core. Every piece is meticulously handcrafted with quality materials, ensuring beauty, safety, and comfort for children.</p>

                        </div>
                    </div>
                </div>
            </div>

            
      

        </div>
    )
}

export default Aboutsecion2

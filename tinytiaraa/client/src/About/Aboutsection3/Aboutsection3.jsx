import React from 'react';
import './Aboutsection3.css';
import founderimg from './images/founderimg.jpg';

function Aboutsection3() {
    return (
        <div className='aboutsection3'>
            <div className="linemaking"></div>

            <div className="founderinfo">
                <div className='mt-[25px] mb-[25px]'>
                    <h3>Rashmi Jain - Founder</h3>
                </div>

                <div className='mainfounderinfo'>
                    <div className='founderinformaiontext'>
                        <p className='infotext1'>
                            As a mother, I've always cherished the pure joy and innocence that children bring into our lives. When I started Tiny Tiaraa, it was with a simple yet profound vision: to create a line of jewelry that would capture the magic of childhood while ensuring the highest standards of safety and quality for our little ones.
                            Tiny Tiaraa was born out of my personal journey as a parent. I wanted to offer parents like myself a collection of exquisite jewelry that not only complements the beauty of our children but also stands up to the rigors of everyday wear. Each piece is designed with love, care, and a deep understanding of what makes jewelry truly special for infants and kids.
                            From the delicate details to the use of hypoallergenic and non-toxic materials, every aspect of
                        </p>

                        <p className='infotext1 mt-6'>
                            Tiny Tiaraa reflects my commitment to creating something that both parents and children will treasure. I hope our jewelry adds a touch of sparkle to your child's journey and becomes a keepsake that you'll cherish forever.
                            Thank you for being a part of the Tiny Tiaraa family.
                        </p>

                        <p className='infotext1 mt-8'>With love and gratitude</p>
                    </div>

                    <div className="founderimg">
                        <img src={founderimg} alt="Rashmi Jain - Founder" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Aboutsection3;

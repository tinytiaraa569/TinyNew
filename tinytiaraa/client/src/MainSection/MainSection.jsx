import React from 'react'
import SliderSection from './Slider'
import Categories from './Categories'
import Shippingpage from './Shippingpage'
import WhyPage from './WhyPage'
import MorePage from './MorePage'
import Customise from './Customise'
import Safety from './Safety'
import Slidertext from './Sectionslider/Slidertext'
import CustomizedAccordions from './FreqAsk/Freq'
import Ttclub from './ttclub/Ttclub'
import NewArrivals from './newarrivals/NewArrivals'
import FollowUS from './FollowUS/FollowUS'

function MainSection() {
  return (
    <div>
      <SliderSection />
      <WhyPage />
      {/* <Shippingpage /> */}
      <Categories />
      {/* <MorePage /> */}
      <NewArrivals />
      <Customise />
      <Safety />
      <Slidertext />
      <CustomizedAccordions />
      <FollowUS />
      <Ttclub />
    </div>
  )
}

export default MainSection

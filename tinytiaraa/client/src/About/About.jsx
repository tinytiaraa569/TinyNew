import React, { useEffect } from 'react'
import Aboutwho from './Aboutsections/Aboutwho/Aboutwho'
import Aboutsecion2 from './Aboutsection2/Aboutsecion2'
import Aboutsection3 from './Aboutsection3/Aboutsection3'
import AboutSection4 from './Aboutscetion4/AboutSection4'
import Aboutsection5 from './Aboutsection5/Aboutsection5'

function About() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <div>
    <Aboutwho />
    <Aboutsecion2 />
    <Aboutsection3 />
    <AboutSection4 />
    <Aboutsection5/>
      
    </div>
  )
}

export default About

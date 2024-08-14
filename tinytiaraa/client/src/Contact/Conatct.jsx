import React, { useEffect } from 'react'
import Contactsec1 from './Contactsec1/Contactsec1'
import Contactsec2 from './Contactsec2/Contactsec2'
import Contactsec3 from './Contactsec3/Contactsec3'

function Conatct() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <div>
      <Contactsec1 />
      <Contactsec2 />
      <Contactsec3 />
    </div>
  )
}

export default Conatct

import React, { useEffect } from 'react'
import Shopscetion1 from './Shopsections/Shopscetion1'
import Categories from '@/MainSection/Categories'
import FeatureProduct from '@/MainSection/FeatureProduct/FeatureProduct'

function Shop() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div>
      <Shopscetion1 />
      <Categories />
      <FeatureProduct />
    </div>
  )
}

export default Shop

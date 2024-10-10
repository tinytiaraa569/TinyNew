import React from 'react'
import DashboardHeader from '../ShopDashboardPage/DashboardHeader'
import DashboardSideBar from '../ShopDashboardPage/DashboardSideBar'
import AllUsers from './AllUsers'

function ShopAllUsers() {
  return (
    <div>
      <DashboardHeader />
      <div className="w-full flex  justify-between">
        <div className="w-[100px] md:w-[330px] max-w-[800px] min-w-[100px]">
            <DashboardSideBar active={15} />
        </div>
        <div className="w-full justify-center flex">
           <AllUsers />
        </div>

      </div>
    </div>
  )
}

export default ShopAllUsers

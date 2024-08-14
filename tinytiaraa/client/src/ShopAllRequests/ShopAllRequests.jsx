import React from 'react'
import DashboardHeader from '../ShopDashboardPage/DashboardHeader'
import DashboardSideBar from '../ShopDashboardPage/DashboardSideBar'
import AllRequest from './AllRequest'

function ShopAllRequests() {
  return (
    <div>
      <DashboardHeader />
      <div className="w-full flex  justify-between">
        <div className="w-[100px] md:w-[330px] max-w-[800px] min-w-[100px]">
            <DashboardSideBar active={12} />
        </div>
        <div className="w-full justify-center flex">
            <AllRequest/>
        </div>

      </div>
    </div>
  )
}

export default ShopAllRequests

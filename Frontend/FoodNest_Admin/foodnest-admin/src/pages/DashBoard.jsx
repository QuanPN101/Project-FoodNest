import React from 'react'
import InfoCard from '../components/item/InforCard'
import '../assets/style/style.css'
import ReportsChart from '../components/item/ReportsChart'

function DashBoard() {
  return (
    <div>
      <main>

      <div className="pagetitle">
      <h1>Tổng quan</h1>
      
    </div>
    <section className="section dashboard">
      <div className="row">
        <div className="col-lg-12">
          <div className="row">
            <InfoCard
              icon={'bi-people'}
              count={'99,748'}
              title="Khách hàng"
              description="Tổng số khách hàng đã đăng ký"
              color={'#3B82F6'}
            />
            <InfoCard
              icon={'bi-shop'}
              count={'1,232'}
              title="Gian hàng"
              description="Tổng số gian hàng đang hoạt động"
              color={'#F97316'}
            />
            <InfoCard
              icon={'bi-bag-check'}
              count={'3,832'}
              title="Đơn hàng"
              description="Tổng số đơn hàng đã xử lý"
              color={'#8B5CF6'}
            />
          </div>
          
          <ReportsChart/>
          
        </div>
        {/* <TopSalingTable/> */}
      </div>
    </section>


      </main>
    </div>
  )
}

export default DashBoard
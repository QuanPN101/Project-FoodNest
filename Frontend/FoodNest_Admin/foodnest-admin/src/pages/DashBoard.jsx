import React, { useEffect, useState } from 'react';
import InfoCard from '../components/card/InforCard';
import '../assets/style/style.css';
import ReportsChart from '../components/item/ReportsChart';
import axios from 'axios';

function DashBoard() {
  const [data, setData] = useState({
    soDonHangDaGiao: 0,
    soGianHangHoatDong: 0,
    soKhachHang: 0
  });

  useEffect(() => {
    const fetchThongKe = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/thongke/tongquan');
        setData(response.data);
      } catch (error) {
        console.error('Lỗi khi lấy thống kê:', error.message);
        console.log('Chi tiết lỗi:', error.response?.data || error);
      }
    };

    fetchThongKe();
  }, []);

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
                  count={data.soKhachHang}
                  title="Khách hàng"
                  description="Tổng số khách hàng đã đăng ký"
                  color={'#3B82F6'}
                />
                <InfoCard
                  icon={'bi-shop'}
                  count={data.soGianHangHoatDong}
                  title="Gian hàng"
                  description="Tổng số gian hàng đang hoạt động"
                  color={'#F97316'}
                />
                <InfoCard
                  icon={'bi-bag-check'}
                  count={data.soDonHangDaGiao}
                  title="Đơn hàng"
                  description="Tổng số đơn hàng đã xử lý"
                  color={'#8B5CF6'}
                />
              </div>

              <ReportsChart />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default DashBoard;

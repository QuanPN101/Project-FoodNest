import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../components/item/PromotionList.css'; // CSS riêng để giữ style đẹp như bản gốc
import SearchBar from '../components/item/SearchBar';
import { 
  Pagination, Stack
} from '@mui/material';
import { Link } from 'react-router-dom';

const promotions = [
  {
    title: "Khuyến mãi mùa hè",
    discount: "Giảm 20%",
    time: "01/06/2025 - 30/06/2025",
    condition: "Đơn hàng tối thiểu 500,000đ",
    hours: "09:00 - 21:00",
  },
  {
    title: "Ưu đãi cuối tuần",
    discount: "Giảm 50.000đ",
    time: "05/06/2025 - 06/06/2025",
    condition: "Đơn hàng tối thiểu 300,000đ",
    hours: "10:00 - 22:00",
  },
  {
    title: "Khuyến mãi tháng 5",
    discount: "Giảm 10%",
    time: "01/05/2025 - 31/05/2025",
    condition: "Đơn hàng tối thiểu 1,000,000đ",
    hours: "08:00 - 20:00",
  },
  {
    title: "Khuyến mãi cuối năm",
    discount: "Giảm 30%",
    time: "01/12/2025 - 31/12/2025",
    condition: "Đơn hàng tối thiểu 2,000,000đ",
    hours: "12:00 - 23:00",
  },
  {
    title: "Flash sale",
    discount: "Giảm 15%",
    time: "15/05/2025 - 16/05/2025",
    condition: "Đơn hàng tối thiểu 400,000đ",
    hours: "14:00 - 18:00",
  },
  {
    title: "Ưu đãi sinh nhật",
    discount: "Giảm 100.000đ",
    time: "01/01/2025 - 31/12/2025",
    condition: "Đơn hàng tối thiểu 500,000đ",
    hours: "Cả ngày",
  },
];

const AdvertisementAndPromotion = () => {
  return (
    <div>
      <h1>
        Danh sách chương trình khuyến mãi
      </h1>
      
      <div className="row align-items-center mb-3">
        <div className="col-10" style={{margin: '0'}}>
          <SearchBar />
        </div>
        <div className="col-2 text-end" style={{ paddingTop: '10px' }}>
          <Link to="add">
            <button className="btn btn-primary w-100 btn-create">Tạo mới</button>
          </Link>
        </div>
      </div>



      <Link to='1' style={{textDecoration: 'none'}}>
        <div className="container" style={{padding: '0'}}>
        <div className="row g-3">
          {promotions.map((promo, index) => (
            <div className="col-md-4" key={index} style={{cursor: 'pointer'}}>
              <div className="card-ads p-3 h-100">
                <h5 className="card-title-ads text-primary">{promo.title}</h5>
                <p className="promo-detail"><strong>{promo.discount}</strong></p>
                <p className="promo-detail">Thời gian: {promo.time}</p>
                <p className="promo-detail">Điều kiện: {promo.condition}</p>
                <p className="promo-detail">Giờ áp dụng: {promo.hours}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      </Link>
      <Stack spacing={1} direction="row" justifyContent="flex-end" style={{ marginTop: '10px' }}>
        <Pagination count={10} variant="outlined" shape="rounded" />
      </Stack>
    </div>
  );
};

export default AdvertisementAndPromotion;

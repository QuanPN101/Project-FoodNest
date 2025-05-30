import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/item/SearchBar';
import ReusableTable from '../components/table/ReusableTable';

function ComplaintAndViolation() {
  const navigate = useNavigate();
  const [donHangs, setDonHangs] = useState([]);
  const [filteredDonHangs, setFilteredDonHangs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:8080/api/don-hang')
      .then(response => {
        const mapped = response.data.map((donHang) => ({
          id: donHang.maDonHang,
          hoTen: donHang.maNguoiDung?.hoTen || '',
          soDienThoai: donHang.maNguoiDung?.soDienThoai || '',
          diaChi: donHang.diaChiGiaoHang || '',
          ngayDat: new Date(donHang.ngayDat).toLocaleDateString('vi-VN'),
          ngayGiao: donHang.ngayGiaoHang
            ? new Date(donHang.ngayGiaoHang).toLocaleDateString('vi-VN')
            : 'Chưa giao',
          trangThai: donHang.trangThaiDonHang || '',
        }));
        setDonHangs(mapped);
        setFilteredDonHangs(mapped); // Gán ban đầu
      })
      .catch(error => {
        console.error("Lỗi khi gọi API:", error);
      })
      .finally(() => setLoading(false));
  }, []);

  const columns = [
    { label: 'Tên khách hàng', field: 'hoTen' },
    { label: 'Số điện thoại', field: 'soDienThoai' },
    { label: 'Địa chỉ', field: 'diaChi' },
    { label: 'Ngày đặt', field: 'ngayDat' },
    { label: 'Ngày giao', field: 'ngayGiao' },
    { label: 'Trạng thái', field: 'trangThai' },
  ];

  const handleSearch = (keyword) => {
    const lowerKeyword = keyword.toLowerCase();
    const filtered = donHangs.filter(dh =>
      dh.hoTen.toLowerCase().includes(lowerKeyword) ||
      dh.soDienThoai.includes(keyword)
    );
    setFilteredDonHangs(filtered);
  };

  const handleActionClick = (row) => {
    // Ví dụ chuyển sang trang chi tiết
    navigate(`/don-hang/${row.id}`);
  };

  return (
    <div>
      <h1>Danh sách đơn hàng</h1>

      <SearchBar placeholder="Tìm theo tên hoặc số điện thoại..." onSearch={handleSearch} />

      <ReusableTable
        columns={columns}
        rows={filteredDonHangs}
        loading={loading}
        onActionClick={handleActionClick}
      />
    </div>
  );
}

export default ComplaintAndViolation;

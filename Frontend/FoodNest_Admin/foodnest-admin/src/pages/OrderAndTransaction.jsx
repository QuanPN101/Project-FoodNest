import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/item/SearchBar';
import ReusableTable from '../components/table/ReusableTable';

function OrderAndTransaction() {
  const navigate = useNavigate();
  const [donHangs, setDonHangs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [page, setPage] = useState(1); // UI: 1-based
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    fetchOrders(page - 1, searchKeyword); // Backend: 0-based
  }, [page, searchKeyword]);

  const fetchOrders = async (pageIndex, keyword) => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8080/api/donhang/timkiem', {
        params: {
          page: pageIndex,
          size: 7,
          tenNguoiDung: keyword || '',
        }
      });

      const pageData = response.data;
      const mapped = (response.data.content || []).map(donHang => {
      const trangThai = donHang.trangThaiDonHang;
      let trangThaiLabel;

      switch (trangThai) {
        case 'Chờ xác nhận':
          trangThaiLabel = <span style={{ color: '#d97706', fontWeight: 'bold' }}>{trangThai}</span>; // cam
          break;
        case 'Đã gửi':
          trangThaiLabel = <span style={{ color: '#0ea5e9', fontWeight: 'bold' }}>{trangThai}</span>; // xanh dương nhạt
          break;
        case 'Đang vận chuyển':
          trangThaiLabel = <span style={{ color: '#2563eb', fontWeight: 'bold' }}>{trangThai}</span>; // xanh dương
          break;
        case 'Đã giao hàng':
          trangThaiLabel = <span style={{ color: '#16a34a', fontWeight: 'bold' }}>{trangThai}</span>; // xanh lá
          break;
        case 'Đã nhận hàng':
          trangThaiLabel = <span style={{ color: '#22c55e', fontWeight: 'bold' }}>{trangThai}</span>; // xanh lá sáng
          break;
        case 'Đã hủy':
          trangThaiLabel = <span style={{ color: '#ef4444', fontWeight: 'bold' }}>{trangThai}</span>; // đỏ
          break;
        case 'Từ chối đơn hàng':
          trangThaiLabel = <span style={{ color: '#991b1b', fontWeight: 'bold' }}>{trangThai}</span>; // đỏ đậm
          break;
        default:
          trangThaiLabel = <span style={{ color: '#6b7280' }}>{trangThai || 'Không rõ'}</span>; // xám
      }


      return {
        id: donHang.maDonHang || '',
        hoTen: donHang.maNguoiDung?.hoTen || '',
        soDienThoai: donHang.maNguoiDung?.soDienThoai || '',
        // diaChi: donHang.diaChiGiaoHang || '',
        ngayDat: new Date(donHang.ngayDat).toLocaleDateString('vi-VN'),
        ngayGiao: donHang.ngayGiaoHang
          ? new Date(donHang.ngayGiaoHang).toLocaleDateString('vi-VN')
          : 'Chưa giao',
        trangThai: trangThaiLabel,
      };
    });


      setDonHangs(mapped);
      setTotalCount(pageData.totalElements || 0);
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
      setDonHangs([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (keyword) => {
    setSearchKeyword(keyword);
    setPage(1); // reset về trang đầu
  };

  const handleActionClick = (row) => {
    navigate(`/orders/${row.id}`);
  };

  const columns = [
    { label: 'Mã đơn hàng', field: 'id' },
    { label: 'Tên khách hàng', field: 'hoTen' },
    { label: 'Số điện thoại', field: 'soDienThoai' },
    // { label: 'Địa chỉ', field: 'diaChi' },
    { label: 'Ngày đặt', field: 'ngayDat' },
    // { label: 'Ngày giao', field: 'ngayGiao' },
    { label: 'Trạng thái', field: 'trangThai' },
  ];

  return (
    <div>
      <h1>Danh sách đơn hàng</h1>

      <SearchBar placeholder="Tìm theo tên khách hàng..." onSearch={handleSearch} />

      <ReusableTable
        columns={columns}
        rows={donHangs}
        loading={loading}
        onActionClick={handleActionClick}
        pagination={{
          count: Math.ceil(totalCount / 7),
          page: page,
          onChange: (e, value) => setPage(value)
        }}
      />
    </div>
  );
}

export default OrderAndTransaction;

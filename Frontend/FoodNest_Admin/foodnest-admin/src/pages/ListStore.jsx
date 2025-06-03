import React, { useState, useEffect } from 'react';
import SearchBar from '../components/item/SearchBar';
import ReusableTable from '../components/table/ReusableTable';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ListStore() {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [storeRows, setStoreRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState('');

  const columns = [
    { label: 'Tên gian hàng', field: 'tenGianHang' },
    { label: 'Địa chỉ', field: 'diaChi' },
    { label: 'Chủ gian hàng', field: 'hoTenChuGianHang' },
    { label: 'Email', field: 'emailChuGianHang' },
    { label: 'Số điện thoại', field: 'soDienThoaiChuGianHang' },
    { label: 'Trạng thái', field: 'TrangThai' },
    { label: 'Ngày tạo', field: 'ngayTao' }
  ];

  useEffect(() => {
    fetchStores(page - 1, searchKeyword);
  }, [page, searchKeyword]);

  const fetchStores = async (pageIndex, keyword) => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8080/api/gianhang/timkiem', {
        params: {
          page: pageIndex,
          size: 7,
          keyword: keyword || ''
        }
      });

      const pageData = response.data;

      const mappedData = (pageData.content || []).map(store => ({
        maGianHang: store.maGianHang,
        tenGianHang: store.tenGianHang,
        diaChi: store.diaChi,
        hoTenChuGianHang: store.nguoiDung?.hoTen || '',
        emailChuGianHang: store.nguoiDung?.email || '',
        soDienThoaiChuGianHang: store.nguoiDung?.soDienThoai || '',
        TrangThai: store.trangThai ? 'Hoạt động' : 'Ngừng hoạt động',
        ngayTao: new Date(store.ngayTao).toLocaleDateString('vi-VN')
      }));

      setStoreRows(mappedData);
      setTotalCount(pageData.totalElements || 0);
    } catch (error) {
      console.error('Lỗi lấy dữ liệu gian hàng:', error);
      setStoreRows([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (keyword) => {
    setSearchKeyword(keyword);
    setPage(1);
  };

  const handleActionClick = (row) => {
    if (row.maGianHang) {
      navigate(`/ListStore/${row.maGianHang}`);
    } else {
      alert('Không tìm thấy ID gian hàng');
    }
  };

  return (
    <div>
      <h1>Danh sách gian hàng</h1>

      <SearchBar placeholder="Tìm gian hàng theo tên..." onSearch={handleSearch} />

      <ReusableTable
        columns={columns}
        rows={storeRows}
        loading={loading}
        onActionClick={handleActionClick}
        pagination={{
          count: Math.ceil(totalCount / 7), // vì size = 7
          page: page,
          onChange: (e, value) => setPage(value)
        }}
      />
    </div>
  );
}

export default ListStore;

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
    { label: 'Tên gian hàng', field: 'TenGianHang' },
    { label: 'Địa chỉ', field: 'DiaChi' },
    { label: 'Trạng thái', field: 'TrangThai' },
    { label: 'Số điện thoại', field: '' }
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
        MaGianHang: store.maGianHang,
        TenGianHang: store.tenGianHang,
        HoTenChuGianHang: store.hoTenChuGianHang,
        EmailChuGianHang: store.emailChuGianHang,
        SoDienThoaiChuGianHang: store.soDienThoaiChuGianHang
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
    if (row.MaGianHang) {
      navigate(`/store/${row.MaGianHang}`);
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
          count: Math.ceil(totalCount / 10),
          page: page,
          onChange: (e, value) => setPage(value)
        }}
      />
    </div>
  );
}

export default ListStore;

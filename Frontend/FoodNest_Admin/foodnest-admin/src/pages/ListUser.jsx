import React, { useState, useEffect } from 'react';
import SearchBar from '../components/item/SearchBar';
import ReusableTable from '../components/table/ReusableTable';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ListUsers() {
  const navigate = useNavigate();

  const [page, setPage] = useState(1); // UI: 1-based
  const [userRows, setUserRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState('');

  const columns = [
    { label: 'Họ và tên', field: 'HoTen' },
    { label: 'Địa chỉ', field: 'DiaChi' },
    { label: 'Email', field: 'Email' },
    { label: 'Số điện thoại', field: 'SoDienThoai' },
    { label: 'Trạng thái', field: 'TrangThai' }
  ];

  useEffect(() => {
    fetchUsers(page - 1, searchKeyword); // Backend: 0-based
  }, [page, searchKeyword]);

  const fetchUsers = async (pageIndex, keyword) => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8080/api/nguoidung/timkiem', {
        params: {
          page: pageIndex,
          size: 7,
          keyword: keyword || ''
        }
      });

      const pageData = response.data;

      const mappedData = (pageData.content || []).map(user => ({
        MaNguoiDung: user.maNguoiDung,
        HoTen: user.hoTen,
        DiaChi: user.diaChi,
        Email: user.email,
        SoDienThoai: user.soDienThoai,
        TrangThai: user.trangThai ? 'Hoạt động' : 'Không hoạt động'
      }));

      setUserRows(mappedData);
      setTotalCount(pageData.totalElements || 0);
    } catch (error) {
      console.error('Lỗi lấy dữ liệu người dùng:', error);
      setUserRows([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (keyword) => {
    setSearchKeyword(keyword);
    setPage(1); // reset về trang đầu khi tìm
  };

  const handleActionClick = (row) => {
    if (row.MaNguoiDung) {
      navigate(`/account/${row.MaNguoiDung}`);
    } else {
      alert('Không tìm thấy ID người dùng');
    }
  };

  return (
    <div>
      <h1>Danh sách thông tin người dùng</h1>

      <SearchBar placeholder="Tìm người dùng theo tên..." onSearch={handleSearch} />

      <ReusableTable
        columns={columns}
        rows={userRows}
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

export default ListUsers;

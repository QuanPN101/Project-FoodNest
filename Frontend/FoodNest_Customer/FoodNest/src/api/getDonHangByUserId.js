import axios from 'axios';

const getDonHangByUserId = async (userId) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/donhang/getByUserId/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi gọi API lấy đơn hàng:', error);
        return [];
    }
};

export default getDonHangByUserId;

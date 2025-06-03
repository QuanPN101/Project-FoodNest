import instance from './instance';

export const getSanPhamById = async (maSanPham) => {
    try {
        const response = await instance.get(`/sanpham/${maSanPham}`);
        return response.data;
    } catch (error) {
        console.error(`Lỗi khi gọi API /sanpham/${maSanPham}:`, error);
        throw error;
    }
};

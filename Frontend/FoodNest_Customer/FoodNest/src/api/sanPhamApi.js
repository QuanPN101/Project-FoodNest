import instance from './instance';

export const getSanPhamByLoai = async (maLoai) => {
    try {
        const response = await instance.get(`/sanpham/loai/${maLoai}`);
        return response.data;
    } catch (error) {
        console.error(`Lỗi khi gọi API /sanpham/loai/${maLoai}:`, error);
        throw error;
    }
};

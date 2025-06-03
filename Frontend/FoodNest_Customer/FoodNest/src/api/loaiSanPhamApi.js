import instance from './instance';

export const getAllLoaiSanPham = async () => {
    try {
        const response = await instance.get('/loaisanpham');
        return response.data;
    } catch (error) {
        console.error('Lỗi khi gọi API /loaisanpham:', error);
        throw error;
    }
};

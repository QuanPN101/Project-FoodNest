import instance from './instance';

export const getNguoiDungById = async (id) => {
    try {
        const response = await instance.get(`/nguoidung/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Lỗi khi gọi API /nguoidung/${id}:`, error);
        throw error;
    }
};

import axios from 'axios';

export async function reverseGeocode(lat, lon) {
    try {
        const response = await axios.get('https://nominatim.openstreetmap.org/reverse', {
            params: {
                format: 'json',
                lat: lat,
                lon: lon,
            },
            headers: {
                'Accept-Language': 'vi',
                'User-Agent': 'your-app-name (your@email.com)',
            },
        });

        const data = response.data;
        return data.display_name || 'Không tìm thấy địa chỉ';
    } catch (error) {
        console.error('Lỗi khi reverse geocode:', error);
        return 'Không thể lấy địa chỉ';
    }
}

import React, { use, useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet-control-geocoder';
import { reverseGeocode } from '../api/reverseGeocode';
import { useAppContext } from '../context/Appcontext';
export default function MapView() {
    const mapRef = useRef(null);
    const [mapInstance, setMapInstance] = useState(null);
    const markerRef = useRef(null);
    const [displayName, setDisplayName] = useState('');
    const { setSelectedCoords, selectedCoord } = useAppContext();

    useEffect(() => {
        setSelectedCoords(16.459285, 107.592357);
    }, []);
    useEffect(() => {
        const map = L.map(mapRef.current).setView([16.459285, 107.592357], 20);
        setMapInstance(map);
        setSelectedCoords({ lat: 16.459285, lng: 107.592357 });
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors',
        }).addTo(map);

        const geocoder = L.Control.geocoder({
            defaultMarkGeocode: false,
        })
            .on('markgeocode', function (e) {
                const { center } = e.geocode;
                map.setView(center, 16);
                setSelectedCoords({ lat: center.lat, lng: center.lng });

                if (markerRef.current) {
                    markerRef.current.setLatLng(center);
                } else {
                    markerRef.current = L.marker(center).addTo(map);
                }
            })
            .addTo(map);

        // Click để chọn vị trí
        map.on('click', function (e) {
            const { lat, lng } = e.latlng;
            setSelectedCoords({ lat, lng });

            if (markerRef.current) {
                markerRef.current.setLatLng([lat, lng]);
            } else {
                markerRef.current = L.marker([lat, lng]).addTo(map);
            }
        });

        return () => map.remove();
    }, []);

    // Lấy vị trí hiện tại
    const handleGetCurrentLocation = () => {
        if (!navigator.geolocation) {
            alert('Trình duyệt không hỗ trợ lấy vị trí.');
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setSelectedCoords({ lat: latitude, lng: longitude });

                if (mapInstance) {
                    mapInstance.setView([latitude, longitude], 16);
                    if (markerRef.current) {
                        markerRef.current.setLatLng([latitude, longitude]);
                    } else {
                        markerRef.current = L.marker([latitude, longitude]).addTo(mapInstance);
                    }
                }
            },
            () => {
                alert('Không thể lấy vị trí hiện tại.');
            }
        );
    };

    return (
        <div>
            <div ref={mapRef} style={{ height: '500px', width: '100%', marginBottom: '10px' }} />
            {/* {selectedCoords && (
                <div style={{ marginTop: '10px' }}>
                    <strong>Toạ độ đã chọn:</strong>
                    <br />
                    Lat: {selectedCoords.lat.toFixed(6)} <br />
                    Lng: {selectedCoords.lng.toFixed(6)}
                    <span>địa chỉ</span>
                    <p>{displayName}</p>
                </div>
            )} */}
        </div>
    );
}

package com.example.foodnest.service;

import com.example.foodnest.repository.DonHangRepository;
import com.example.foodnest.repository.GianHangRepository;
import com.example.foodnest.repository.NguoiDungRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class ThongKeService {

    @Autowired
    private NguoiDungRepository nguoiDungRepository;

    @Autowired
    private DonHangRepository donHangRepository;

    @Autowired
    private GianHangRepository gianHangRepository;

    public long getSoKhachHang() {
        return nguoiDungRepository.countNguoiDungByMaVaiTro(1);
    }

    public long getSoDonHangDaGiao() {
        return donHangRepository.countDonHangByTrangThaiDonHang("Đã giao hàng");
    }

    public long getSoGianHangHoatDong() {
        return gianHangRepository.countGianHangByTrangThai(true);
    }

    public Map<String, Long> thongKeTongQuan() {
        Map<String, Long> result = new HashMap<>();
        result.put("soKhachHang", getSoKhachHang());
        result.put("soDonHangDaGiao", getSoDonHangDaGiao());
        result.put("soGianHangHoatDong", getSoGianHangHoatDong());
        return result;
    }
}


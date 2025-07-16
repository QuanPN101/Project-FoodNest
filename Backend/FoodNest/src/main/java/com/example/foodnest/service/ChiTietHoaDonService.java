package com.example.foodnest.service;

import com.example.foodnest.entity.ChiTietDonHang;
import com.example.foodnest.repository.ChiTietHoaDonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChiTietHoaDonService {
    @Autowired
    private ChiTietHoaDonRepository chiTietHoaDonRepository;

    public List<ChiTietDonHang> getChiTietByMaDonHang(String maDonHang) {
        return chiTietHoaDonRepository.findByMaDonHang_MaDonHang(maDonHang);
    }
}

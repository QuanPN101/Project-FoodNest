package com.example.foodnest.repository;

import com.example.foodnest.entity.ChiTietDonHang;
import com.example.foodnest.entity.DonHang;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChiTietDonHangRepository extends JpaRepository<ChiTietDonHang, String> {
    List<ChiTietDonHang> findByMaDonHang(DonHang maDonHang);
    void deleteByMaDonHang_MaDonHang(String maDonHang);
}

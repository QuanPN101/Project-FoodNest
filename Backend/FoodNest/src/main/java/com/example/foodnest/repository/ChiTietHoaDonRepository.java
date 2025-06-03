package com.example.foodnest.repository;

import com.example.foodnest.entity.ChiTietDonHang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.awt.print.Pageable;
import java.util.List;

@Repository
public interface ChiTietHoaDonRepository extends JpaRepository<ChiTietDonHang, Long> {
    @Query(value = "SELECT TOP 10 sp.MaSanPham, sp.TenSanPham, SUM(ct.SoLuong) AS TongSoLuong " +
            "FROM ChiTietDonHang ct " +
            "JOIN SanPham sp ON ct.MaSanPham = sp.MaSanPham " +
            "GROUP BY sp.MaSanPham, sp.TenSanPham " +
            "ORDER BY TongSoLuong DESC", nativeQuery = true)
    List<Object[]> findTop10BestSellingProducts();
}

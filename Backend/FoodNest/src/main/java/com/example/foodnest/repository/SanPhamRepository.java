package com.example.foodnest.repository;

import com.example.foodnest.entity.SanPham;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SanPhamRepository extends JpaRepository<SanPham, String> {
    List<SanPham> findByLoaiSanPham_MaLoai(String maLoai);
    List<SanPham> findByMaGianHang_MaGianHang(int maGianHang);
}

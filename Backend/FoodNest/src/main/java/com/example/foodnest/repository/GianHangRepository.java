package com.example.foodnest.repository;

import com.example.foodnest.entity.GianHang;
import com.example.foodnest.entity.NguoiDung;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GianHangRepository extends JpaRepository<GianHang, Integer>, JpaSpecificationExecutor<GianHang> {
    // Thêm các method truy vấn riêng nếu cần
    // Kiểm tra xem user đã có shop chưa
    Optional<GianHang> findByNguoiDung(NguoiDung nguoiDung);

    // Kiểm tra trùng tên gian hàng
    boolean existsByTenGianHang(String tenGianHang);

    // Kiểm tra người dùng đã có gian hàng hay chưa
    boolean existsByNguoiDung(NguoiDung nguoiDung);
}

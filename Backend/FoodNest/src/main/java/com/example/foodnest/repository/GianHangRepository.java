package com.example.foodnest.repository;

import com.example.foodnest.entity.GianHang;
import com.example.foodnest.entity.NguoiDung;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GianHangRepository extends JpaRepository<GianHang, Integer> {
    // Bạn có thể thêm các method truy vấn riêng nếu cần
    Page<GianHang> findByTenGianHangContaining(String keyword, Pageable pageable);
}

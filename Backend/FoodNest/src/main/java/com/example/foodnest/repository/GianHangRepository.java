package com.example.foodnest.repository;

import com.example.foodnest.entity.GianHang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GianHangRepository extends JpaRepository<GianHang, Integer> {
    // Bạn có thể thêm các method truy vấn riêng nếu cần
}

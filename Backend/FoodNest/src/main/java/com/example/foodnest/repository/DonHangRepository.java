package com.example.foodnest.repository;

import com.example.foodnest.entity.DonHang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DonHangRepository extends JpaRepository<DonHang, String> {
    @Query("SELECT d FROM DonHang d JOIN FETCH d.maNguoiDung")
    List<DonHang> findAllWithNguoiDung();
}

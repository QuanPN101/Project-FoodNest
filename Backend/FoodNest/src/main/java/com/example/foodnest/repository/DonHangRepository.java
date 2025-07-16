package com.example.foodnest.repository;

import com.example.foodnest.entity.DonHang;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import com.example.foodnest.entity.NguoiDung;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.List;

@Repository
public interface DonHangRepository extends JpaRepository<DonHang, String> {
    @Query("SELECT d FROM DonHang d WHERE " +
            "(:trangThai IS NULL OR d.trangThaiDonHang = :trangThai) AND " +
            "(:tenNguoiDung IS NULL OR LOWER(d.maNguoiDung.hoTen) LIKE LOWER(CONCAT('%', :tenNguoiDung, '%')))")
    Page<DonHang> searchByFilters(@Param("trangThai") String trangThai,
                                  @Param("tenNguoiDung") String tenNguoiDung,
                                  Pageable pageable);


    @Query("SELECT d FROM DonHang d JOIN FETCH d.maNguoiDung")
    List<DonHang> findAll();

    long countDonHangByTrangThaiDonHang(String trangThai);

    @Query("SELECT d FROM DonHang d JOIN FETCH d.maNguoiDung")
    List<DonHang> findAllWithNguoiDung();

    List<DonHang> findByMaNguoiDung(NguoiDung maNguoiDung);

    long countByMaNguoiDung_MaNguoiDung(String maNguoiDung);


}
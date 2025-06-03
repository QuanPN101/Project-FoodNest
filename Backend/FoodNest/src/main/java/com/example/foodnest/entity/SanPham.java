package com.example.foodnest.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.sql.Date;
import java.time.Instant;
import java.time.LocalDateTime;

@Entity
@Table(name = "SanPham")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SanPham {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "MaSanPham")
    private String maSanPham;

    @Column(name = "TenSanPham")
    private String tenSanPham;

    @Column(name = "MoTa")
    private String moTa;

    @Column(name = "Gia")
    private BigDecimal gia;

    @Column(name = "SoLuong")
    private int soLuong;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MaGianHang", nullable = false, referencedColumnName = "MaGianHang")
    private GianHang maGianHang;

    @Column(name = "AnhChinh")
    private String anhChinh;

    @Column(name = "trangThai")
    private boolean TrangThai;

    @Column(name = "NgayTao")
    private Instant ngayTao;

    @ManyToOne
    @JoinColumn(name = "ma_loai_san_pham") // tên cột trong bảng SanPham
    private LoaiSanPham loaiSanPham;
}

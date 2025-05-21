package com.example.foodnest.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.sql.Date;

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

    @Column(name = "MaGianHang")
    private int maGianHang;

    @Column(name = "AnhChinh")
    private String anhChinh;

    @Column(name = "trangThai")
    private boolean TrangThai;

    @Column(name = "NgayTao")
    private Date ngayTao;
}

package com.example.foodnest.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.Nationalized;

import java.math.BigDecimal;
import java.time.Instant;

@Getter
@Setter
@Entity
public class DonHang {
    @Id
    @Column(name = "MaDonHang", nullable = false)
    @GeneratedValue(strategy = GenerationType.UUID)
    private String maDonHang;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "MaNguoiDung", nullable = false)
    private NguoiDung maNguoiDung;

    @ColumnDefault("getdate()")
    @Column(name = "NgayDat")
    private Instant ngayDat;

    @Size(max = 50)
    @Nationalized
    @ColumnDefault("N'Chờ xác nhận'")
    @Column(name = "TrangThaiDonHang", length = 50)
    private String trangThaiDonHang;

    @Column(name = "NgayGiaoHang")
    private Instant ngayGiaoHang;

    @Column(name = "NgayThanhToan")
    private Instant ngayThanhToan;

    @NotNull
    @ColumnDefault("0")
    @Column(name = "TongTien", nullable = false, precision = 18, scale = 2)
    private BigDecimal tongTien;

    @Size(max = 255)
    @NotNull
    @Nationalized
    @Column(name = "DiaChiGiaoHang", nullable = false)
    private String diaChiGiaoHang;

    @Size(max = 255)
    @Column(name = "Email", nullable = false)
    private String email;

    @Size(max = 255)
    @Column(name = "HoTen", nullable = false)
    private String hoTen;

    @Size(max = 255)
    @Column(name = "SoDienThoai", nullable = false)
    private String soDienThoai;

    @Column(name = "PhuongThucThanhToan", nullable = false)
    private String phuongThucThanhToan;
}
package com.example.foodnest.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
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

public class SanPham {
    @Id
    @Size(max = 50)
    @Nationalized
    @Column(name = "MaSanPham", nullable = false, length = 50)
    private String maSanPham;

    @Size(max = 100)
    @NotNull
    @Nationalized
    @Column(name = "TenSanPham", nullable = false, length = 100)
    private String tenSanPham;

    @Size(max = 255)
    @Nationalized
    @Column(name = "MoTa")
    private String moTa;

    @NotNull
    @Column(name = "Gia", nullable = false, precision = 18, scale = 2)
    private BigDecimal gia;

    @ColumnDefault("0")
    @Column(name = "SoLuong")
    private Integer soLuong;

    @NotNull
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "MaGianHang", nullable = false)
    private GianHang maGianHang;

    @Size(max = 255)
    @Nationalized
    @Column(name = "AnhChinh")
    private String anhChinh;

    @ColumnDefault("1")
    @Column(name = "TrangThai")
    private Boolean trangThai;

    @ColumnDefault("getdate()")
    @Column(name = "NgayTao")
    private Instant ngayTao;

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "MaLoai")
//    private String maLoai;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MaLoai")
    @JsonIgnore
    private LoaiSanPham loaiSanPham;
}
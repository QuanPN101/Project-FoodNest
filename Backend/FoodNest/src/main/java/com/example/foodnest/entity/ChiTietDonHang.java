package com.example.foodnest.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@Entity
public class ChiTietDonHang {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "MaChiTiet", nullable = false)
    private String id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "MaDonHang", nullable = false)
    private DonHang maDonHang;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "MaSanPham", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private SanPham maSanPham;


    @NotNull
    @Column(name = "SoLuong", nullable = false)
    private Integer soLuong;

    @NotNull
    @Column(name = "DonGia", nullable = false, precision = 18, scale = 2)
    private BigDecimal donGia;

}
package com.example.foodnest.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Nationalized;

import java.math.BigDecimal;
import java.sql.Date;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.List;

@Table(name = "SanPham")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@JsonIgnoreProperties
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
    //    @NotNull
//    @ManyToOne(fetch = FetchType.LAZY, optional = false)
//    @JoinColumn(name = "MaGianHang", nullable = false, referencedColumnName = "MaGianHang")
//    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
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


    @ManyToMany
    @JoinTable(
            name = "sanpham_tuychon",
            joinColumns = @JoinColumn(name = "MaSanPham"),
            inverseJoinColumns = @JoinColumn(name = "MaTuyChon")
    )


    private List<TuyChon> tuyChon;

    @Nationalized
    @Column(name = "deliveryCost")
    private int deliveryCost;
}

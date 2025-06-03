package com.example.foodnest.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="GianHang")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class GianHang {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MaGianHang")
    private Integer maGianHang;

    @Column(name = "TenGianHang", nullable = false, length = 100)
    private String tenGianHang;

    @Column (name = "MoTa")
    private String moTa;

    @Column (name = "DiaChi")
    private String diaChi;

    @ManyToOne
    @JoinColumn(name = "MaNguoiDung", referencedColumnName = "MaNguoiDung")
    private NguoiDung nguoiDung;

    @Column(name = "TrangThai")
    private Boolean trangThai;

    @Column(name = "NgayTao")
    private java.time.LocalDateTime ngayTao;

}

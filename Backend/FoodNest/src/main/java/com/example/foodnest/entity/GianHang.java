package com.example.foodnest.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name="GianHang")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class GianHang {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MaGianHang")
    private int maGianHang;

    @Column(name = "TenGianHang", nullable = false)
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

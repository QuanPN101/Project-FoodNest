package com.example.foodnest.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;


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
    @Column(name = "MaGianHang")
    private int maGianHang;

    @Column(name = "TenGianHang", nullable = false, length = 100)
    private String tenGianHang;

    @Column (name = "MoTa")
    private String moTa;

    @Column (name = "DiaChi")
    private String diaChi;

    @ManyToOne
    @JoinColumn(name = "MaNguoiDung", referencedColumnName = "MaNguoiDung")
    private NguoiDung nguoiDung;

    @Column(name = "TrangThai", updatable = false)
    @CreationTimestamp
    private Boolean trangThai;

    @Column(name = "NgayTao")
    private java.time.LocalDateTime ngayTao;

    @Column(name = "anhDaiDien")
    private String anhDaiDien;

    @Column(name = "lon")
    private float lon;

    @Column(name = "lat")
    private float lat;

}
package com.example.foodnest.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MaNguoiDung", referencedColumnName = "MaNguoiDung")
    @JsonIgnore
    private NguoiDung nguoiDung;

    @Column(name = "TrangThai")
    private Boolean trangThai;

    @CreationTimestamp
    @Column(name = "NgayTao", updatable = false)
    private java.time.LocalDateTime ngayTao;

    @Column(name = "AnhBiaPreview")
    private String anhBiaPreview;


}

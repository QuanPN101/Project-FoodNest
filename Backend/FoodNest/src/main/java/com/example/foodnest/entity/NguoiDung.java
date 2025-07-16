package com.example.foodnest.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
@Table(name = "NguoiDung")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NguoiDung {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "MaNguoiDung")
    private String maNguoiDung;

    @Column(name = "Email")
    private String email;

    @Column(name = "MatKhau")
    private String matKhau;

    @Column(name = "HoTen")
    private String hoTen;

    @Column(name = "SoDienThoai")
    private String soDienThoai;

    @Column(name = "AnhDaiDien")
    private String anhDaiDien;

    @Column(name = "MaVaiTro")
    private Integer maVaiTro;

    @Column(name = "TrangThai")
    private Boolean trangThai;

    @Column(name = "DiaChi")
    private String diaChi;

    @Column(name = "NgayTao")
    private String ngayTao;
}




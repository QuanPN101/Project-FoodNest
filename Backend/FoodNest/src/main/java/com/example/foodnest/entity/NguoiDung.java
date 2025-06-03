package com.example.foodnest.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "NguoiDung")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NguoiDung {
    @Id
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
}




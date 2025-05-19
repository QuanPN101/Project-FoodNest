package com.example.foodnest.dto.request;

import lombok.Data;

@Data
public class NguoiDungUpdateRequest {
    private String email;
    private String matKhau;
    private String hoTen;
    private String soDienThoai;
    private String anhDaiDien;
    private String diaChi;
}


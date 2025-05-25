package com.example.foodnest.dto.request;

import lombok.Data;


@Data
public class GianHangCreateRequest {
    private String tenGianHang;
    private String moTa;
    private String diaChi;
    private String maNguoiDung;
}

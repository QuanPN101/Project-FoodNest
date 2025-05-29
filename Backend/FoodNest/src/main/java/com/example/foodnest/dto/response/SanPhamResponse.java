package com.example.foodnest.dto.response;

import lombok.Data;

import java.math.BigDecimal;
import java.time.Instant;


@Data
public class SanPhamResponse {
    private String maSanPham;
    private String tenSanPham;
    private String moTa;
    private BigDecimal gia;
    private Integer soLuong;
    private String anhChinh;
    private Boolean trangThai;
    private Instant ngayTao;

    private String tenGianHang;
    private String tenLoai;
}

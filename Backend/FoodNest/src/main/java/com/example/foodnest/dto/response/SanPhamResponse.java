package com.example.foodnest.dto.response;

import com.example.foodnest.entity.GianHang;
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

    private String maGianHang;
    private String tenLoai;
    private String maLoai;
}

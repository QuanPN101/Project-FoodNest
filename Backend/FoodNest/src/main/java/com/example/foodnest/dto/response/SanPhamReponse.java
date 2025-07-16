package com.example.foodnest.dto.response;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class SanPhamReponse {
    private String maSanPham;
    private String tenSanPham;
    private String moTa;
    private BigDecimal gia;
    private Integer soLuong;
    private String anhChinh;
    private Boolean trangThai;
    private int deliveryCost;
}

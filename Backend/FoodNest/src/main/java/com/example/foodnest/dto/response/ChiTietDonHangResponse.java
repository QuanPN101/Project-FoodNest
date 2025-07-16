package com.example.foodnest.dto.response;

import com.example.foodnest.entity.SanPham;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class ChiTietDonHangResponse {
    private String id;
    private SanPhamResponse maSanPham;
    private Integer soLuong;
    private BigDecimal donGia;
}

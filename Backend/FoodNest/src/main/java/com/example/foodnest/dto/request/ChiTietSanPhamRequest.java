package com.example.foodnest.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChiTietSanPhamRequest {
    private String maSanPham;
    private int soLuong;
    private BigDecimal gia;
}

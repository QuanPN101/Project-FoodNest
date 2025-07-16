package com.example.foodnest.dto.request;


import com.example.foodnest.entity.ChiTietDonHang;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DonHangCreateRequest {
    private String maNguoiDung;
    private String trangThai;
    private BigDecimal tongTien;
    private String diaChiGiaoHang;
    private String hoTen;
    private String diaChi;
    private String soDienThoai;
    private String email;
    private String phuongThucThanhToan;

    private List<ChiTietSanPhamRequest> chiTietSanPham;
}

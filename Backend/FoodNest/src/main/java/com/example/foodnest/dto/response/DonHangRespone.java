package com.example.foodnest.dto.response;

import com.example.foodnest.dto.request.ChiTietSanPhamRequest;
import com.example.foodnest.entity.ChiTietDonHang;
import com.example.foodnest.entity.DonHang;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

@Data
@Builder
public class DonHangRespone {
    private String maDonHang;
    private Instant ngayDat;
    private String trangThaiDonHang;
    private Instant ngayGiaoHang;
    private Instant ngayThanhToan;
    private BigDecimal tongTien;
    private String diaChiGiaoHang;
    private String email;
    private String hoTen;
    private String soDienThoai;
    private String phuongThucThanhToan;

    private List<ChiTietDonHangResponse> dsChiTietDonHang;
}

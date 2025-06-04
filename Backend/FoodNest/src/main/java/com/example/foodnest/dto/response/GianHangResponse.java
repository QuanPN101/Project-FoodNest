package com.example.foodnest.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GianHangResponse {

    // Thông tin gian hàng
    private String maGianHang;
    private String tenGianHang;
    private String maNguoiDung; // mã người dùng chủ gian hàng
    private String moTa;
    private String diaChi;
    private Boolean trangThai;
    private LocalDateTime ngayTao;
    private String anhBiaPreview;

    // Thông tin chủ gian hàng (nguoiDung)
    private String hoTenChuGianHang;
    private String emailChuGianHang;
    private String soDienThoaiChuGianHang;


    @Override
    public String toString() {
        return "GianHangResponse{" +
                "maGianHang='" + maGianHang + '\'' +
                ", tenGianHang='" + tenGianHang + '\'' +
                ", maNguoiDung='" + maNguoiDung + '\'' +
                ", moTa='" + moTa + '\'' +
                ", diaChi='" + diaChi + '\'' +
                ", trangThai=" + trangThai +
                ", ngayTao=" + ngayTao +
                ", anhBiaPreview='" + anhBiaPreview + '\'' +
                ", hoTenChuGianHang='" + hoTenChuGianHang + '\'' +
                ", emailChuGianHang='" + emailChuGianHang + '\'' +
                ", soDienThoaiChuGianHang='" + soDienThoaiChuGianHang + '\'' +
                '}';
    }
}

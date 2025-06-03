package com.example.foodnest.dto.response;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Data
public class GianHangResponse {
    private String maGianHang;
    private String tenGianHang;
    private String maNguoiDung;
    private String moTa;
    private String diaChi;
    private Boolean trangThai;
    private LocalDateTime ngayTao;
    private String anhBiaPreview;

//    // Thông tin chủ gian hàng
//    private String hoTenChuGianHang;
//    private String emailChuGianHang;
//    private String soDienThoaiChuGianHang;

    public GianHangResponse() {
    }

    public GianHangResponse(String maGianHang, String tenGianHang, String moTa,
                            String diaChi, boolean trangThai, LocalDateTime ngayTao, String anhBiaPreview) {

        this.maGianHang = maGianHang;
        this.tenGianHang = tenGianHang;
        this.moTa = moTa;
        this.diaChi = diaChi;
        this.trangThai = trangThai;
        this.ngayTao = ngayTao;
        this.anhBiaPreview = anhBiaPreview;
    }

        public String toString (String maGianHang, String tenGianHang, String moTa, String diaChi,
        boolean trangThai, LocalDateTime ngayTao, String anhBiaPreview){
            return "GianHangResponse{" +
                    "maGianHang=" + maGianHang +
                    ", tenGianHang='" + tenGianHang + '\'' +
                    ", moTa='" + moTa + '\'' +
                    ", diaChi='" + diaChi + '\'' +
                    ", trangThai='" + trangThai + '\'' +
                    ", ngayTao='" + ngayTao + '\'' +
                    ", anhBiaPreview='" + anhBiaPreview + '\'' +
                    '}';
        }
    }


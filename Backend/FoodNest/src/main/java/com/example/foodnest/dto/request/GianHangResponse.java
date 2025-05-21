package com.example.foodnest.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GianHangResponse {
    private int maGianHang;
    private String tenGianHang;
    private String maNguoiDung;

    //Thông tin chủ gian hàng
    private String hoTenChuGianHang;
    private String emailChuGianHang;
    private String soDienThoaiChuGianHang;

    public GianHangResponse() {
    }

    public GianHangResponse(int maGianHang, String tenGianHang, String maNguoiDung,
                            String hoTenChuGianHang, String emailChuGianHang, String soDienThoaiChuGianHang) {
        this.maGianHang = maGianHang;
        this.tenGianHang = tenGianHang;
        this.maNguoiDung = maNguoiDung;
        this.hoTenChuGianHang = hoTenChuGianHang;
        this.emailChuGianHang = emailChuGianHang;
        this.soDienThoaiChuGianHang = soDienThoaiChuGianHang;
    }

    public int getMaGianHang() {
        return maGianHang;
    }

    public void setMaGianHang(int maGianHang) {
        this.maGianHang = maGianHang;
    }

    public String getTenGianHang() {
        return tenGianHang;
    }

    public void setTenGianHang(String tenGianHang) {
        this.tenGianHang = tenGianHang;
    }

    public String getMaNguoiDung() {
        return maNguoiDung;
    }

    public void setMaNguoiDung(String maNguoiDung) {
        this.maNguoiDung = maNguoiDung;
    }

    public String getHoTenChuGianHang() {
        return hoTenChuGianHang;
    }

    public void setHoTenChuGianHang(String hoTenChuGianHang) {
        this.hoTenChuGianHang = hoTenChuGianHang;
    }

    public String getEmailChuGianHang() {
        return emailChuGianHang;
    }

    public void setEmailChuGianHang(String emailChuGianHang) {
        this.emailChuGianHang = emailChuGianHang;
    }

    public String getSoDienThoaiChuGianHang() {
        return soDienThoaiChuGianHang;
    }

    public void setSoDienThoaiChuGianHang(String soDienThoaiChuGianHang) {
        this.soDienThoaiChuGianHang = soDienThoaiChuGianHang;
    }

    @Override
    public String toString() {
        return "GianHangResponse{" +
                "maGianHang=" + maGianHang +
                ", tenGianHang='" + tenGianHang + '\'' +
                ", maNguoiDung=" + maNguoiDung +
                ", hoTenChuGianHang='" + hoTenChuGianHang + '\'' +
                ", emailChuGianHang='" + emailChuGianHang + '\'' +
                ", soDienThoaiChuGianHang='" + soDienThoaiChuGianHang + '\'' +
                '}';
    }
}
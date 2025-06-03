package com.example.foodnest.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;


@Data
public class GianHangCreateRequest {
    @NotBlank(message = "Tên gian hàng không được để trống")
    private String tenGianHang;
    @NotBlank(message = "Mô tả gian hàng không được để trống")
    private String moTa;
    @NotBlank(message = "Địa chỉ không được để trống")
    private String diaChi;
    private String maNguoiDung;
    @NotBlank(message = "Ảnh bìa không được để trống")
    private String anhBiaPreview;
    private boolean trangThai;

}

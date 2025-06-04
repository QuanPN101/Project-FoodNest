package com.example.foodnest.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class GianHangUpdateRequest {
    @NotBlank(message = "Tên gian hàng không được để trống")
    private String tenGianHang;

    private String moTa;

    private String diaChi;

    private Boolean trangThai;

    private String anhBiaPreview;
}

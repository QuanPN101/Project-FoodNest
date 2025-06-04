package com.example.foodnest.dto.request;

import com.example.foodnest.entity.NguoiDung;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;


@Data
public class GianHangCreateRequest {
    @NotBlank(message = "Tên gian hàng không được để trống")
    private String tenGianHang;

    private String moTa;

    private String diaChi;

    private String anhBiaPreview;
    @NotBlank
    private String maNguoiDung;
}


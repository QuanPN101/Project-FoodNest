package com.example.foodnest.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
public class GianHangCreateRequest {
    @NotBlank
    private String tenGianHang;
    private String moTa;
    private String diaChi;
    @NotNull
    private String maNguoiDung;
}

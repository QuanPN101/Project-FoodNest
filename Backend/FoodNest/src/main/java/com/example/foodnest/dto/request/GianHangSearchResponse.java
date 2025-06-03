package com.example.foodnest.dto.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GianHangSearchResponse {
    private String maGianHang;
    private String tenGianHang;
    private String diaChi;
    private Boolean trangThai;
    private String maNguoiDung;
}

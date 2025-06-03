package com.example.foodnest.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ThongKeResponse {
    private long soDonHang;
    private long soKhachHang;
    private long soGianHangHoatDong;
}


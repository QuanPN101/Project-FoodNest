package com.example.foodnest.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponse {
    private String maNguoiDung;
    private String email;
    private String hoTen;
    private Integer maVaiTro;
    private String anhDaiDien;
}

package com.example.foodnest.dto.response;

import com.example.foodnest.entity.NguoiDung;
import lombok.Data;

@Data
public class NguoiDungResponse {
    private String id;
    private String hoTen;
    private String email;
    private Integer maVaiTro;
    public NguoiDungResponse(NguoiDung nguoiDung) {
        this.id = nguoiDung.getMaNguoiDung();
        this.hoTen = nguoiDung.getHoTen();
        this.email = nguoiDung.getEmail();
        this.maVaiTro = nguoiDung.getMaVaiTro();
    }
}

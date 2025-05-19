package com.example.foodnest.dto.request;

import lombok.Data;

@Data
public class NguoiDungCreateRequest {
    private String email;
    private String matKhau;
    private String hoTen;
}

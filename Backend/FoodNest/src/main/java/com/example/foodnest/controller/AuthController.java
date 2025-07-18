package com.example.foodnest.controller;

import com.example.foodnest.dto.response.ApiResponse;
import com.example.foodnest.dto.request.LoginRequest;
import com.example.foodnest.dto.response.LoginResponse;
import com.example.foodnest.dto.response.NguoiDungResponse;
import com.example.foodnest.entity.NguoiDung;
import com.example.foodnest.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthService authService;
    @PostMapping("/admin")
    public ApiResponse<LoginResponse> login(@RequestBody LoginRequest request) {
        try {
            LoginResponse response = authService.login(request);
            if (response != null) {
                return ApiResponse.<LoginResponse>builder()
                        .code(1000)
                        .message("Login Success")
                        .result(response)
                        .build();
            } else {
                // Không tìm thấy user hoặc sai mật khẩu
                return ApiResponse.<LoginResponse>builder()
                        .code(1002)
                        .message("Sai tài khoản hoặc mật khẩu")
                        .result(null)
                        .build();
            }
        } catch (Exception e) {
            // Lỗi hệ thống hoặc exception khác
            return ApiResponse.<LoginResponse>builder()
                    .code(5000)
                    .message("Lỗi server: " + e.getMessage())
                    .result(null)
                    .build();
        }
    }
    @PostMapping()
    public ApiResponse<NguoiDungResponse> Login(@RequestBody LoginRequest request) {
        NguoiDung nguoiDung = authService.login_customer(request);
        if (nguoiDung != null) {
            NguoiDungResponse dto = new NguoiDungResponse(nguoiDung);
            return ApiResponse.<NguoiDungResponse>builder()
                    .code(1000)
                    .message("Login Success")
                    .result(dto)
                    .build();
        } else {
            return ApiResponse.<NguoiDungResponse>builder()
                    .code(1001)
                    .message("Login Failed")
                    .build();
        }
    }

}

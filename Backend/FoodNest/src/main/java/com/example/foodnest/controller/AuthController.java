package com.example.foodnest.controller;

import com.example.foodnest.dto.response.ApiResponse;
import com.example.foodnest.dto.request.LoginRequest;
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
    @PostMapping()
    public ApiResponse<NguoiDungResponse> Login(@RequestBody LoginRequest request) {
        NguoiDung nguoiDung = authService.login(request);
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

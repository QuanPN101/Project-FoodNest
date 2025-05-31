package com.example.foodnest.controller;

import com.example.foodnest.dto.response.ApiResponse;
import com.example.foodnest.dto.request.LoginRequest;
import com.example.foodnest.dto.response.LoginResponse;
import com.example.foodnest.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthService authService;
    @PostMapping
    public ApiResponse<LoginResponse> login(@RequestBody LoginRequest request) {
        LoginResponse response = authService.login(request);
        if (response != null) {
            return ApiResponse.<LoginResponse>builder()
                    .code(1000)
                    .message("Login Success")
                    .result(response)
                    .build();
        } else {
            return ApiResponse.<LoginResponse>builder()
                    .code(1001)
                    .message("Login Failed")
                    .result(null)
                    .build();
        }
    }

}

package com.example.foodnest.controller;

import com.example.foodnest.dto.response.ApiResponse;
import com.example.foodnest.dto.request.LoginRequest;
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
    public ApiResponse<String> Login(@RequestBody LoginRequest request) {
        boolean success = authService.login(request);
        if (success) {
            return ApiResponse.<String>builder()
                    .code(1000)
                    .message("Login Success")
                    .build();
        } else {
            return ApiResponse.<String>builder()
                    .code(1001)
                    .message("Login Failed")
                    .build();
        }
    }
}

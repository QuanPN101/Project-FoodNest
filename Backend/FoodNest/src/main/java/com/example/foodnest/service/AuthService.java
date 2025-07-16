package com.example.foodnest.service;

import com.example.foodnest.dto.request.LoginRequest;
import com.example.foodnest.dto.response.LoginResponse;
import com.example.foodnest.entity.NguoiDung;
import com.example.foodnest.repository.NguoiDungRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AuthService {
    NguoiDungRepository nguoiDungRepository;
    public LoginResponse login(LoginRequest request){
        return nguoiDungRepository.findByEmail(request.getEmail())
                .filter(nguoiDung -> nguoiDung.getMatKhau().equals(request.getMatKhau()))
                .map(nguoiDung -> new LoginResponse(
                        nguoiDung.getMaNguoiDung(),
                        nguoiDung.getEmail(),
                        nguoiDung.getHoTen(),
                        nguoiDung.getMaVaiTro(),
                        nguoiDung.getAnhDaiDien()
                ))
                .orElse(null);
    }
    public NguoiDung login_customer(LoginRequest request) {
        return nguoiDungRepository.findByEmail(request.getEmail())
                .filter(nguoiDung -> nguoiDung.getMatKhau().equals(request.getMatKhau()))
                .orElse(null);
    }
}

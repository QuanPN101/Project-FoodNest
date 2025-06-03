package com.example.foodnest.service;

import com.example.foodnest.dto.request.LoginRequest;
import com.example.foodnest.entity.NguoiDung;
import com.example.foodnest.repository.NguoiDungRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AuthService {
    NguoiDungRepository nguoiDungRepository;
    public NguoiDung login(LoginRequest request) {
        return nguoiDungRepository.findByEmail(request.getEmail())
                .filter(nguoiDung -> nguoiDung.getMatKhau().equals(request.getMatKhau()))
                .orElse(null);
    }
}

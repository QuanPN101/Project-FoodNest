package com.example.foodnest.service;

import com.example.foodnest.dto.request.NguoiDungCreateRequest;
import com.example.foodnest.dto.request.NguoiDungUpdateRequest;
import com.example.foodnest.entity.NguoiDung;
import com.example.foodnest.mapper.NguoiDungMapper;
import com.example.foodnest.repository.NguoiDungRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class NguoiDungService {
    @Autowired
    private NguoiDungRepository nguoiDungRepository;
    NguoiDungMapper nguoiDungMapper;

    public NguoiDung createNguoiDung(NguoiDungCreateRequest request) {
        if (nguoiDungRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email đã được sử dụng.");
        }

        NguoiDung nguoiDung = nguoiDungMapper.toNguoiDung(request);
        return nguoiDungRepository.save(nguoiDung);
    }

    public List<NguoiDung> getAllNguoiDung() {
        return nguoiDungRepository.findAll();
    }

    public NguoiDung getNguoiDungById(String id) {
        return nguoiDungRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng."));
    }

    public String updateNguoiDung(String id, NguoiDungUpdateRequest request) {
        NguoiDung existingNguoiDung = nguoiDungRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Người dùng không tồn tại"));

        nguoiDungMapper.updateNguoiDung(request, existingNguoiDung);
        nguoiDungRepository.save(existingNguoiDung);

        return "Cập nhật thành công";
    }
}

package com.example.foodnest.service;

import com.example.foodnest.entity.DonHang;
import com.example.foodnest.repository.DonHangRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class DonHangService {
    private DonHangRepository donHangRepository;

    public List<DonHang> getAllWithNguoiDung() {
        return  donHangRepository.findAllWithNguoiDung();
    }


}

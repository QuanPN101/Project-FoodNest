package com.example.foodnest.service;

import com.example.foodnest.entity.DonHang;
import com.example.foodnest.repository.DonHangRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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

    public Page<DonHang> searchDonHang(String trangThai, String tenNguoiDung, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("maDonHang").descending());
        return donHangRepository.searchByFilters(trangThai, tenNguoiDung, pageable);
    }
}

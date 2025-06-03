package com.example.foodnest.service;

import com.example.foodnest.entity.LoaiSanPham;
import com.example.foodnest.repository.LoaiSanPhamRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LoaiSanPhamService {
    private final LoaiSanPhamRepository loaiSanPhamRepository;

    public LoaiSanPhamService(LoaiSanPhamRepository loaiSanPhamRepository) {
        this.loaiSanPhamRepository = loaiSanPhamRepository;
    }
    public List<LoaiSanPham> getAllLoaiSanPham() {
        return loaiSanPhamRepository.findAll();
    }
}

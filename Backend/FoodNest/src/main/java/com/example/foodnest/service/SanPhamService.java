package com.example.foodnest.service;

import com.example.foodnest.dto.response.SanPhamResponse;
import com.example.foodnest.entity.SanPham;
import com.example.foodnest.mapper.SanPhamMapper;
import com.example.foodnest.repository.SanPhamRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class SanPhamService {
    @Autowired
    private SanPhamRepository sanPhamRepository;

    public List<SanPham> getAllSanPham(){
        List<SanPham> sp = sanPhamRepository.findAll();
        log.info(sp.toString());
        return sp;
    }

    public SanPham getSanPhamById(String id){
        SanPham sanPham = sanPhamRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm."));

        log.info(sanPham.toString());

        return sanPham;
    }

    public List<SanPham> getSanPhamByMaGianHang(int maGianHang){
        return sanPhamRepository.findByMaGianHang_MaGianHang(maGianHang);
    }
}

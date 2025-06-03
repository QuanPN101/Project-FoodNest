package com.example.foodnest.controller;


import com.example.foodnest.entity.LoaiSanPham;
import com.example.foodnest.service.LoaiSanPhamService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/loaisanpham")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class LoaiSanPhamController {
    private final LoaiSanPhamService loaiSanPhamService;
    @GetMapping
    public List<LoaiSanPham> getLoaiSanPham() {
        return loaiSanPhamService.getAllLoaiSanPham();
    }
}

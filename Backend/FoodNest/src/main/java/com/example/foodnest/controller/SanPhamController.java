package com.example.foodnest.controller;

import com.example.foodnest.entity.SanPham;
import com.example.foodnest.service.SanPhamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sanpham")
@CrossOrigin(origins = "*")
public class SanPhamController {
    @Autowired
    private SanPhamService sanPhamService;

    @GetMapping
    public List<SanPham> getAllSanPham() {
            return sanPhamService.getAllSanPham()
                ;}

    @GetMapping("/{id}")
    public ResponseEntity<SanPham> getSanPhamById(@PathVariable String id) {
        SanPham sanPham = sanPhamService.getSanPhamById(id);
        if (sanPham != null) {
            return ResponseEntity.ok(sanPham);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}

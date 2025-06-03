package com.example.foodnest.controller;

import com.example.foodnest.entity.SanPham;
import com.example.foodnest.service.SanPhamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/sanpham")
@CrossOrigin(origins = "*")
public class SanPhamController {
    @Autowired
    private SanPhamService sanPhamService;

    @GetMapping
    public List<SanPham> getAllSanPham() {
            return sanPhamService.getAllSanPham();
    }

    @GetMapping("/{id}")
    public ResponseEntity<SanPham> getSanPhamById(@PathVariable String id) {
        SanPham sanPham = sanPhamService.getSanPhamById(id);
        if (sanPham != null) {
            return ResponseEntity.ok(sanPham);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/gianhang/{maGianHang}")
    public List<SanPham> getSanPhamByMaGianHang(@PathVariable String maGianHang) {
        return sanPhamService.getSanPhamByMaGianHang(maGianHang);
    }

    @GetMapping("/loai/{maLoai}")
    public ResponseEntity<List<SanPham>> getSanPhamByLoai(@PathVariable String maLoai) {
        List<SanPham> sanPhams = sanPhamService.findByLoaiSanPham_MaLoai(maLoai);
        if (sanPhams.isEmpty()) {
            return ResponseEntity.noContent().build(); // trả về 204 nếu không có sản phẩm
        }
        return ResponseEntity.ok(sanPhams);
    }

//    @PutMapping("/image/{id}")
//    public ResponseEntity<?> UploadImage(@PathVariable final String id, @RequestPart final MultipartFile file) {
//        this.sanPhamService.uploadImage(id,file);
//        return ResponseEntity.ok("Upload thành công");
//    }
}

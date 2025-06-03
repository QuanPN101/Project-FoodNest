package com.example.foodnest.controller;

import com.example.foodnest.entity.DonHang;
import com.example.foodnest.service.DonHangService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/donhang")
@CrossOrigin(origins = "*")
public class DonHangController {
    @Autowired
    private DonHangService donHangService;

    @GetMapping
    public List<DonHang> getAllDonHang() {
        return donHangService.getAllWithNguoiDung();
    }

    @GetMapping("/timkiem")
    public ResponseEntity<Page<DonHang>> searchDonHang(
            @RequestParam(required = false) String trangThai,
            @RequestParam(required = false) String tenNguoiDung,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "7") int size) {

        Page<DonHang> result = donHangService.searchDonHang(trangThai, tenNguoiDung, page, size);
        return ResponseEntity.ok(result);
    }
}

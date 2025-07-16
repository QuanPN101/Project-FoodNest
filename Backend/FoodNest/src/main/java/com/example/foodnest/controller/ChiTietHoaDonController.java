package com.example.foodnest.controller;

import com.example.foodnest.entity.ChiTietDonHang;
import com.example.foodnest.service.ChiTietHoaDonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chitiethoadon")
@CrossOrigin("*")
public class ChiTietHoaDonController {

    @Autowired
    private ChiTietHoaDonService chiTietHoaDonService;

    @GetMapping("/donhang/{maDonHang}")
    public List<ChiTietDonHang> getChiTietByDonHang(@PathVariable String maDonHang) {
        return chiTietHoaDonService.getChiTietByMaDonHang(maDonHang);
    }
}


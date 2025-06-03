package com.example.foodnest.controller;

import com.example.foodnest.entity.DonHang;
import com.example.foodnest.service.DonHangService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}

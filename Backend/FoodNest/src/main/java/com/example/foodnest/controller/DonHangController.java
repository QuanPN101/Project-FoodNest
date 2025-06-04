package com.example.foodnest.controller;

import com.example.foodnest.dto.request.DonHangCreateRequest;
import com.example.foodnest.dto.response.DonHangRespone;
import com.example.foodnest.entity.DonHang;
import com.example.foodnest.service.DonHangService;
import org.springframework.beans.factory.annotation.Autowired;
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

    @PostMapping
    public DonHang addDonHang(@ModelAttribute DonHangCreateRequest request) {
        return donHangService.createDonHang(request);
    }

    @GetMapping("/getByUserId/{id}")
    public List<DonHangRespone>  getDonHangByUserId (@PathVariable  String id){
         return donHangService.getDonHangByUserId(id);
    }

}

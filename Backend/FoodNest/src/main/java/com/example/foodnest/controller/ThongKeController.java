package com.example.foodnest.controller;

import com.example.foodnest.service.ThongKeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/thongke")
@CrossOrigin(origins = "http://localhost:3000")
public class ThongKeController {

    @Autowired
    private ThongKeService thongKeService;

    @GetMapping("/tongquan")
    public ResponseEntity<Map<String, Long>> thongKeTongQuan() {
        return ResponseEntity.ok(thongKeService.thongKeTongQuan());
    }
}


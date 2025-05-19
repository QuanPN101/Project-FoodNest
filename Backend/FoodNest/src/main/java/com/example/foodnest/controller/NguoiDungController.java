package com.example.foodnest.controller;

import com.example.foodnest.dto.request.ApiResponse;
import com.example.foodnest.dto.request.NguoiDungCreateRequest;
import com.example.foodnest.dto.request.NguoiDungUpdateRequest;
import com.example.foodnest.entity.NguoiDung;
import com.example.foodnest.service.NguoiDungService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/nguoidung")
@CrossOrigin(origins = "*")
public class NguoiDungController {
    @Autowired
    private NguoiDungService nguoiDungService;

    @PostMapping
    public ApiResponse<NguoiDung> createNguoiDung(@RequestBody NguoiDungCreateRequest request) {
        return ApiResponse.<NguoiDung>builder()
                .result(nguoiDungService.createNguoiDung(request))
                .message("Successfully Created NguoiDung")
                .build();
    }

    @GetMapping
    public List<NguoiDung> getAllNguoiDung() {
        return nguoiDungService.getAllNguoiDung();
    }

    @GetMapping("/{id}")
    public NguoiDung getNguoiDungById(@PathVariable String id) {
        return nguoiDungService.getNguoiDungById(id);
    }

    @PutMapping("/{id}")
    public String updateNguoiDungById(@PathVariable String id, @RequestBody NguoiDungUpdateRequest request) {
        return nguoiDungService.updateNguoiDung(id, request);
    }
}

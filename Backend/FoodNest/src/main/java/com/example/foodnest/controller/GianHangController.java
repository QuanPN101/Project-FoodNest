package com.example.foodnest.controller;

import com.example.foodnest.dto.request.GianHangCreateRequest;
import com.example.foodnest.dto.response.GianHangResponse;
import com.example.foodnest.dto.request.GianHangUpdateRequest;
import com.example.foodnest.service.GianHangService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/gianhang")
public class GianHangController {

    private final GianHangService gianHangService;

    public GianHangController(GianHangService gianHangService) {
        this.gianHangService = gianHangService;
    }

    // Tạo gian hàng - cần truyền maNguoiDung từ Header hoặc SecurityContext
    @PostMapping
    public ResponseEntity<GianHangResponse> createGianHang(@Valid @RequestBody GianHangCreateRequest request,
                                                           @RequestHeader("X-User-Id") String maNguoiDung) {
        GianHangResponse response = gianHangService.createGianHang(request, maNguoiDung);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{maGianHang}")
    public ResponseEntity<GianHangResponse> updateGianHang(@PathVariable String maGianHang,
                                                           @Valid @RequestBody GianHangUpdateRequest request) {
        GianHangResponse response = gianHangService.updateGianHang(maGianHang, request);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{maGianHang}")
    public ResponseEntity<Void> deleteGianHang(@PathVariable String maGianHang) {
        gianHangService.deleteGianHang(maGianHang);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{maGianHang}")
    public ResponseEntity<GianHangResponse> getGianHangById(@PathVariable String maGianHang) {
        GianHangResponse response = gianHangService.getGianHangById(maGianHang);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<GianHangResponse>> getAllGianHang() {
        List<GianHangResponse> list = gianHangService.getAllGianHang();
        return ResponseEntity.ok(list);
    }

    @GetMapping("/nguoidung/{maNguoiDung}")
    public ResponseEntity<List<GianHangResponse>> getGianHangByMaNguoiDung(@PathVariable String maNguoiDung) {
        List<GianHangResponse> responseList = gianHangService.findByMaNguoiDung(maNguoiDung);
        return ResponseEntity.ok(responseList);
    }
}

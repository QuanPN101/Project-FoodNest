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

    @PostMapping
    public ResponseEntity<GianHangResponse> createGianHang(@Valid @RequestBody GianHangCreateRequest request) {
        GianHangResponse response = gianHangService.createGianHang(request);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<GianHangResponse> updateGianHang(@PathVariable("id") int id,
                                                           @RequestBody GianHangUpdateRequest request) {
        GianHangResponse response = gianHangService.updateGianHang(id, request);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGianHang(@PathVariable("id") int id) {
        gianHangService.deleteGianHang(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<GianHangResponse> getGianHangById(@PathVariable("id") int id) {
        GianHangResponse response = gianHangService.getGianHangById(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<GianHangResponse>> getAllGianHang() {
        List<GianHangResponse> list = gianHangService.getAllGianHang();
        return ResponseEntity.ok(list);
    }
}

package com.example.foodnest.controller;

import com.example.foodnest.dto.request.*;
import com.example.foodnest.service.GianHangService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.net.URI;

import java.util.List;
@RestController
@RequestMapping("/api/gianhang")
@CrossOrigin(origins = "http://localhost:3000")
public class GianHangController {

    private final GianHangService gianHangService;

    public GianHangController(GianHangService gianHangService) {
        this.gianHangService = gianHangService;
    }

    @PostMapping
    public ResponseEntity<GianHangResponse> createGianHang(@Valid @RequestBody GianHangCreateRequest request) {
        GianHangResponse response = gianHangService.createGianHang(request);
        URI location = URI.create("/api/gianhang/" + response.getMaGianHang());
        return ResponseEntity.created(location).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<GianHangResponse> updateGianHang(@PathVariable("id") String id,
                                                           @Valid @RequestBody GianHangUpdateRequest request) {
        GianHangResponse response = gianHangService.updateGianHang(id, request);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGianHang(@PathVariable("id") String id) {
        gianHangService.deleteGianHang(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<GianHangResponse> getGianHangById(@PathVariable("id") String id) {
        GianHangResponse response = gianHangService.getGianHangById(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<GianHangResponse>> getAllGianHang() {
        List<GianHangResponse> list = gianHangService.getAllGianHang();
        return ResponseEntity.ok(list);
    }

    @PostMapping("/search")
    public ResponseEntity<Page<GianHangSearchResponse>> searchGianHang(@Valid @RequestBody GianHangSearchRequest request) {
        Page<GianHangSearchResponse> result = gianHangService.searchGianHang(request);
        return ResponseEntity.ok(result);
    }

}

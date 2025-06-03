package com.example.foodnest.controller;

import com.example.foodnest.dto.request.GianHangCreateRequest;
import com.example.foodnest.dto.response.GianHangResponse;
import com.example.foodnest.dto.request.GianHangUpdateRequest;
import com.example.foodnest.entity.GianHang;
import com.example.foodnest.entity.NguoiDung;
import com.example.foodnest.repository.GianHangRepository;
import com.example.foodnest.service.GianHangService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/gianhang")
@CrossOrigin(
        origins = {
                "http://localhost:3000",
        }
)
public class GianHangController {

    private final GianHangService gianHangService;
    private final GianHangRepository gianHangRepository;

    public GianHangController(GianHangService gianHangService, GianHangRepository gianHangRepository) {
        this.gianHangService = gianHangService;
        this.gianHangRepository = gianHangRepository;
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

    @GetMapping("/timkiem")
    public Page<GianHang> timKiemGianHang(
            @RequestParam(defaultValue = "") String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "7") int size){
        Pageable pageable = PageRequest.of(page, size, Sort.by("TenGianHang").ascending());
        return  gianHangRepository.findByTenGianHangContaining(keyword, pageable);
    }

}

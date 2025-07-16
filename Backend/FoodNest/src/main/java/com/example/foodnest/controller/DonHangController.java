package com.example.foodnest.controller;

import com.example.foodnest.dto.request.DonHangCreateRequest;
import com.example.foodnest.dto.response.DonHangRespone;
import com.example.foodnest.entity.DonHang;
import com.example.foodnest.repository.ChiTietDonHangRepository;
import com.example.foodnest.repository.DonHangRepository;
import com.example.foodnest.service.DonHangService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/donhang")
@CrossOrigin(origins = "*")
public class DonHangController {
    @Autowired
    private DonHangService donHangService;
    @Autowired
    private DonHangRepository donHangRepository;
    @Autowired
    private ChiTietDonHangRepository chiTietDonHangRepository;

    @GetMapping
    public List<DonHang> getAllDonHang() {
        return donHangService.getALlDonHang();
    }

    @GetMapping("/with-nguoidung")
    public List<DonHang> getAllDonHangWithNguoiDung() {
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
    @PostMapping
    public DonHang addDonHang(@ModelAttribute DonHangCreateRequest request) {
        return donHangService.createDonHang(request);
    }

    @GetMapping("/getByUserId/{id}")
    public List<DonHangRespone>  getDonHangByUserId (@PathVariable  String id){
        return donHangService.getDonHangByUserId(id);
    }

    @PutMapping("/{id}/trangthai")
    public ResponseEntity<?> capNhatTrangThaiDonHang(
            @PathVariable String id,
            @RequestBody Map<String, String> body
    ) {
        String trangThaiMoi = body.get("trangThai");

        Optional<DonHang> optional = donHangRepository.findById(id);
        if (optional.isEmpty()) return ResponseEntity.notFound().build();

        DonHang donHang = optional.get();
        donHang.setTrangThaiDonHang(trangThaiMoi);
        donHangRepository.save(donHang);

        return ResponseEntity.ok("Cập nhật trạng thái thành công");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> xoaDonHang(@PathVariable String id) {
        try {
            donHangService.xoaDonHangVaChiTiet(id);
            return ResponseEntity.ok("Đã xóa đơn hàng và chi tiết");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Lỗi: " + e.getMessage());
        }
    }

}
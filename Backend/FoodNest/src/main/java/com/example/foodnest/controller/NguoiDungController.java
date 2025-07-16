package com.example.foodnest.controller;

import com.example.foodnest.dto.request.NguoiDungChangePassRequest;
import com.example.foodnest.dto.response.ApiResponse;
import com.example.foodnest.dto.request.NguoiDungCreateRequest;
import com.example.foodnest.dto.request.NguoiDungUpdateRequest;
import com.example.foodnest.entity.NguoiDung;
import com.example.foodnest.repository.DonHangRepository;
import com.example.foodnest.repository.GianHangRepository;
import com.example.foodnest.repository.NguoiDungRepository;
import com.example.foodnest.service.NguoiDungService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/nguoidung")
@CrossOrigin(origins = "*")
public class NguoiDungController {
    @Autowired
    private NguoiDungService nguoiDungService;
    @Autowired
    NguoiDungRepository nguoiDungRepository;
    @Autowired
    DonHangRepository donHangRepository;
    @Autowired
    GianHangRepository gianHangRepository;

    @PostMapping
    public ApiResponse<NguoiDung> createNguoiDung(@RequestBody NguoiDungCreateRequest request) {
        return ApiResponse.<NguoiDung>builder()
                .code(1000)
                .result(nguoiDungService.createNguoiDung(request))
                .message("Successfully Created NguoiDung")
                .build();
    }

    @GetMapping("/can-delete/{id}")
    public ResponseEntity<Boolean> coTheXoaNguoiDung(@PathVariable String id) {
        Optional<NguoiDung> nguoiDungOpt = nguoiDungRepository.findById(id);

        if (nguoiDungOpt.isEmpty()) {
            return ResponseEntity.ok(false);
        }

        NguoiDung nguoiDung = nguoiDungOpt.get();

        long coDonHang = donHangRepository.countByMaNguoiDung_MaNguoiDung(id);
        boolean coGianHang = gianHangRepository.existsByNguoiDung_MaNguoiDung(id);
        boolean dangHoatDong = Boolean.TRUE.equals(nguoiDung.getTrangThai());

        boolean coTheXoa = !(coDonHang > 0) && !coGianHang && !dangHoatDong;

        return ResponseEntity.ok(coTheXoa);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> xoaNguoiDung(@PathVariable String id) {
        try {
            long donHangCount = donHangRepository.countByMaNguoiDung_MaNguoiDung(id);
            if (donHangCount > 0) {
                return ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .body("Không thể xóa người dùng vì đã có đơn hàng.");
            }
            if (gianHangRepository.existsByNguoiDung_MaNguoiDung(id)) {
                return ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .body("Không thể xóa người dùng vì đã có gian hàng.");
            }

            nguoiDungRepository.deleteById(id);
            return ResponseEntity.ok("Xóa người dùng thành công");
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Lỗi hệ thống khi xóa người dùng: " + e.getMessage());
        }
    }

    @GetMapping
    public List<NguoiDung> getAllNguoiDung() {
        return nguoiDungService.getAllNguoiDung();
    }

    @GetMapping("/getAccount/{maVaiTro}")
    public List<NguoiDung> getAllByMaVaiTro(@PathVariable int maVaiTro) {
        return nguoiDungRepository.getAllByMaVaiTro(maVaiTro);
    }

    @GetMapping("/{id}")
    public NguoiDung getNguoiDungById(@PathVariable String id) {
        return nguoiDungService.getNguoiDungById(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateNguoiDungById(@PathVariable String id, @RequestBody NguoiDungUpdateRequest request) {
        try {
            String result = nguoiDungService.updateNguoiDung(id, request);
            return ResponseEntity.ok(result);
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        }
    }

    @GetMapping("/timkiem")
    public Page<NguoiDung> timKiemNguoiDung(
            @RequestParam(defaultValue = "") String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "7") int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("HoTen").ascending());
        return nguoiDungRepository.findByHoTenContaining(keyword, pageable);
    }

    @PutMapping("/{id}/doimatkhau")
    public ResponseEntity<?> doiMatKhau(
            @PathVariable("id") String maNguoiDung,
            @RequestBody NguoiDungChangePassRequest request) {

        boolean result = nguoiDungService.doiMatKhau(maNguoiDung, request.getCurrentPassword(), request.getNewPassword());

        if (!result) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Collections.singletonMap("message", "Mật khẩu hiện tại không đúng hoặc người dùng không tồn tại."));
        }

        return ResponseEntity.ok(Collections.singletonMap("message", "Đổi mật khẩu thành công."));
    }

}

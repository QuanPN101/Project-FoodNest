package com.example.foodnest.controller;

import com.example.foodnest.dto.request.NguoiDungChangePassRequest;
import com.example.foodnest.dto.response.ApiResponse;
import com.example.foodnest.dto.request.NguoiDungCreateRequest;
import com.example.foodnest.dto.request.NguoiDungUpdateRequest;
import com.example.foodnest.entity.NguoiDung;
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

@RestController
@RequestMapping("/api/nguoidung")
@CrossOrigin(origins = "*")
public class NguoiDungController {
    @Autowired
    private NguoiDungService nguoiDungService;
    @Autowired
    NguoiDungRepository nguoiDungRepository;

    @PostMapping
    public ApiResponse<NguoiDung> createNguoiDung(@RequestBody NguoiDungCreateRequest request) {
        return ApiResponse.<NguoiDung>builder()
                .code(1000)
                .result(nguoiDungService.createNguoiDung(request))
                .message("Successfully Created NguoiDung")
                .build();
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

package com.example.foodnest.service.impl;

import com.example.foodnest.dto.request.*;
import com.example.foodnest.dto.request.GianHangCreateRequest;
import com.example.foodnest.dto.request.GianHangUpdateRequest;
import com.example.foodnest.dto.response.GianHangResponse;
import com.example.foodnest.entity.GianHang;
import com.example.foodnest.entity.NguoiDung;
import com.example.foodnest.mapper.GianHangMapper;
import com.example.foodnest.repository.GianHangRepository;
import com.example.foodnest.repository.NguoiDungRepository;
import com.example.foodnest.service.GianHangService;
import com.example.foodnest.specification.GianHangSpecification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class GianHangServiceImpl implements GianHangService {

    private final GianHangRepository gianHangRepository;
    private final NguoiDungRepository nguoiDungRepository;
    private final GianHangMapper gianHangMapper;

    public GianHangServiceImpl(GianHangRepository gianHangRepository,
                               NguoiDungRepository nguoiDungRepository,
                               GianHangMapper gianHangMapper) {
        this.gianHangRepository = gianHangRepository;
        this.nguoiDungRepository = nguoiDungRepository;
        this.gianHangMapper = gianHangMapper;
    }

    @Override
    public GianHangResponse createGianHang(GianHangCreateRequest request) {
        if (request.getMaNguoiDung() == null || request.getMaNguoiDung().isEmpty()) {
            throw new IllegalArgumentException("Mã người dùng không được để trống");
        }

        NguoiDung nguoiDung = nguoiDungRepository.findById(request.getMaNguoiDung())
                .orElseThrow(() -> new NoSuchElementException("Người dùng không tồn tại"));

        boolean exists = gianHangRepository.existsByNguoiDung(nguoiDung);
        if (exists) {
            throw new IllegalArgumentException("Người dùng đã có gian hàng, không thể tạo thêm.");
        }

        if (gianHangRepository.existsByTenGianHang(request.getTenGianHang())) {
            throw new IllegalArgumentException("Tên gian hàng đã tồn tại, vui lòng chọn tên khác.");
        }

        GianHang gianHang = gianHangMapper.toGianHang(request);
        gianHang.setNguoiDung(nguoiDung);
        gianHang.setTrangThai(true);
        gianHang.setNgayTao(java.time.LocalDateTime.now());

        GianHang saved = gianHangRepository.save(gianHang);
        return gianHangMapper.toGianHangResponse(saved);
    }


    @Override
    public GianHangResponse updateGianHang(String maGianHang, GianHangUpdateRequest request) {
        GianHang gianHang = gianHangRepository.findById(maGianHang)
                .orElseThrow(() -> new NoSuchElementException("Gian hàng không tồn tại"));

        // Kiểm tra nếu tên mới khác với tên cũ và đã bị trùng
        if (!gianHang.getTenGianHang().equals(request.getTenGianHang()) &&
                gianHangRepository.existsByTenGianHang(request.getTenGianHang())) {
            throw new IllegalArgumentException("Tên gian hàng đã tồn tại, vui lòng chọn tên khác.");
        }

        gianHangMapper.updateGianHang(request, gianHang);
        GianHang updated = gianHangRepository.save(gianHang);
        return gianHangMapper.toGianHangResponse(updated);
    }


    @Override
    public void deleteGianHang(String maGianHang) {
        if (!gianHangRepository.existsById(maGianHang)) {
            throw new NoSuchElementException("Gian hàng không tồn tại");
        }
        gianHangRepository.deleteById(maGianHang);
    }

    @Override
    public GianHangResponse getGianHangById(String maGianHang) {
        GianHang gianHang = gianHangRepository.findById(maGianHang)
                .orElseThrow(() -> new NoSuchElementException("Gian hàng không tồn tại"));
        return gianHangMapper.toGianHangResponse(gianHang);
    }

    @Override
    public List<GianHangResponse> getAllGianHang() {
        List<GianHang> list = gianHangRepository.findAll();
        return list.stream()
                .map(gianHangMapper::toGianHangResponse)
                .collect(Collectors.toList());
    }

    @Override
    public Page<GianHangSearchResponse> searchGianHang(GianHangSearchRequest request) {
        Specification<GianHang> spec = Specification
                .where(GianHangSpecification.hasTenGianHangLike(request.getKeyWord()))
                .and(GianHangSpecification.hasDiaChiLike(request.getDiaChi()))
                .and(GianHangSpecification.hasTrangThai(request.getTrangThai()))
                .and(GianHangSpecification.hasMaNguoiDung(request.getMaNguoiDung()));

        Pageable pageable = PageRequest.of(request.getPage(), request.getSize());
        Page<GianHang> pageResult = gianHangRepository.findAll(spec, pageable);

        return pageResult.map(gianHang -> GianHangSearchResponse.builder()
                .maGianHang(gianHang.getMaGianHang())
                .tenGianHang(gianHang.getTenGianHang())
                .diaChi(gianHang.getDiaChi())
                .trangThai(gianHang.getTrangThai())
                .maNguoiDung(gianHang.getNguoiDung().getMaNguoiDung())
                .build());
    }

    public GianHang getGianHangByMaGianHang(String maGianHang) {
        return gianHangRepository.getGianHangByMaGianHang(maGianHang);
    }
}

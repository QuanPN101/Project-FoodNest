package com.example.foodnest.service.impl;

import com.example.foodnest.dto.request.*;
import com.example.foodnest.dto.response.GianHangResponse;
import com.example.foodnest.dto.response.GianHangSearchResponse;
import com.example.foodnest.entity.GianHang;
import com.example.foodnest.entity.NguoiDung;
import com.example.foodnest.mapper.GianHangMapper;
import com.example.foodnest.repository.GianHangRepository;
import com.example.foodnest.repository.NguoiDungRepository;
import com.example.foodnest.service.GianHangService;
import com.example.foodnest.specification.GianHangSpecification;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
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
    public GianHangResponse createGianHang(GianHangCreateRequest request, String maNguoiDung) {
        // Lấy người dùng theo maNguoiDung
        NguoiDung nguoiDung = nguoiDungRepository.findById(maNguoiDung)
                .orElseThrow(() -> new NoSuchElementException("Người dùng không tồn tại"));

        // Kiểm tra người dùng đã có gian hàng chưa
        boolean exists = gianHangRepository.existsByNguoiDung(nguoiDung);
        if (exists) {
            throw new IllegalArgumentException("Người dùng đã có gian hàng, không thể tạo thêm.");
        }

        // Kiểm tra tên gian hàng trùng
        if (gianHangRepository.existsByTenGianHang(request.getTenGianHang())) {
            throw new IllegalArgumentException("Tên gian hàng đã tồn tại, vui lòng chọn tên khác.");
        }

        GianHang gianHang = gianHangMapper.toGianHang(request);
        gianHang.setNguoiDung(nguoiDung);
        gianHang.setTrangThai(true);
        gianHang.setMaGianHang(UUID.randomUUID().toString());

        // ngayTao sẽ tự động được set nhờ @CreationTimestamp
        GianHang saved = gianHangRepository.save(gianHang);

        return gianHangMapper.toGianHangResponse(saved);
    }

    @Override
    public GianHangResponse updateGianHang(String maGianHang, GianHangUpdateRequest request) {
        GianHang gianHang = gianHangRepository.findById(maGianHang)
                .orElseThrow(() -> new NoSuchElementException("Gian hàng không tồn tại"));

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
                .where(GianHangSpecification.hasTenGianHangLike(request.getTenGianHang()))
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

    @Override
    public GianHang getGianHangByMaGianHang(String maGianHang) {
        return gianHangRepository.findById(maGianHang)
                .orElseThrow(() -> new NoSuchElementException("Không tìm thấy gian hàng"));
    }



    @Override
    public List<GianHangResponse> findByMaNguoiDung(String maNguoiDung) {
        List<GianHang> gianHangs = gianHangRepository.findByNguoiDung_MaNguoiDung(maNguoiDung);
        if (gianHangs.isEmpty()) {
            throw new NoSuchElementException("Không tìm thấy gian hàng cho người dùng: " + maNguoiDung);
        }
        return gianHangs.stream()
                .map(gianHangMapper::toGianHangResponse)
                .collect(Collectors.toList());
    }


}
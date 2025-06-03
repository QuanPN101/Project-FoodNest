package com.example.foodnest.service.impl;

import com.example.foodnest.dto.request.GianHangCreateRequest;
import com.example.foodnest.dto.request.GianHangUpdateRequest;
import com.example.foodnest.dto.response.GianHangResponse;
import com.example.foodnest.entity.GianHang;
import com.example.foodnest.entity.NguoiDung;
import com.example.foodnest.mapper.GianHangMapper;
import com.example.foodnest.repository.GianHangRepository;
import com.example.foodnest.repository.NguoiDungRepository;
import com.example.foodnest.service.GianHangService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
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
        // Tìm NguoiDung bằng cách lấy ID dạng String
        String id = request.getMaNguoiDung();
        NguoiDung nguoiDung = nguoiDungRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Người dùng không tồn tại"));

        // Map CreateRequest -> Entity
        GianHang gianHang = gianHangMapper.toGianHang(request);

        // Gán đối tượng NguoiDung
        gianHang.setNguoiDung(nguoiDung);

        // Thiết lập các trường còn lại
        gianHang.setTrangThai(true);
        gianHang.setNgayTao(java.time.LocalDateTime.now());

        // Lưu entity
        GianHang saved = gianHangRepository.save(gianHang);

        // Map Entity -> Response và trả về
        return gianHangMapper.toGianHangResponse(saved);
    }

    @Override
    public GianHangResponse updateGianHang(int maGianHang, GianHangUpdateRequest request) {
        GianHang gianHang = gianHangRepository.findById(maGianHang)
                .orElseThrow(() -> new NoSuchElementException("Gian hàng không tồn tại"));

        gianHangMapper.updateGianHang(request, gianHang);

        GianHang updated = gianHangRepository.save(gianHang);
        return gianHangMapper.toGianHangResponse(updated);
    }

    @Override
    public void deleteGianHang(int maGianHang) {
        if (!gianHangRepository.existsById(maGianHang)) {
            throw new NoSuchElementException("Gian hàng không tồn tại");
        }
        gianHangRepository.deleteById(maGianHang);
    }

    @Override
    public GianHangResponse getGianHangById(int maGianHang) {
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
    public GianHang getGianHangByMaGianHang(int maGianHang) {
        return gianHangRepository.getGianHangByMaGianHang(maGianHang);
    }
}

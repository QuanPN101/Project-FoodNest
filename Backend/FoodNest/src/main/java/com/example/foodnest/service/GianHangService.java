package com.example.foodnest.service;

import com.example.foodnest.dto.request.*;
import com.example.foodnest.dto.response.GianHangSearchResponse;
import org.springframework.data.domain.Page;
import com.example.foodnest.dto.response.GianHangResponse;
import com.example.foodnest.entity.GianHang;

import java.util.List;
import java.util.Optional;

public interface GianHangService {
    GianHangResponse createGianHang(GianHangCreateRequest request, String maNguoiDung);
    GianHangResponse updateGianHang(String maGianHang, GianHangUpdateRequest request);
    void deleteGianHang(String maGianHang);
    GianHangResponse getGianHangById(String maGianHang);
    List<GianHangResponse> getAllGianHang();
    Page<GianHangSearchResponse> searchGianHang(GianHangSearchRequest request);

    GianHang getGianHangByMaGianHang(String maGianHang);
    List<GianHangResponse> findByMaNguoiDung(String maNguoiDung);
}

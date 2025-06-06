package com.example.foodnest.service;

import com.example.foodnest.dto.request.*;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;
import com.example.foodnest.dto.request.GianHangCreateRequest;
import com.example.foodnest.dto.request.GianHangUpdateRequest;
import com.example.foodnest.dto.response.GianHangResponse;
import com.example.foodnest.entity.GianHang;

import java.util.List;

public interface GianHangService {
    GianHangResponse createGianHang(GianHangCreateRequest request);
    GianHangResponse updateGianHang(String maGianHang, GianHangUpdateRequest request);
    void deleteGianHang(String maGianHang);
    GianHangResponse getGianHangById(String maGianHang);
    List<GianHangResponse> getAllGianHang();
    Page<GianHangSearchResponse> searchGianHang(GianHangSearchRequest request);

    GianHang getGianHangByMaGianHang(String maGianHang);
}

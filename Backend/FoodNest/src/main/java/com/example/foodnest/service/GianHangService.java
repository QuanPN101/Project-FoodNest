package com.example.foodnest.service;

import com.example.foodnest.dto.request.GianHangCreateRequest;
import com.example.foodnest.dto.request.GianHangUpdateRequest;
import com.example.foodnest.dto.request.GianHangResponse;

import java.util.List;

public interface GianHangService {
    GianHangResponse createGianHang(GianHangCreateRequest request);
    GianHangResponse updateGianHang(int maGianHang, GianHangUpdateRequest request);
    void deleteGianHang(int maGianHang);
    GianHangResponse getGianHangById(int maGianHang);
    List<GianHangResponse> getAllGianHang();
}

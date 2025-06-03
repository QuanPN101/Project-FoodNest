package com.example.foodnest.service;

import com.example.foodnest.dto.request.*;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface GianHangService {
    GianHangResponse createGianHang(GianHangCreateRequest request);
    GianHangResponse updateGianHang(int maGianHang, GianHangUpdateRequest request);
    void deleteGianHang(int maGianHang);
    GianHangResponse getGianHangById(int maGianHang);
    List<GianHangResponse> getAllGianHang();
    Page<GianHangSearchResponse> searchGianHang(GianHangSearchRequest request);

}

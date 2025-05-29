package com.example.foodnest.mapper;

import com.example.foodnest.dto.request.GianHangCreateRequest;
import com.example.foodnest.dto.request.GianHangUpdateRequest;
import com.example.foodnest.dto.response.GianHangResponse;
import com.example.foodnest.entity.GianHang;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface GianHangMapper {

    // Map từ CreateRequest -> Entity
    @Mapping(source = "maNguoiDung", target = "nguoiDung.maNguoiDung")
    GianHang toGianHang(GianHangCreateRequest request);

    // Map từ Entity -> Response
    @Mapping(source = "nguoiDung.maNguoiDung", target = "maNguoiDung")
    @Mapping(source = "nguoiDung.hoTen", target = "hoTenChuGianHang")
    @Mapping(source = "nguoiDung.email", target = "emailChuGianHang")
    @Mapping(source = "nguoiDung.soDienThoai", target = "soDienThoaiChuGianHang")
    GianHangResponse toGianHangResponse(GianHang gianHang);

    // Cập nhật entity từ UpdateRequest
    void updateGianHang(GianHangUpdateRequest request, @MappingTarget GianHang gianHang);
}

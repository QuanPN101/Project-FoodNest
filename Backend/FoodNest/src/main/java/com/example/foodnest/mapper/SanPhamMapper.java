package com.example.foodnest.mapper;

import com.example.foodnest.dto.response.SanPhamResponse;
import com.example.foodnest.entity.GianHang;
import com.example.foodnest.entity.LoaiSanPham;
import com.example.foodnest.entity.SanPham;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface SanPhamMapper {
    @Mapping(source = "maGianHang.maGianHang", target = "maGianHang")
    SanPhamResponse toSanPhamResponse(SanPham sanPham);
}

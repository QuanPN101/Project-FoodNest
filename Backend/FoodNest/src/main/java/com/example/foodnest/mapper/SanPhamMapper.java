package com.example.foodnest.mapper;

import com.example.foodnest.dto.response.SanPhamResponse;
import com.example.foodnest.entity.SanPham;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface SanPhamMapper {
    SanPhamResponse toSanPhamResponse(SanPham sanPham);
}

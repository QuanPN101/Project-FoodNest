package com.example.foodnest.mapper;

import com.example.foodnest.dto.request.NguoiDungCreateRequest;
import com.example.foodnest.dto.request.NguoiDungUpdateRequest;
import com.example.foodnest.entity.NguoiDung;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface NguoiDungMapper {
    @Mapping(target = "maNguoiDung", ignore = true)
    NguoiDung toNguoiDung(NguoiDungCreateRequest request);
    void updateNguoiDung(NguoiDungUpdateRequest request, @MappingTarget NguoiDung nguoiDung);
}

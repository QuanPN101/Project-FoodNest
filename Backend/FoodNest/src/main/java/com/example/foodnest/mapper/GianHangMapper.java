package com.example.foodnest.mapper;

import com.example.foodnest.dto.request.GianHangCreateRequest;
import com.example.foodnest.dto.request.GianHangUpdateRequest;
import com.example.foodnest.dto.response.GianHangResponse;
import com.example.foodnest.entity.GianHang;
import com.example.foodnest.entity.NguoiDung;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Named;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.BeanMapping;

@Mapper(componentModel = "spring")
public interface GianHangMapper {

    // Hàm chuyển String maNguoiDung sang đối tượng NguoiDung (chỉ set maNguoiDung)
    @Named("stringToNguoiDung")
    default NguoiDung stringToNguoiDung(String maNguoiDung) {
        if (maNguoiDung == null || maNguoiDung.isEmpty()) {
            return null;
        }
        NguoiDung nguoiDung = new NguoiDung();
        nguoiDung.setMaNguoiDung(maNguoiDung);
        return nguoiDung;
    }

    // Map từ CreateRequest -> Entity với mapping dùng method trên
    @Mapping(source = "maNguoiDung", target = "nguoiDung", qualifiedByName = "stringToNguoiDung")
    GianHang toGianHang(GianHangCreateRequest request);

    // Map từ Entity -> Response với lấy thông tin chi tiết người dùng chủ gian hàng
    @Mapping(source = "nguoiDung.maNguoiDung", target = "maNguoiDung")
    @Mapping(source = "nguoiDung.hoTen", target = "hoTenChuGianHang")
    @Mapping(source = "nguoiDung.email", target = "emailChuGianHang")
    @Mapping(source = "nguoiDung.soDienThoai", target = "soDienThoaiChuGianHang")
    GianHangResponse toGianHangResponse(GianHang gianHang);

    // Cập nhật entity từ UpdateRequest, bỏ qua null để không ghi đè các trường không cập nhật
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateGianHang(GianHangUpdateRequest request, @MappingTarget GianHang gianHang);
}

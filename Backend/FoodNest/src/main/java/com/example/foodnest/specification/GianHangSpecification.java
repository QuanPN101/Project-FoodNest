package com.example.foodnest.specification;

import com.example.foodnest.entity.GianHang;
import org.springframework.data.jpa.domain.Specification;

public class GianHangSpecification {

    public static Specification<GianHang> hasTenGianHangLike(String keyWord) {
        return (root, query, builder) ->
                keyWord == null ? null :
                        builder.like(builder.lower(root.get("tenGianHang")), "%" + keyWord.toLowerCase() + "%");
    }

    public static Specification<GianHang> hasDiaChiLike(String diaChi) {
        return (root, query, builder) ->
                diaChi == null ? null :
                        builder.like(builder.lower(root.get("diaChi")), "%" + diaChi.toLowerCase() + "%");
    }

    public static Specification<GianHang> hasTrangThai(Boolean trangThai) {
        return (root, query, builder) ->
                trangThai == null ? null :
                        builder.equal(root.get("trangThai"), trangThai);
    }

    public static Specification<GianHang> hasMaNguoiDung(String maNguoiDung) {
        return (root, query, builder) ->
                maNguoiDung == null ? null :
                        builder.equal(root.get("nguoiDung").get("maNguoiDung"), maNguoiDung);
    }
}

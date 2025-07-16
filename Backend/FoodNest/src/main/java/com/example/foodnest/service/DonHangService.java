package com.example.foodnest.service;

import com.example.foodnest.dto.request.ChiTietSanPhamRequest;
import com.example.foodnest.dto.request.DonHangCreateRequest;
import com.example.foodnest.dto.response.ChiTietDonHangResponse;
import com.example.foodnest.dto.response.DonHangRespone;
import com.example.foodnest.dto.response.SanPhamResponse;
import com.example.foodnest.entity.ChiTietDonHang;
import com.example.foodnest.entity.DonHang;
import com.example.foodnest.entity.NguoiDung;
import com.example.foodnest.entity.SanPham;
import com.example.foodnest.repository.*;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.*;

@Service
//@RequiredArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class DonHangService {
    private DonHangRepository donHangRepository;
    private NguoiDungRepository nguoiDungRepository;
    private SanPhamRepository sanPhamRepository;
    private ChiTietDonHangRepository chiTietDonHangRepository;
    public List<DonHang> getAllWithNguoiDung() {
        return  donHangRepository.findAllWithNguoiDung();
    }

    public List<DonHang> getALlDonHang() {
        return  donHangRepository.findAll();
    }

    @Transactional
    public void xoaDonHangVaChiTiet(String maDonHang) {
        // Xoá chi tiết đơn hàng trước
        chiTietDonHangRepository.deleteByMaDonHang_MaDonHang(maDonHang);

        // Sau đó xoá đơn hàng
        donHangRepository.deleteById(maDonHang);
    }

    public Page<DonHang> searchDonHang(String trangThai, String tenNguoiDung, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("maDonHang").descending());
        return donHangRepository.searchByFilters(trangThai, tenNguoiDung, pageable);
    }

    public DonHang createDonHang(DonHangCreateRequest request){
        DonHang donHang = new DonHang();
        donHang.setTrangThaiDonHang(request.getTrangThai());
        LocalDateTime now = LocalDateTime.now();
        donHang.setNgayDat(Instant.now());
        donHang.setDiaChiGiaoHang(request.getDiaChiGiaoHang());
        donHang.setEmail(request.getEmail());
        donHang.setHoTen(request.getHoTen());
        donHang.setSoDienThoai(request.getSoDienThoai());
        donHang.setPhuongThucThanhToan(request.getPhuongThucThanhToan());
        NguoiDung nguoiDung =  nguoiDungRepository.findById(request.getMaNguoiDung())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng."));
        donHang.setMaNguoiDung(nguoiDung);
        donHang.setTongTien(request.getTongTien());
        DonHang saved = donHangRepository.save(donHang);
        for(ChiTietSanPhamRequest sp : request.getChiTietSanPham()){
            ChiTietDonHang chiTietDonHang = new ChiTietDonHang();
            chiTietDonHang.setMaDonHang(saved);
            chiTietDonHang.setSoLuong(sp.getSoLuong());
            SanPham sanPham = sanPhamRepository.findById(sp.getMaSanPham())
                    .orElseThrow(() -> new RuntimeException("Không tìm thay san pham."));
            chiTietDonHang.setMaSanPham(sanPham);
            chiTietDonHang.setDonGia(sp.getGia());
            chiTietDonHangRepository.save(chiTietDonHang);
        }
        return saved;
    }

    public List<DonHangRespone> getDonHangByUserId(String userId) {
        NguoiDung nguoiDung = nguoiDungRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng."));

        List<DonHang> listDonHang = donHangRepository.findByMaNguoiDung(nguoiDung);
        List<DonHangRespone> donHangResponeList = new ArrayList<>();
        for(DonHang donHang : listDonHang){
            DonHangRespone donHangRespone = DonHangRespone.builder()
                    .maDonHang(donHang.getMaDonHang())
                    .email(donHang.getEmail())
                    .trangThaiDonHang(donHang.getTrangThaiDonHang())
                    .hoTen(donHang.getHoTen())
                    .soDienThoai(donHang.getSoDienThoai())
                    .ngayDat(donHang.getNgayDat())
                    .phuongThucThanhToan(donHang.getPhuongThucThanhToan())
                    .diaChiGiaoHang(donHang.getDiaChiGiaoHang())
                    .tongTien(donHang.getTongTien())
                    .build();

            List<ChiTietDonHang> listChiTietDonHang = chiTietDonHangRepository.findByMaDonHang(donHang);
            List<ChiTietDonHangResponse> listChiTietDonHangResponseList = new ArrayList<>();
            for(ChiTietDonHang chiTietDonHang : listChiTietDonHang){
                SanPhamResponse sanPhamResponse = SanPhamResponse.builder()
                        .maSanPham(chiTietDonHang.getMaSanPham().getMaSanPham())
                        .tenSanPham(chiTietDonHang.getMaSanPham().getTenSanPham())
                        .gia(chiTietDonHang.getMaSanPham().getGia())
                        .anhChinh(chiTietDonHang.getMaSanPham().getAnhChinh()).build();
                ChiTietDonHangResponse chiTietDonHangResponse = ChiTietDonHangResponse
                        .builder()
                        .id(chiTietDonHang.getId())
                        .donGia(chiTietDonHang.getDonGia())
                        .soLuong(chiTietDonHang.getSoLuong())
                        .maSanPham(sanPhamResponse)
                        .build();

                listChiTietDonHangResponseList.add(chiTietDonHangResponse);
            }
            donHangRespone.setDsChiTietDonHang(listChiTietDonHangResponseList);
            donHangResponeList.add(donHangRespone);

        }

        return donHangResponeList;
    }
}

package com.example.foodnest.service;

import com.example.foodnest.dto.request.NguoiDungCreateRequest;
import com.example.foodnest.dto.request.NguoiDungUpdateRequest;
import com.example.foodnest.entity.NguoiDung;
import com.example.foodnest.mapper.NguoiDungMapper;
import com.example.foodnest.repository.DonHangRepository;
import com.example.foodnest.repository.NguoiDungRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class NguoiDungService {
    @Autowired
    private NguoiDungRepository nguoiDungRepository;
    @Autowired
    private DonHangRepository donHangRepository;
    @Autowired
    NguoiDungMapper nguoiDungMapper;

    public NguoiDung createNguoiDung(NguoiDungCreateRequest request) {

        if (nguoiDungRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email đã được sử dụng.");
        }

        NguoiDung nguoiDung = nguoiDungMapper.toNguoiDung(request);
        nguoiDung.setMaVaiTro(3);
        return nguoiDungRepository.save(nguoiDung);
    }


    public void xoaNguoiDung(String id) {
        if (!nguoiDungRepository.existsById(id)) {
            throw new RuntimeException("Người dùng không tồn tại.");
        }

        long soLuongDonHang = donHangRepository.countByMaNguoiDung_MaNguoiDung(id);
        if (soLuongDonHang > 0) {
            throw new RuntimeException("Không thể xóa người dùng đã có đơn hàng.");
        }

        nguoiDungRepository.deleteById(id);
    }

    public List<NguoiDung> getAllNguoiDung() {
        return nguoiDungRepository.findAll();
    }

    public NguoiDung getNguoiDungById(String id) {
        return nguoiDungRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng."));
    }

    public String updateNguoiDung(String id, NguoiDungUpdateRequest request) {
        NguoiDung existingNguoiDung = nguoiDungRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Người dùng không tồn tại"));

        // Cập nhật mật khẩu nếu có
        if (request.getMatKhau() != null && !request.getMatKhau().isBlank()) {
            existingNguoiDung.setMatKhau(request.getMatKhau());
        }

        // Kiểm tra và cập nhật email nếu khác email hiện tại
        if (request.getEmail() != null && !request.getEmail().equals(existingNguoiDung.getEmail())) {
            boolean emailExists = nguoiDungRepository.existsByEmailAndMaNguoiDungNot(request.getEmail(), id);
            if (emailExists) {
                throw new RuntimeException("Email đã được sử dụng bởi người dùng khác");
            }
            existingNguoiDung.setEmail(request.getEmail());
        }

        // Kiểm tra và cập nhật số điện thoại nếu khác số hiện tại
        if (request.getSoDienThoai() != null && !request.getSoDienThoai().equals(existingNguoiDung.getSoDienThoai())) {
            boolean phoneExists = nguoiDungRepository.existsBySoDienThoaiAndMaNguoiDungNot(request.getSoDienThoai(), id);
            if (phoneExists) {
                throw new RuntimeException("Số điện thoại đã được sử dụng bởi người dùng khác");
            }
            existingNguoiDung.setSoDienThoai(request.getSoDienThoai());
        }

        // Cập nhật các trường còn lại qua mapper
        nguoiDungMapper.updateNguoiDung(request, existingNguoiDung);

        nguoiDungRepository.save(existingNguoiDung);

        return "Cập nhật thành công";
    }

    public Page<NguoiDung> timNguoiDung (String keyword,int page){
                Pageable pageable = PageRequest.of(page, 7, Sort.by("HoTen").ascending());
                return nguoiDungRepository.findByHoTenContaining(keyword, pageable);
            }

            public boolean doiMatKhau (String maNguoiDung, String currentPassword, String newPassword){
                Optional<NguoiDung> optionalNguoiDung = nguoiDungRepository.findById(maNguoiDung); // tránh null khi gọi từ csdl
                if (!optionalNguoiDung.isPresent()) {
                    return false;
                }
                NguoiDung nguoiDung = optionalNguoiDung.get();

                // Kiểm tra mật khẩu hiện tại có đúng không
                if (!currentPassword.equals(nguoiDung.getMatKhau())) {
                    return false;
                }

                nguoiDung.setMatKhau(newPassword);
                nguoiDungRepository.save(nguoiDung);
                return true;
            }
        }


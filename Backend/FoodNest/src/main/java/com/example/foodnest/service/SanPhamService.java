package com.example.foodnest.service;

import com.example.foodnest.dto.response.SanPhamResponse;
import com.example.foodnest.entity.SanPham;
import com.example.foodnest.mapper.SanPhamMapper;
import com.example.foodnest.repository.CloudinaryResponse;
import com.example.foodnest.repository.SanPhamRepository;
import com.example.foodnest.util.FileUploadUtil;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class SanPhamService {
    @Autowired
    private SanPhamRepository sanPhamRepository;

    @Autowired
    private CloudinaryService cloudinaryService;

    public List<SanPham> getAllSanPham(){
        List<SanPham> sp = sanPhamRepository.findAll();
        log.info(sp.toString());
        return sp;
    }

    public List<SanPham> findByLoaiSanPham_MaLoai(String maLoai) {
        return sanPhamRepository.findByLoaiSanPham_MaLoai(maLoai);
    }

    public SanPham getSanPhamById(String id){
        SanPham sanPham = sanPhamRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm."));

        log.info(sanPham.toString());

        return sanPham;
    }



    @Transactional
    public void uploadImage(final String id, final MultipartFile file) {
        final SanPham sanPham = this.sanPhamRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Sản phẩm không tồn tại"));

        FileUploadUtil.assertAllowed(file, FileUploadUtil.IMAGE_PATTERN);
        final String fileName = FileUploadUtil.getFileName(file.getOriginalFilename());
        final CloudinaryResponse response = this.cloudinaryService.uploadFile(file, fileName);
        sanPham.setAnhChinh(response.getUrl());
        this.sanPhamRepository.save(sanPham);
    }

}

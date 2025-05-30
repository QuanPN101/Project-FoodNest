package com.example.foodnest.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Nationalized;

import java.util.List;

@Getter
@Setter
@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class LoaiSanPham {
    @Id
    @Size(max = 50)
    @Nationalized
    @Column(name = "MaLoai", nullable = false, length = 50)
    private String maLoai;

    @Size(max = 100)
    @NotNull
    @Nationalized
    @Column(name = "TenLoai", nullable = false, length = 100)
    private String tenLoai;

    @Size(max = 255)
    @Nationalized
    @Column(name = "MoTa")
    private String moTa;

    @OneToMany(mappedBy = "loaiSanPham", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<SanPham> dsSanPham;
}
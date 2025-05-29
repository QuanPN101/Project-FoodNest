package com.example.foodnest.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.Nationalized;

import java.time.Instant;

@Getter
@Setter
@Entity
public class ThongBao {
    @Id
    @Column(name = "MaThongBao", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MaNguoiDung")
    private NguoiDung maNguoiDung;

    @Size(max = 255)
    @NotNull
    @Nationalized
    @Column(name = "NoiDung", nullable = false)
    private String noiDung;

    @Size(max = 50)
    @Nationalized
    @Column(name = "LoaiThongBao", length = 50)
    private String loaiThongBao;

    @ColumnDefault("0")
    @Column(name = "DaXem")
    private Boolean daXem;

    @ColumnDefault("getdate()")
    @Column(name = "NgayTao")
    private Instant ngayTao;

}
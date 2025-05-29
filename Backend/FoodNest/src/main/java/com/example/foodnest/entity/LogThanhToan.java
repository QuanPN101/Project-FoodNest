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
public class LogThanhToan {
    @Id
    @Column(name = "MaLogThanhToan", nullable = false)
    private Integer id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "MaDonHang", nullable = false)
    private DonHang maDonHang;

    @Size(max = 50)
    @NotNull
    @Nationalized
    @Column(name = "TrangThaiThanhToan", nullable = false, length = 50)
    private String trangThaiThanhToan;

    @ColumnDefault("getdate()")
    @Column(name = "NgayCapNhat")
    private Instant ngayCapNhat;

    @Size(max = 255)
    @Nationalized
    @Column(name = "GhiChu")
    private String ghiChu;

}
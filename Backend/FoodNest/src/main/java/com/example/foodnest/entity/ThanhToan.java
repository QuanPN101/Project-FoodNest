package com.example.foodnest.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.Nationalized;

import java.math.BigDecimal;
import java.time.Instant;

@Getter
@Setter
@Entity
public class ThanhToan {
    @Id
    @Column(name = "MaThanhToan", nullable = false)
    private Integer id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "MaDonHang", nullable = false)
    private DonHang maDonHang;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "MaPhuongThuc", nullable = false)
    private PhuongThucThanhToan maPhuongThuc;

    @NotNull
    @Column(name = "SoTien", nullable = false, precision = 18, scale = 2)
    private BigDecimal soTien;

    @ColumnDefault("getdate()")
    @Column(name = "NgayThanhToan")
    private Instant ngayThanhToan;

    @Size(max = 50)
    @Nationalized
    @ColumnDefault("N'Chưa thanh toán'")
    @Column(name = "TrangThaiThanhToan", length = 50)
    private String trangThaiThanhToan;

}
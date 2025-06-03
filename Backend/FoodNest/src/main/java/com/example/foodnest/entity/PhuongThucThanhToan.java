package com.example.foodnest.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Nationalized;

@Getter
@Setter
@Entity
public class PhuongThucThanhToan {
    @Id
    @Column(name = "MaPhuongThuc", nullable = false)
    private Integer id;

    @Size(max = 100)
    @NotNull
    @Nationalized
    @Column(name = "TenPhuongThuc", nullable = false, length = 100)
    private String tenPhuongThuc;

    @Size(max = 255)
    @Nationalized
    @Column(name = "MoTa")
    private String moTa;

}
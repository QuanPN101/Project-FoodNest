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
public class VaiTro {
    @Id
    @Column(name = "MaVaiTro", nullable = false)
    private Integer id;

    @Size(max = 50)
    @NotNull
    @Nationalized
    @Column(name = "TenVaiTro", nullable = false, length = 50)
    private String tenVaiTro;

    @Size(max = 255)
    @Nationalized
    @Column(name = "MoTa")
    private String moTa;

}
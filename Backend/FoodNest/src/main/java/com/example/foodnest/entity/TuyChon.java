package com.example.foodnest.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Nationalized;

@Getter
@Setter
@Entity
public class TuyChon {
    @Id
    @Size(max = 50)
    @Nationalized
    @Column(name = "MaTuyChon", nullable = false, length = 50)
    private String maTuyChon;

    @Size(max = 150)
    @Nationalized
    @Column(name = "TenTuyChon", length = 150)
    private String tenTuyChon;

    @Size(max = 100)
    @Nationalized
    @Column(name = "MoTa", length = 100)
    private String moTa;

    @Column(name = "TrangThai")
    private Boolean trangThai;

}
package com.example.foodnest.repository;

import com.example.foodnest.entity.NguoiDung;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface NguoiDungRepository extends JpaRepository<NguoiDung,String> {
    Optional<NguoiDung> findByEmail(String Email);
    boolean existsByEmail(String Email);
}

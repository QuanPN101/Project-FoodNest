package com.example.foodnest.service;


import com.example.foodnest.repository.TuyChonRepository;
import org.springframework.stereotype.Service;

@Service
public class TuyChonService {
    private final TuyChonRepository tuyChonRepository;
    public TuyChonService(TuyChonRepository tuyChonRepository) {
        this.tuyChonRepository = tuyChonRepository;
    }
}

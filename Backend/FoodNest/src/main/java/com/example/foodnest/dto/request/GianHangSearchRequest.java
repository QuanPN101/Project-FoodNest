package com.example.foodnest.dto.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GianHangSearchRequest {
    private String maNguoiDung;
    private String tenGianHang; // Tên gian hàng (gợi ý gần đúng)
    private String diaChi; // có thể để null
    private Boolean trangThai; // trạng thái: true (đang hoạt động) hoặc false (dừng hoạt động)
    private int page = 0; // mặc định trang 0
    private int size = 10; // mỗi trang 10 kết quả
}

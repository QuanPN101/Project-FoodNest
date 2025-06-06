package com.example.foodnest.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Data;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Data
@Builder
public class ApiResponse<T> {
    private int code = 1000;
    private String message;
    private T result;
}

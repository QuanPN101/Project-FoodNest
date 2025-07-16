package com.example.foodnest.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.NoSuchElementException;

    @RestControllerAdvice
    public class GlobalExceptionHandler {

        // Xử lý lỗi IllegalArgumentException
        @ExceptionHandler(IllegalArgumentException.class)
        public ResponseEntity<ErrorResponse> handleIllegalArgument(IllegalArgumentException ex) {
            ErrorResponse error = new ErrorResponse(
                    HttpStatus.BAD_REQUEST.value(),
                    ex.getMessage(),
                    LocalDateTime.now()
            );
            return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
        }

        // Xử lý lỗi khi không tìm thấy
        @ExceptionHandler(NoSuchElementException.class)
        public ResponseEntity<ErrorResponse> handleNotFound(NoSuchElementException ex) {
            ErrorResponse error = new ErrorResponse(
                    HttpStatus.NOT_FOUND.value(),
                    ex.getMessage(),
                    LocalDateTime.now()
            );
            return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
        }

        // Xử lý lỗi validate @Valid
        @ExceptionHandler(MethodArgumentNotValidException.class)
        public ResponseEntity<Map<String, String>> handleValidation(MethodArgumentNotValidException ex) {
            Map<String, String> errors = new HashMap<>();
            ex.getBindingResult().getFieldErrors().forEach(err ->
                    errors.put(err.getField(), err.getDefaultMessage()));
            return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        }

        // Xử lý lỗi chung chung
        @ExceptionHandler(Exception.class)
        public ResponseEntity<ErrorResponse> handleGeneric(Exception ex) {
            ErrorResponse error = new ErrorResponse(
                    HttpStatus.INTERNAL_SERVER_ERROR.value(),
                    "Lỗi hệ thống: " + ex.getMessage(),
                    LocalDateTime.now()
            );
            return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



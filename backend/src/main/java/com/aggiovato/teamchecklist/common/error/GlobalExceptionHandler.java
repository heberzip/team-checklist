package com.aggiovato.teamchecklist.common.error;

import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;
import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, Object> validation(MethodArgumentNotValidException ex) {
        return Map.of(
                "error","validation",
                "fields", ex.getBindingResult().getFieldErrors().stream().collect(
                        Collectors.toMap(
                                fe -> fe.getField(),
                                DefaultMessageSourceResolvable::getDefaultMessage,
                                (a,b)->a
                        )
                )
        );
    }
}

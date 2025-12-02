package com.whatsub.presentation.controller;

import com.whatsub.presentation.dto.GoogleLoginRequest;
import com.whatsub.application.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class AuthController {

    private final AuthService authService;

    @PostMapping("/api/google/login")
    public ResponseEntity<Void> login(
            @RequestBody final GoogleLoginRequest request
    ) {
        authService.login(request.code());
    }
}

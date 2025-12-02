package com.whatsub.presentation.controller;

import com.whatsub.application.AuthService;
import com.whatsub.presentation.dto.GoogleLoginRequest;
import com.whatsub.presentation.dto.LoginResponse;
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
    public ResponseEntity<LoginResponse> login(
            @RequestBody final GoogleLoginRequest request
    ) {
        LoginResponse response = authService.login(request.code());

        return ResponseEntity.ok(response);
    }
}

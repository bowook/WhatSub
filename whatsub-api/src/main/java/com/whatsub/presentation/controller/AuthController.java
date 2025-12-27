package com.whatsub.presentation.controller;

import com.whatsub.application.AuthFacade;
import com.whatsub.domain.auth.OAuthProvider;
import com.whatsub.presentation.dto.LoginRequest;
import com.whatsub.presentation.dto.LoginResponse;
import com.whatsub.presentation.dto.ReissueRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RequestMapping("/api/auth")
@RestController
public class AuthController {

    private final AuthFacade authFacade;

    @PostMapping("/login/{provider}")
    public ResponseEntity<LoginResponse> login(
            @PathVariable final OAuthProvider provider,
            @RequestBody final LoginRequest request
    ) {
        LoginResponse response = authFacade.login(provider, request);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/reissue")
    public ResponseEntity<LoginResponse> reissue(
            @RequestBody final ReissueRequest request
    ) {
        LoginResponse response = authFacade.reissue(request);

        return ResponseEntity.ok(response);
    }
}

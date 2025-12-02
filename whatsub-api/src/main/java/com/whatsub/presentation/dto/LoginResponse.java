package com.whatsub.presentation.dto;

public record LoginResponse(
        String accessToken,
        String refreshToken
) {
}

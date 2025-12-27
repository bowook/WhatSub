package com.whatsub.application.dto;

public record TokenGroup(
        String accessToken,
        String refreshToken
) {
}

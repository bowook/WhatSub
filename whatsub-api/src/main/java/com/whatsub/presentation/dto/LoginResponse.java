package com.whatsub.presentation.dto;

import com.whatsub.application.dto.TokenGroup;

public record LoginResponse(
        String accessToken,
        String refreshToken
) {

    public static LoginResponse from(final TokenGroup tokenGroup) {
        return new LoginResponse(tokenGroup.accessToken(), tokenGroup.refreshToken());
    }
}

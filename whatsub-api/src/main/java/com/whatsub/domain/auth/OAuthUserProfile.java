package com.whatsub.domain.auth;

public record OAuthUserProfile(
        String email,
        String name,
        String profileImageUrl,
        String served
) {
}

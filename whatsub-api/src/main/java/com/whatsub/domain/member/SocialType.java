package com.whatsub.domain.member;

import java.util.Arrays;

public enum SocialType {
    GOOGLE,
    KAKAO,
    NAVER,
    ;

    public static SocialType from(final String provider) {
        return Arrays.stream(values())
                .filter(type -> type.name().equalsIgnoreCase(provider))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("지원하지 않는 소셜 타입입니다: " + provider));
    }
}

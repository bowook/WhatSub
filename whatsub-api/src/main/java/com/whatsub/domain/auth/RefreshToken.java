package com.whatsub.domain.auth;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public class RefreshToken {
    
    private final String token;
    private final Long memberId;
}

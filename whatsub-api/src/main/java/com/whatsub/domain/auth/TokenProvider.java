package com.whatsub.domain.auth;

public interface TokenProvider {

    String createAccessToken(Long memberId);

    String createRefreshToken(Long memberId);
}

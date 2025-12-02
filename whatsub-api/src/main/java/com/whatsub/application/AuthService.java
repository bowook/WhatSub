package com.whatsub.application;

import com.whatsub.domain.auth.OAuthClient;
import com.whatsub.domain.auth.OAuthUserProfile;
import com.whatsub.domain.auth.RefreshToken;
import com.whatsub.domain.auth.RefreshTokenRepository;
import com.whatsub.domain.auth.TokenProvider;
import com.whatsub.domain.member.Member;
import com.whatsub.presentation.dto.LoginResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class AuthService {

    private final OAuthClient oAuthClient;
    private final MemberService memberService;
    private final TokenProvider tokenProvider;
    private final RefreshTokenRepository refreshTokenRepository;

    @Transactional(propagation = Propagation.NOT_SUPPORTED)
    public LoginResponse login(final String code) {
        OAuthUserProfile oAuthUserProfile = oAuthClient.getOAuthUserProfile(code);
        Member member = memberService.findOrCreate(oAuthUserProfile);
        String accessToken = tokenProvider.createAccessToken(member.getId());
        String refreshToken = tokenProvider.createRefreshToken(member.getId());

        refreshTokenRepository.save(new RefreshToken(refreshToken, member.getId()));

        return new LoginResponse(accessToken, refreshToken);
    }
}
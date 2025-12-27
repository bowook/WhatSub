package com.whatsub.application;

import com.whatsub.application.dto.TokenGroup;
import com.whatsub.domain.auth.OAuthProvider;
import com.whatsub.domain.auth.OAuthUserProfile;
import com.whatsub.domain.member.Member;
import com.whatsub.presentation.dto.LoginRequest;
import com.whatsub.presentation.dto.LoginResponse;
import com.whatsub.presentation.dto.ReissueRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class AuthFacade {

    private final AuthService authService;
    private final TokenService tokenService;
    private final MemberService memberService;

    public LoginResponse login(final OAuthProvider provider, final LoginRequest request) {
        OAuthUserProfile profile = authService.authenticate(provider, request.code());
        Member member = memberService.findOrCreate(profile);
        TokenGroup tokenGroup = tokenService.issueToken(member.getId());

        return LoginResponse.from(tokenGroup);
    }

    public LoginResponse reissue(final ReissueRequest request) {
        TokenGroup tokenGroup = tokenService.reissue(request.refreshToken());

        return LoginResponse.from(tokenGroup);
    }
}

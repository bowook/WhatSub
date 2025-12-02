package com.whatsub.application;

import com.whatsub.domain.auth.OAuthClient;
import com.whatsub.domain.auth.OAuthUserProfile;
import com.whatsub.domain.auth.TokenProvider;
import com.whatsub.domain.member.Member;
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

    @Transactional(propagation = Propagation.NOT_SUPPORTED)
    public String login(final String code) {
        OAuthUserProfile oAuthUserProfile = oAuthClient.getOAuthUserProfile(code);
        Member member = memberService.findOrCreate(oAuthUserProfile);

        return tokenProvider.createAccessToken(member.getId());
    }
}
package com.whatsub.application;

import com.whatsub.domain.auth.OAuthClient;
import com.whatsub.domain.auth.OAuthUserProfile;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class AuthService {

    private final OAuthClient oAuthClient;

    @Transactional(propagation = Propagation.NOT_SUPPORTED)
    public void login(final String code) {
        OAuthUserProfile oAuthUserProfile = oAuthClient.getOAuthUserProfile(code);

    }
}
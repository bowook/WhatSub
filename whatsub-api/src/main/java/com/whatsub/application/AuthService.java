package com.whatsub.application;

import com.whatsub.domain.auth.OAuthClient;
import com.whatsub.domain.auth.OAuthClients;
import com.whatsub.domain.auth.OAuthProvider;
import com.whatsub.domain.auth.OAuthUserProfile;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class AuthService {

    private final OAuthClients oAuthClients;

    public OAuthUserProfile authenticate(final OAuthProvider provider, final String code) {
        OAuthClient oAuthClient = oAuthClients.get(provider);

        return oAuthClient.getOAuthUserProfile(code);
    }
}

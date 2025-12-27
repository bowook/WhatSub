package com.whatsub.domain.auth;

public interface OAuthClient {

    OAuthProvider getProvider();

    OAuthUserProfile getOAuthUserProfile(String code);
}

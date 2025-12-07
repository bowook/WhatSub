package com.whatsub.domain.auth;

public interface OAuthClient {

    OAuthUserProfile getOAuthUserProfile(String code);
}

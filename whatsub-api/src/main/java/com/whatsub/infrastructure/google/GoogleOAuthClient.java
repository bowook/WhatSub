package com.whatsub.infrastructure.google;

import com.whatsub.domain.auth.OAuthClient;
import com.whatsub.domain.auth.OAuthUserProfile;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClient;

@Slf4j
@RequiredArgsConstructor
@Component
public class GoogleOAuthClient implements OAuthClient {

    private final RestClient googleRestClient;

    @Value("${oauth.google.client-id}")
    private String clientId;

    @Value("${oauth.google.client-secret}")
    private String clientSecret;

    @Value("${oauth.google.redirect-uri}")
    private String redirectUri;

    @Override
    public OAuthUserProfile getOAuthUserProfile(final String code) {
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("code", code);
        params.add("client_id", clientId);
        params.add("client_secret", clientSecret);
        params.add("redirect_uri", redirectUri);
        params.add("grant_type", "authorization_code");

        GoogleTokenResponse tokenResponse = googleRestClient.post()
                .uri("/token")
                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                .body(params)
                .retrieve()
                .body(GoogleTokenResponse.class);

        if (tokenResponse == null) {
            log.error("구글 토큰을 받아오지 못했습니다.");
            throw new RuntimeException("구글 토큰을 받아오지 못했습니다.");
        }

        return getUserProfile(tokenResponse.accessToken());
    }

    private OAuthUserProfile getUserProfile(String accessToken) {
        GoogleUserInfoResponse userInfo = googleRestClient.get()
                .uri("https://www.googleapis.com/oauth2/v2/userinfo") // 유저 정보 API
                .header("Authorization", "Bearer " + accessToken) // 헤더에 토큰 장착
                .retrieve()
                .body(GoogleUserInfoResponse.class);

        if (userInfo == null) {
            log.error("유저 정보를 받아오지 못했습니다.");
            throw new RuntimeException("구글 유저 정보를 받아오지 못했습니다.");
        }

        return new OAuthUserProfile(
                userInfo.email(),
                userInfo.name(),
                userInfo.picture(),
                "GOOGLE"
        );
    }
}

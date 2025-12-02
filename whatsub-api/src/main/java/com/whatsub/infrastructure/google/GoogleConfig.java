package com.whatsub.infrastructure.google;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestClient;

@Configuration
public class GoogleConfig {

    @Bean("googleRestClient")
    public RestClient googleRestClient(final RestClient.Builder builder) {
        return builder.baseUrl("https://oauth2.googleapis.com")
                .defaultHeader("Content-Type", "application/x-www-form-urlencoded")
                .build();
    }
}

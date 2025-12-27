package com.whatsub.domain.auth;

import java.util.EnumMap;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Component;

@Component
public class OAuthClients {

    private final Map<OAuthProvider, OAuthClient> oAuthClientMap;

    public OAuthClients(final List<OAuthClient> oAuthClientList) {
        this.oAuthClientMap = new EnumMap<>(OAuthProvider.class);

        for (OAuthClient client : oAuthClientList) {
            oAuthClientMap.put(client.getProvider(), client);
        }
    }

    public OAuthClient get(final OAuthProvider oAuthProvider) {
        return oAuthClientMap.get(oAuthProvider);
    }
}

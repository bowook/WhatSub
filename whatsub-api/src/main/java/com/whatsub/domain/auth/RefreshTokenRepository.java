package com.whatsub.domain.auth;

import java.util.Optional;

public interface RefreshTokenRepository {

    void save(RefreshToken refreshToken);

    Optional<RefreshToken> findByToken(String token);

    void delete(String token);
}

package com.whatsub.infrastructure.auth;

import com.whatsub.domain.auth.RefreshToken;
import com.whatsub.domain.auth.RefreshTokenRepository;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@RequiredArgsConstructor
@Repository
public class RefreshTokenRepositoryImpl implements RefreshTokenRepository {

    private final RefreshTokenJpaRepository jpaRepository;

    @Override
    public void save(final RefreshToken refreshToken) {
        jpaRepository.save(RefreshTokenEntity.from(refreshToken));
    }

    @Override
    public Optional<RefreshToken> findByToken(final String token) {
        return jpaRepository.findById(token)
                .map(RefreshTokenEntity::toModel);
    }

    @Override
    public void delete(final String token) {
        jpaRepository.deleteById(token);
    }
}

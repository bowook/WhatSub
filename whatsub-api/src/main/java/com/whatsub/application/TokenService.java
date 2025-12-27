package com.whatsub.application;

import com.whatsub.application.dto.TokenGroup;
import com.whatsub.domain.auth.RefreshToken;
import com.whatsub.domain.auth.RefreshTokenRepository;
import com.whatsub.domain.auth.TokenProvider;
import com.whatsub.domain.auth.exception.InvalidRefreshTokenException;
import com.whatsub.domain.auth.exception.UnAuthorizedException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class TokenService {

    private final TokenProvider tokenProvider;
    private final RefreshTokenRepository refreshTokenRepository;

    @Transactional
    public TokenGroup issueToken(final Long memberId) {
        return createAndSaveTokenGroup(memberId);
    }

    @Transactional
    public TokenGroup reissue(final String refreshToken) {
        RefreshToken savedToken = validateAndGetRefreshToken(refreshToken);

        return rotateRefreshToken(savedToken);
    }

    private RefreshToken validateAndGetRefreshToken(final String refreshToken) {
        if (!tokenProvider.validateToken(refreshToken)) {
            throw new UnAuthorizedException();
        }

        return refreshTokenRepository.findByToken(refreshToken)
                .orElseThrow(InvalidRefreshTokenException::new);
    }

    private TokenGroup rotateRefreshToken(final RefreshToken savedToken) {
        Long memberId = savedToken.getMemberId();

        refreshTokenRepository.delete(savedToken);

        return createAndSaveTokenGroup(memberId);
    }

    private TokenGroup createAndSaveTokenGroup(final Long memberId) {
        String accessToken = tokenProvider.createAccessToken(memberId);
        String refreshToken = tokenProvider.createRefreshToken(memberId);

        refreshTokenRepository.save(new RefreshToken(refreshToken, memberId));

        return new TokenGroup(accessToken, refreshToken);
    }
}

package com.whatsub.infrastructure.auth;

import com.whatsub.domain.auth.RefreshToken;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "refresh_token")
@Entity
public class RefreshTokenEntity {

    @Id
    private String token;

    @Column(nullable = false)
    private Long memberId;

    public RefreshTokenEntity(final String token, final Long memberId) {
        this.token = token;
        this.memberId = memberId;
    }

    public RefreshToken toModel() {
        return new RefreshToken(this.token, this.memberId);
    }

    public static RefreshTokenEntity from(final RefreshToken refreshToken) {
        return new RefreshTokenEntity(refreshToken.getToken(), refreshToken.getMemberId());
    }
}

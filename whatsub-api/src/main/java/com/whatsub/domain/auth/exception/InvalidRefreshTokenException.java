package com.whatsub.domain.auth.exception;

import org.springframework.http.HttpStatus;

public class InvalidRefreshTokenException extends AuthException {
    public InvalidRefreshTokenException() {
        super("리프레시 토큰이 유효하지 않습니다.", HttpStatus.UNAUTHORIZED);
    }
}

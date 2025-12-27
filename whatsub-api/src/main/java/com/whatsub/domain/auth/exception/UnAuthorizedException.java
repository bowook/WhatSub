package com.whatsub.domain.auth.exception;

import org.springframework.http.HttpStatus;

public class UnAuthorizedException extends AuthException {
    public UnAuthorizedException() {
        super("인증 정보가 유효하지 않습니다.", HttpStatus.UNAUTHORIZED);
    }
}

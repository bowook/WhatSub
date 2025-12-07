package com.whatsub.infrastructure.auth;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RefreshTokenJpaRepository extends JpaRepository<RefreshTokenEntity, String> {
}

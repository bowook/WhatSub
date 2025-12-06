package com.whatsub.infrastructure;

import com.whatsub.domain.Subscribe;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubscribeJpaRepository extends JpaRepository<Subscribe, Long> {
}

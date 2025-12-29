package com.whatsub.infrastructure;

import com.whatsub.domain.Subscribe;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SubscribeJpaRepository extends JpaRepository<Subscribe, Long> {
    List<Subscribe> findAllByMemberId(Long memberId);
}

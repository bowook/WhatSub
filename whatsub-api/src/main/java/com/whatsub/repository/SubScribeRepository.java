package com.whatsub.repository;

import com.whatsub.domain.Subscribe;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SubScribeRepository extends JpaRepository<Subscribe, Long> {
    List<Subscribe> findAllSubscribe(Long memberId);
}

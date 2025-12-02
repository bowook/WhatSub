package com.whatsub.infrastructure.member;

import com.whatsub.domain.member.Member;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberJpaRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByProfileEmail(String email);
}

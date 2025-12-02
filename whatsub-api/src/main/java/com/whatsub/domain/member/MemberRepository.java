package com.whatsub.domain.member;

import java.util.Optional;

public interface MemberRepository {

    Member save(Member member);

    Optional<Member> findByProfileEmail(String email);

    Optional<Member> findById(Long memberId);
}

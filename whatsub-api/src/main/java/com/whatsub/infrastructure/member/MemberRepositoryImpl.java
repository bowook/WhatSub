package com.whatsub.infrastructure.member;

import com.whatsub.domain.member.Member;
import com.whatsub.domain.member.MemberRepository;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@RequiredArgsConstructor
@Repository
public class MemberRepositoryImpl implements MemberRepository {

    private final MemberJpaRepository memberJpaRepository;

    @Override
    public Member save(final Member member) {
        return memberJpaRepository.save(member);
    }

    @Override
    public Optional<Member> findByProfileEmail(final String email) {
        return memberJpaRepository.findByProfileEmail(email);
    }
}

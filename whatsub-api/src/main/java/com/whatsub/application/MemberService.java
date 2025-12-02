package com.whatsub.application;

import com.whatsub.domain.auth.OAuthUserProfile;
import com.whatsub.domain.member.Member;
import com.whatsub.domain.member.MemberRepository;
import com.whatsub.domain.member.Profile;
import com.whatsub.domain.member.Role;
import com.whatsub.domain.member.SocialType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class MemberService {

    private final MemberRepository memberRepository;

    @Transactional
    public Member findOrCreate(final OAuthUserProfile oAuthUserProfile) {
        return memberRepository.findByProfileEmail(oAuthUserProfile.email())
                .orElseGet(() -> {
                    Member newMember = new Member(
                            Profile.builder()
                                    .name(oAuthUserProfile.name())
                                    .email(oAuthUserProfile.email())
                                    .picture(oAuthUserProfile.profileImageUrl())
                                    .build(),
                            Role.USER,
                            SocialType.from(oAuthUserProfile.served())
                    );

                    return memberRepository.save(newMember);
                });
    }
}

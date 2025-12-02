package com.whatsub.presentation.dto;

import com.whatsub.domain.member.Member;

public record MemberResponse(
        Long id,
        String email,
        String name,
        String picture,
        String role,
        String socialType
) {

    public static MemberResponse from(final Member member) {
        return new MemberResponse(
                member.getId(),
                member.getProfile().getEmail(),
                member.getProfile().getName(),
                member.getProfile().getPicture(),
                member.getRole().name(),
                member.getSocialType().name()
        );
    }
}

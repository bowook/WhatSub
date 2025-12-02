package com.whatsub.presentation.controller;

import com.whatsub.application.MemberService;
import com.whatsub.domain.member.Member;
import com.whatsub.presentation.dto.MemberResponse;
import com.whatsub.presentation.support.AuthMember;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RequestMapping("/api/members")
@RestController
public class MemberController {

    private final MemberService memberService;

    @GetMapping("/me")
    public ResponseEntity<MemberResponse> getMyInfo(
            @AuthMember final Long memberId
    ) {
        Member member = memberService.findById(memberId);

        return ResponseEntity.ok(MemberResponse.from(member));
    }
}

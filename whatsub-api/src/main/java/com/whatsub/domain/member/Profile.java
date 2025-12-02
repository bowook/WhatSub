package com.whatsub.domain.member;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Embeddable
public class Profile {

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "picture", nullable = true, length = 512)
    private String picture;

    @Builder
    public Profile(final String email, final String name, final String picture) {
        this.email = email;
        this.name = name;
        this.picture = picture;
    }
}

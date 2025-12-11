package com.whatsub;

import com.whatsub.domain.Subscribe;
import com.whatsub.domain.SubscribeCategory;
import com.whatsub.domain.SubscribeCycle;

import java.time.LocalDate;

public class SubscribeEntityFixtures {
    public static Subscribe 넷플릭스() {
        return Subscribe.builder()
                .subName("넷플릭스")
                .subscribeCategory(SubscribeCategory.OTT)
                .price(15000.0)
                .subscribeCycle(SubscribeCycle.MONTH)
                .date(LocalDate.now().atStartOfDay())
                .ntoShare(false)
                .build();
    }

    public static Subscribe 디즈니() {
        return Subscribe.builder()
                .subName("디즈니플러스")
                .subscribeCategory(SubscribeCategory.OTT)
                .price(9900.0)
                .subscribeCycle(SubscribeCycle.MONTH)
                .date(LocalDate.now().atStartOfDay())
                .ntoShare(true)
                .build();
    }
}

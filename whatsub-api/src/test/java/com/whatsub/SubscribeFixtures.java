package com.whatsub;

import com.whatsub.domain.PriceType;
import com.whatsub.domain.SubscribeCategory;
import com.whatsub.domain.SubscribeCycle;
import com.whatsub.presentation.dto.CreateSubscribeRequest;

import java.time.LocalDate;

public class SubscribeFixtures {

    public static CreateSubscribeRequest 기본_구독_요청_KRW() {
        return new CreateSubscribeRequest(
                "넷플릭스",
                SubscribeCategory.OTT,
                PriceType.KRW,
                15000,
                SubscribeCycle.MONTH,
                LocalDate.now(),
                false
        );
    }

    public static CreateSubscribeRequest 기본_구독_요청_USD() {
        return new CreateSubscribeRequest(
                "ChatGPT",
                SubscribeCategory.LLM,
                PriceType.USD,
                22,
                SubscribeCycle.MONTH,
                LocalDate.now(),
                false
        );
    }

    public static CreateSubscribeRequest 공유_구독_요청() {
        CreateSubscribeRequest req = 기본_구독_요청_KRW();
        return new CreateSubscribeRequest(
                req.subName(),
                req.subscribeCategory(),
                req.priceType(),
                req.price(),
                req.subscribeCycle(),
                req.date(),
                true
        );
    }
}

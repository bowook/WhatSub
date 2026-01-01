package com.whatsub.presentation.dto;

import com.whatsub.domain.PriceType;
import com.whatsub.domain.SubscribeCategory;
import com.whatsub.domain.SubscribeCycle;

import java.time.LocalDate;

public record SubscribeList(
        String subName,
        SubscribeCategory subscribeCategory,
        double price,
        SubscribeCycle subscribeCycle,
        LocalDate date
) {
}

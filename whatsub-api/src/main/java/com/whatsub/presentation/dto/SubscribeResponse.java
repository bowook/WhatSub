package com.whatsub.presentation.dto;

import com.whatsub.domain.PriceType;
import com.whatsub.domain.Subscribe;
import com.whatsub.domain.SubscribeCategory;
import com.whatsub.domain.SubscribeCycle;

import java.time.LocalDate;

public record SubscribeResponse(
        Long id,
        String subName,
        SubscribeCategory subscribeCategory,
        PriceType priceType,
        double price,
        SubscribeCycle subscribeCycle,
        LocalDate date,
        boolean share
        ) {
    public SubscribeResponse(Subscribe subscribe) {
        this(
                subscribe.getId(),
                subscribe.getSubName(),
                subscribe.getSubscribeCategory(),
                subscribe.getPriceType(),
                subscribe.getPrice(),
                subscribe.getSubscribeCycle(),
                subscribe.getDate().toLocalDate(),
                subscribe.getNtoShare()
        );
    }
}

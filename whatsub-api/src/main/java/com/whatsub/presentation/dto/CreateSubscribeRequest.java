package com.whatsub.presentation.dto;

import com.whatsub.domain.PriceType;
import com.whatsub.domain.SubscribeCategory;
import com.whatsub.domain.SubscribeCycle;
import lombok.*;
import java.time.LocalDate;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class CreateSubscribeRequest {
    private String subName;
    private SubscribeCategory subscribeCategory;
    private PriceType priceType;
    private double price;
    private SubscribeCycle subscribeCycle;
    private LocalDate date;
    private boolean share;

}

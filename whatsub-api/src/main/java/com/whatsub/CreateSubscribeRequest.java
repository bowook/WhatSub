package com.whatsub;

import lombok.*;
import java.time.LocalDate;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class CreateSubscribeRequest {
    private String subName;
    private SubscribeCategory subscribeCategory;
    private PriceType priceType;
    private double price;
    private SubscribeCycle subscribeCycle;
    private LocalDate date;
    private boolean share;

}

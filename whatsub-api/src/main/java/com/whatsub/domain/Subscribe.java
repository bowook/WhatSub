package com.whatsub.domain;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Entity
@Getter
public class Subscribe {
    @Id
    @GeneratedValue
    private Long id;

//    @ManyToOne
//    @JoinColumn(name = "member_id")
//    private Member member;

    private String subName;

    @Enumerated(EnumType.STRING)
    private SubscribeCategory subscribeCategory;

    private double price;

    @Enumerated(EnumType.STRING)
    private PriceType priceType;

    @Enumerated(EnumType.STRING)
    private SubscribeCycle subscribeCycle;

    private LocalDateTime date;

    private Boolean NtoShare;

//    public Subscribe(String subName, SubscribeCategory subscribeCategory, Double price, SubscribeCycle subscribeCycle, LocalDateTime date, Boolean ntoShare, Member member) {
//        this.subName = subName;
//        this.subscribeCategory = subscribeCategory;
//        this.price = price;
//        this.subscribeCycle = subscribeCycle;
//        this.date = date;
//        NtoShare = ntoShare;
//        this.member = member;
//    }

    @Builder
    public Subscribe(String subName, SubscribeCategory subscribeCategory, Double price, SubscribeCycle subscribeCycle, LocalDateTime date, Boolean ntoShare) {
        this.subName = subName;
        this.subscribeCategory = subscribeCategory;
        this.price = price;
        this.subscribeCycle = subscribeCycle;
        this.date = date;
        NtoShare = ntoShare;
    }
}

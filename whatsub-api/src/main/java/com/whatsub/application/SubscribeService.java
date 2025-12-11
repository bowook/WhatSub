package com.whatsub.application;

import com.whatsub.domain.SubscribeRepository;
import com.whatsub.infrastructure.SubscribeJpaRepository;
import com.whatsub.presentation.dto.CreateSubscribeRequest;
import com.whatsub.domain.Subscribe;
import com.whatsub.presentation.dto.SubscribeList;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class SubscribeService {
    private final SubscribeRepository subscribeRepository;
    private final CurrencyService currencyService;

    @Transactional
    public Subscribe createSubscribe(CreateSubscribeRequest dto) {
        // Member member = memberRepository.findOne(memberId)
        //        .orElseThrow(() -> new IllegalArgumentException("회원 정보 없음"));

        double price = dto.priceType().convert(dto.price(), currencyService);

        Subscribe subscribe = Subscribe.builder()
                .subName(dto.subName())
                .subscribeCategory(dto.subscribeCategory())
                .price(price)
                .subscribeCycle(dto.subscribeCycle())
                .date(dto.date().atStartOfDay())
                .ntoShare(dto.share())
                .build();

        subscribeRepository.save(subscribe);
        return subscribe;
    }

    @Transactional
    public void updateSubscribe() {}

    @Transactional
    public void deleteSubscribe(Subscribe subscribe) {
        subscribeRepository.delete(subscribe);
    }

    public List<SubscribeList> subscribeList(Long memberId) {
        return subscribeRepository.findAllByMemberId(memberId).stream()
                .map(sub -> new SubscribeList(
                        sub.getSubName(),
                        sub.getSubscribeCategory(),
                        sub.getPrice(),
                        sub.getSubscribeCycle(),
                        sub.getDate().toLocalDate()
                )).toList();
    }
}

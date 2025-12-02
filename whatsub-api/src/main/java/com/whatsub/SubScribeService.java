package com.whatsub;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class SubScribeService {
    private final SubScribeRepository subScribeRepository;
    private final CurrencyService currencyService;

    public Long createSubScribe(CreateSubscribeRequest dto) {
        // Member member = memberRepository.findOne(memberId)
        //        .orElseThrow(() -> new IllegalArgumentException("회원 정보 없음"));

        double price = 0;

        if(dto.getPriceType() == PriceType.KRW) {
            price = dto.getPrice();
        } else if (dto.getPriceType() == PriceType.USD){
            price = currencyService.usdToKrw(dto.getPrice());
        }

        Subscribe subscribe = new Subscribe(
                dto.getSubName(),
                dto.getSubscribeCategory(),
                price,
                dto.getSubscribeCycle(),
                dto.getDate().atStartOfDay(),
                dto.isShare()
//                , member
        );
        subScribeRepository.save(subscribe);
        return subscribe.getId();
    }

    public void updateSubscribe() {}

    public void deleteSubscribe(Subscribe subscribe) {
        subScribeRepository.delete(subscribe);
    }

    public List<Subscribe> subscribeList(Long memberId) {
        return subScribeRepository.findAllSubscribe(memberId);
    }
}

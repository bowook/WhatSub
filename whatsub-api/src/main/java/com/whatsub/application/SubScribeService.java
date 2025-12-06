package com.whatsub.application;

import com.whatsub.presentation.dto.CreateSubscribeRequest;
import com.whatsub.domain.Subscribe;
import com.whatsub.domain.SubScribeRepository;
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

    @Transactional
    public Long createSubScribe(CreateSubscribeRequest dto) {
        // Member member = memberRepository.findOne(memberId)
        //        .orElseThrow(() -> new IllegalArgumentException("회원 정보 없음"));

        double price = dto.getPriceType().convert(dto.getPrice(), currencyService);

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

    @Transactional
    public void updateSubscribe() {}

    @Transactional
    public void deleteSubscribe(Subscribe subscribe) {
        subScribeRepository.delete(subscribe);
    }

    public List<Subscribe> subscribeList(Long memberId) {
        return subScribeRepository.findAllSubscribe(memberId);
    }
}

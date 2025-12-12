package com.whatsub;

import com.whatsub.domain.*;
import com.whatsub.presentation.dto.CreateSubscribeRequest;
import com.whatsub.domain.SubscribeRepository;
import com.whatsub.application.CurrencyService;
import com.whatsub.application.SubscribeService;
import com.whatsub.presentation.dto.SubscribeList;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.mockito.Mockito.any;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class SubscribeServiceTest {

    @Mock
    SubscribeRepository subscribeRepository;

    @Mock
    CurrencyService currencyService;

    @InjectMocks
    SubscribeService subscribeService;

    @Test
    void createSubscribe_withKrwPrice_savesPriceAsIs() {
        //given
        CreateSubscribeRequest dto = SubscribeFixtures.기본_구독_요청_KRW();

        when(subscribeRepository.save(any(Subscribe.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        //when
        subscribeService.createSubscribe(dto);

        //then
        ArgumentCaptor<Subscribe> captor = ArgumentCaptor.forClass(Subscribe.class);
        verify(subscribeRepository).save(captor.capture());

        Subscribe saved = captor.getValue();

        assertEquals("넷플릭스", saved.getSubName());
        assertEquals(15000, saved.getPrice());
    }

    @Test
    void createSubscribe_withUsdPrice_savesPriceAsIs() {
        //given
        CreateSubscribeRequest dto = SubscribeFixtures.기본_구독_요청_USD();

        when(currencyService.usdToKrw(22)).thenReturn(34000.0);

        when(subscribeRepository.save(any(Subscribe.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        //when
        subscribeService.createSubscribe(dto);

        //then
        ArgumentCaptor<Subscribe> captor = ArgumentCaptor.forClass(Subscribe.class);
        verify(subscribeRepository).save(captor.capture());

        Subscribe saved = captor.getValue();

        assertEquals("ChatGPT", saved.getSubName());
        assertEquals(34000, saved.getPrice());
    }


    @Test
    void updateSubscribe() {
    }

    @Test
    void deleteSubscribe() {
    }

    @Test
    void subscribeList_returnsDtoList() {
        //given
        Long memberId = 1L;
        List<Subscribe> entityList = List.of(
                SubscribeEntityFixtures.넷플릭스(),
                SubscribeEntityFixtures.디즈니()
        );

        when(subscribeRepository.findAllByMemberId(memberId)).thenReturn(entityList);

        //when
        List<SubscribeList> result = subscribeService.subscribeList(memberId);

        //then
        assertEquals(2, result.size());

        SubscribeList first = result.get(0);
        assertAll(
                () -> assertEquals("넷플릭스", first.subName()),
                () -> assertEquals(15000, first.price()),
                () -> assertEquals(SubscribeCategory.OTT, first.subscribeCategory())
        );

        SubscribeList second = result.get(1);
        assertAll(
                () -> assertEquals("디즈니플러스", second.subName()),
                () -> assertEquals(9900, second.price()),
                () -> assertEquals(SubscribeCategory.OTT, second.subscribeCategory())
        );

        verify(subscribeRepository).findAllByMemberId(memberId);
    }
}

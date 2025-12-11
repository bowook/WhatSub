package com.whatsub;

import com.whatsub.domain.*;
import com.whatsub.presentation.dto.CreateSubscribeRequest;
import com.whatsub.domain.SubscribeRepository;
import com.whatsub.application.CurrencyService;
import com.whatsub.application.SubscribeService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

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
    SubscribeService subScribeService;

    @Test
    void createSubscribe_withKrwPrice_savesPriceAsIs() {
        CreateSubscribeRequest dto = SubscribeFixtures.기본_구독_요청_KRW();

        when(subscribeRepository.save(any(Subscribe.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        subScribeService.createSubscribe(dto);

        ArgumentCaptor<Subscribe> captor = ArgumentCaptor.forClass(Subscribe.class);
        verify(subscribeRepository).save(captor.capture());

        Subscribe saved = captor.getValue();

        assertEquals("넷플릭스", saved.getSubName());
        assertEquals(15000, saved.getPrice());
    }

    @Test
    void createSubscribe_withUsdPrice_savesPriceAsIs() {
        CreateSubscribeRequest dto = SubscribeFixtures.기본_구독_요청_USD();

        when(currencyService.usdToKrw(22)).thenReturn(34000.0);

        when(subscribeRepository.save(any(Subscribe.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        subScribeService.createSubscribe(dto);

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
    void subscribeList() {
    }
}

package com.whatsub;

import com.whatsub.domain.*;
import com.whatsub.presentation.dto.CreateSubscribeRequest;
import com.whatsub.domain.SubscribeRepository;
import com.whatsub.application.CurrencyService;
import com.whatsub.application.SubScribeService;
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
class SubScribeServiceTest {

    @Mock
    SubscribeRepository subScribeRepository;

    @Mock
    CurrencyService currencyService;

    @InjectMocks
    SubScribeService subScribeService;

    @Mock
    SubscribeFixtures subscribeFixtures;

    @Test
    void createSubScribe_withKrwPrice_savesPriceAsIs() {
        CreateSubscribeRequest dto = SubscribeFixtures.기본_구독_요청_KRW();

        when(subScribeRepository.save(any(Subscribe.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        subScribeService.createSubScribe(dto);

        ArgumentCaptor<Subscribe> captor = ArgumentCaptor.forClass(Subscribe.class);
        verify(subScribeRepository).save(captor.capture());

        Subscribe saved = captor.getValue();

        assertEquals("넷플릭스", saved.getSubName());
        assertEquals(15000, saved.getPrice());
    }

    @Test
    void createSubScribe_withUsdPrice_savesPriceAsIs() {
        CreateSubscribeRequest dto = SubscribeFixtures.기본_구독_요청_USD();

        when(currencyService.usdToKrw(22)).thenReturn(34000.0);

        when(subScribeRepository.save(any(Subscribe.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        subScribeService.createSubScribe(dto);

        ArgumentCaptor<Subscribe> captor = ArgumentCaptor.forClass(Subscribe.class);
        verify(subScribeRepository).save(captor.capture());

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
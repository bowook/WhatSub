package com.whatsub;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class CurrencyServiceTest {

    @Test
    void getUsdToKrwRate_returnsRate() {
        RestTemplate restTemplate = mock(RestTemplate.class);
        CurrencyService currencyService = new CurrencyService(restTemplate);

        Map<String, Double> rates = new HashMap<>();
        rates.put("KRW", 1350.50);

        Map<String, Object> response = new HashMap<>();
        response.put("rates", rates);

        String url = "https://api.frankfurter.app/latest?from=USD&to=KRW";

        when(restTemplate.getForObject(url, Map.class))
                .thenReturn(response);

        // when
        double rate = currencyService.getUsdToKrwRate();

        // then
        assertEquals(1350.50, rate);
    }

    @Test
    void usdToKrw_convertsProperly() {
        //given
        RestTemplate restTemplate = mock(RestTemplate.class);
        CurrencyService currencyService = new CurrencyService(restTemplate);

        when(restTemplate.getForObject("https://api.frankfurter.app/latest?from=USD&to=KRW", Map.class))
                .thenReturn(Map.of("rates", Map.of("KRW", 1300.0)));

        // when
        double result = currencyService.usdToKrw(10);

        // then
        assertEquals(13000.0, result);
    }

    @Test
    void usdToKrw() {
    }
}
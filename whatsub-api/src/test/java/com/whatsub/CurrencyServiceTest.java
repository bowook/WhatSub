package com.whatsub;

import com.whatsub.service.CurrencyService;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.client.ExpectedCount;
import org.springframework.test.web.client.MockRestServiceServer;
import org.springframework.web.client.RestClient;

import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.requestTo;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withSuccess;

class CurrencyServiceTest {

    @Test
    void getUsdToKrwRate_returnsRate() {
        // given
        RestClient.Builder builder = RestClient.builder();
        MockRestServiceServer server = MockRestServiceServer.bindTo(builder).build();

        RestClient restClient = builder.build();
        CurrencyService currencyService = new CurrencyService(restClient);

        String mockJson = """
        {
          "amount": 1.0,
          "base": "USD",
          "date": "2024-12-03",
          "rates": { "KRW": 1350.50 }
        }
        """;

        server.expect(ExpectedCount.once(),
                        requestTo("https://api.frankfurter.app/latest?from=USD&to=KRW"))
                .andRespond(withSuccess(mockJson, MediaType.APPLICATION_JSON));

        // when
        double rate = currencyService.getUsdToKrwRate();

        // then
        assertEquals(1350.50, rate);
    }

    @Test
    void usdToKrw_convertsProperly() {
        // given
        RestClient.Builder builder = RestClient.builder();
        MockRestServiceServer server = MockRestServiceServer.bindTo(builder).build();

        RestClient restClient = builder.build();
        CurrencyService currencyService = new CurrencyService(restClient);

        String url = "https://api.frankfurter.app/latest?from=USD&to=KRW";

        // Frankfurter API가 이런 JSON을 줬다고 가정
        String mockJson = """
            {
              "amount": 1.0,
              "base": "USD",
              "date": "2024-12-03",
              "rates": { "KRW": 1300.0 }
            }
            """;

        server.expect(ExpectedCount.once(), requestTo(url))
                .andRespond(withSuccess(mockJson, MediaType.APPLICATION_JSON));

        // when
        double result = currencyService.usdToKrw(10);

        // then
        assertEquals(13000.0, result);
    }

    @Test
    void usdToKrw() {
    }
}
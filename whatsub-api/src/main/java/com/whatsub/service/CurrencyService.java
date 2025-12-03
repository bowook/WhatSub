package com.whatsub.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestClient;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class CurrencyService {
    private final RestClient restClient;

    @Transactional(propagation = Propagation.NOT_SUPPORTED)
    public double getUsdToKrwRate() {
        String url = "https://api.frankfurter.app/latest?from=USD&to=KRW";
        Map<String, Object> response = restClient.get()
                .uri(url)
                .retrieve()
                .body(Map.class);
        Map<String, Double> rates = (Map<String, Double>) response.get("rates");

        return rates.get("KRW");
    }

    public double usdToKrw(double usd) {
        double exchangeRate = getUsdToKrwRate();
        return usd * exchangeRate;
    }

}

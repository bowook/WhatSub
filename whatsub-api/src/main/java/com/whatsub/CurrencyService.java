package com.whatsub;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class CurrencyService {
    private final RestTemplate restTemplate;

    public double getUsdToKrwRate() {
        String url = "https://api.frankfurter.app/latest?from=USD&to=KRW";
        Map<String, Object> response = restTemplate.getForObject(url, Map.class);
        Map<String, Double> rates = (Map<String, Double>) response.get("rates");

        return rates.get("KRW");
    }

    public double usdToKrw(double usd) {
        double exchangeRate = getUsdToKrwRate();
        return usd * exchangeRate;
    }

}

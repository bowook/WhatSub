package com.whatsub.domain;

import com.whatsub.application.CurrencyService;

public enum PriceType {
    KRW {
        @Override
        public double convert(double price, CurrencyService currencyService){
            return price;
        }
    },
    USD {
        @Override
        public double convert(double price, CurrencyService currencyService){
            return currencyService.usdToKrw(price);
        }
    };

    public abstract double convert(double price, CurrencyService currencyService);
}

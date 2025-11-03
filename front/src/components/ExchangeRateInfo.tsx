import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { SUPPORTED_CURRENCIES, EXCHANGE_RATES, getLastUpdated } from '../utils/currencyUtils';
import { RefreshCw } from 'lucide-react';

export default function ExchangeRateInfo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4" />
          환율 정보
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {SUPPORTED_CURRENCIES.filter(c => c.code !== 'KRW').map((currency) => (
            <div key={currency.code} className="flex items-center justify-between p-2 bg-muted rounded">
              <div className="flex items-center gap-2">
                <span>{currency.flag}</span>
                <span className="text-sm">{currency.name}</span>
              </div>
              <span className="text-sm">
                1 {currency.symbol} = ₩{EXCHANGE_RATES[currency.code].toLocaleString()}
              </span>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground text-center mt-3">
          마지막 업데이트: {getLastUpdated()}
        </p>
        <p className="text-xs text-muted-foreground text-center mt-1">
          * 참고용 환율입니다. 실제 환율과 다를 수 있습니다.
        </p>
      </CardContent>
    </Card>
  );
}

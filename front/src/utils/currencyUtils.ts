// 지원하는 통화 목록
export const SUPPORTED_CURRENCIES = [
  { code: 'KRW', symbol: '₩', name: '원 (한국)', flag: '🇰🇷' },
  { code: 'USD', symbol: '$', name: '달러 (미국)', flag: '🇺🇸' },
  { code: 'EUR', symbol: '€', name: '유로', flag: '🇪🇺' },
  { code: 'JPY', symbol: '¥', name: '엔 (일본)', flag: '🇯🇵' },
  { code: 'CNY', symbol: '¥', name: '위안 (중국)', flag: '🇨🇳' },
  { code: 'GBP', symbol: '£', name: '파운드 (영국)', flag: '🇬🇧' },
  { code: 'AUD', symbol: 'A$', name: '달러 (호주)', flag: '🇦🇺' },
  { code: 'CAD', symbol: 'C$', name: '달러 (캐나다)', flag: '🇨🇦' },
] as const;

export type CurrencyCode = typeof SUPPORTED_CURRENCIES[number]['code'];

// Mock 환율 데이터 (실제로는 API에서 가져와야 함)
// 기준: 1 외화당 KRW
export const EXCHANGE_RATES: Record<CurrencyCode, number> = {
  KRW: 1,
  USD: 1350,
  EUR: 1480,
  JPY: 9.5,
  CNY: 187,
  GBP: 1720,
  AUD: 880,
  CAD: 980,
};

// 마지막 업데이트 시간
export const getLastUpdated = () => {
  return new Date().toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// 외화를 한화로 변환
export const convertToKRW = (amount: number, currency: CurrencyCode): number => {
  if (currency === 'KRW') return amount;
  return amount * EXCHANGE_RATES[currency];
};

// 한화를 외화로 변환
export const convertFromKRW = (amount: number, currency: CurrencyCode): number => {
  if (currency === 'KRW') return amount;
  return amount / EXCHANGE_RATES[currency];
};

// 통화 포맷팅
export const formatCurrencyWithCode = (amount: number, currency: CurrencyCode): string => {
  const currencyInfo = SUPPORTED_CURRENCIES.find(c => c.code === currency);
  if (!currencyInfo) return `${amount}`;

  if (currency === 'KRW') {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW'
    }).format(amount);
  }

  // 외화는 소수점 2자리까지
  return `${currencyInfo.symbol}${amount.toFixed(2)}`;
};

// 통화 정보 가져오기
export const getCurrencyInfo = (code: CurrencyCode) => {
  return SUPPORTED_CURRENCIES.find(c => c.code === code);
};

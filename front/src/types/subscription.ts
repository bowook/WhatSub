export interface Subscription {
  id: string;
  name: string;
  price: number;
  currency: 'KRW' | 'USD' | 'EUR' | 'JPY' | 'CNY' | 'GBP' | 'AUD' | 'CAD'; // 추가됨
  billingCycle: 'monthly' | 'yearly';
  category: 'OTT' | '음악' | 'AI' | '소프트웨어' | 'VPN' | '쇼핑몰' | '기타';
  nextPaymentDate: Date;
  isShared: boolean;
  shareCount: number; // N빵 인원수
  personalCost: number; // 개인 부담금 (price / shareCount)
  color: string;
  icon?: string;
}

export interface CategoryStats {
  category: string;
  totalCost: number;
  subscriptionCount: number;
  color: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  provider?: 'email' | 'google' | 'github';
}
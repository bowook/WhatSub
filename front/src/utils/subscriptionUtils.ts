import { Subscription } from '../types/subscription';
import { convertToKRW } from './currencyUtils';

export const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    'OTT': '#e74c3c',
    '음악': '#9b59b6',
    'AI': '#3498db',
    '소프트웨어': '#2ecc71',
    'VPN': '#f39c12',
    '쇼핑몰': '#e67e22',
    '기타': '#95a5a6'
  };
  return colors[category] || '#95a5a6';
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW'
  }).format(amount);
};

export const getDaysUntilPayment = (date: Date): number => {
  const today = new Date();
  const diffTime = date.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const getUpcomingPayments = (subscriptions: Subscription[]): Subscription[] => {
  return subscriptions
    .filter(sub => getDaysUntilPayment(sub.nextPaymentDate) <= 7)
    .sort((a, b) => a.nextPaymentDate.getTime() - b.nextPaymentDate.getTime());
};

export const calculatePersonalCost = (price: number, shareCount: number): number => {
  return shareCount > 0 ? Math.round(price / shareCount) : price;
};

export const getTotalMonthlyCost = (subscriptions: Subscription[]): number => {
  return subscriptions.reduce((total, sub) => {
    // 환율 적용하여 한화로 환산
    const personalCostInKRW = convertToKRW(sub.personalCost, sub.currency);
    const monthlyCost = sub.billingCycle === 'yearly' ? personalCostInKRW / 12 : personalCostInKRW;
    return total + monthlyCost;
  }, 0);
};
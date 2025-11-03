import { Subscription } from '../types/subscription';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { formatCurrency, getDaysUntilPayment, getUpcomingPayments, getTotalMonthlyCost } from '../utils/subscriptionUtils';
import { convertToKRW, formatCurrencyWithCode } from '../utils/currencyUtils';
import { Calendar, DollarSign, TrendingUp, AlertCircle } from 'lucide-react';
import AdBanner from './AdBanner';

interface DashboardProps {
  subscriptions: Subscription[];
  onAddSubscription: () => void;
}

export default function Dashboard({ subscriptions, onAddSubscription }: DashboardProps) {
  const upcomingPayments = getUpcomingPayments(subscriptions);
  const totalMonthlyCost = getTotalMonthlyCost(subscriptions);
  const totalYearlyCost = totalMonthlyCost * 12;

  return (
    <div className="space-y-6 p-4 pb-24">
      {/* 광고 배너 */}
      <AdBanner size="small" />

      {/* 상단 통계 카드들 */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-primary">
              <DollarSign className="h-4 w-4" />
              월 지출
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div>{formatCurrency(totalMonthlyCost)}</div>
          </CardContent>
        </Card>
        
        <Card className="border-purple-500/20 bg-gradient-to-br from-purple-500/5 to-transparent">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-purple-600">
              <TrendingUp className="h-4 w-4" />
              연 지출
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div>{formatCurrency(totalYearlyCost)}</div>
          </CardContent>
        </Card>
      </div>

      {/* 곧 결제될 서비스들 */}
      {upcomingPayments.length > 0 && (
        <Card className="border-orange-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-orange-500" />
              곧 결제될 서비스
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingPayments.map((subscription) => {
              const daysLeft = getDaysUntilPayment(subscription.nextPaymentDate);
              return (
                <div key={subscription.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: subscription.color }}
                    />
                    <div>
                      <div>{subscription.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {subscription.nextPaymentDate.toLocaleDateString('ko-KR')}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div>
                      {subscription.currency === 'KRW' 
                        ? formatCurrency(subscription.personalCost)
                        : formatCurrencyWithCode(subscription.personalCost, subscription.currency)
                      }
                    </div>
                    {subscription.currency !== 'KRW' && (
                      <div className="text-xs text-muted-foreground">
                        ≈{formatCurrency(convertToKRW(subscription.personalCost, subscription.currency))}
                      </div>
                    )}
                    <Badge variant={daysLeft <= 3 ? "destructive" : "secondary"} className="text-xs mt-1">
                      {daysLeft === 0 ? '오늘' : `${daysLeft}일 후`}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}

      {/* 전체 구독 현황 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            구독 현황
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl">{subscriptions.length}</div>
              <div className="text-sm text-muted-foreground">총 구독 수</div>
            </div>
            <div>
              <div className="text-2xl">{subscriptions.filter(s => s.isShared).length}</div>
              <div className="text-sm text-muted-foreground">N빵 구독</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 구독 추가 버튼 */}
      <Button 
        onClick={onAddSubscription} 
        className="w-full bg-primary hover:bg-primary/90"
        style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
      >
        새 구독 추가하기
      </Button>
    </div>
  );
}
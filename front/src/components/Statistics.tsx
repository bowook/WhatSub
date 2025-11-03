import { Subscription, CategoryStats } from '../types/subscription';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { formatCurrency, getCategoryColor } from '../utils/subscriptionUtils';
import { convertToKRW } from '../utils/currencyUtils';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { TrendingUp, PieChart as PieChartIcon, BarChart as BarChartIcon } from 'lucide-react';
import AdBanner from './AdBanner';
import ExchangeRateInfo from './ExchangeRateInfo';

interface StatisticsProps {
  subscriptions: Subscription[];
}

export default function Statistics({ subscriptions }: StatisticsProps) {
  // 카테고리별 통계 계산 (모든 금액을 한화로 환산)
  const categoryStats: CategoryStats[] = Object.entries(
    subscriptions.reduce((acc, sub) => {
      // 가격을 한화로 환산
      const priceInKRW = convertToKRW(sub.price, sub.currency);
      const personalCostInKRW = convertToKRW(sub.personalCost, sub.currency);
      const monthlyCost = sub.billingCycle === 'yearly' ? personalCostInKRW / 12 : personalCostInKRW;
      
      if (!acc[sub.category]) {
        acc[sub.category] = {
          category: sub.category,
          totalCost: 0,
          subscriptionCount: 0,
          color: getCategoryColor(sub.category)
        };
      }
      
      acc[sub.category].totalCost += monthlyCost;
      acc[sub.category].subscriptionCount += 1;
      
      return acc;
    }, {} as Record<string, CategoryStats>)
  ).map(([_, stats]) => stats).sort((a, b) => b.totalCost - a.totalCost);

  const totalMonthlyCost = categoryStats.reduce((sum, stat) => sum + stat.totalCost, 0);

  // 월별 비용 추이 (가상 데이터 - 실제로는 과거 데이터가 필요)
  const monthlyTrend = [
    { month: '9월', cost: totalMonthlyCost * 0.85 },
    { month: '10월', cost: totalMonthlyCost * 0.92 },
    { month: '11월', cost: totalMonthlyCost * 0.98 },
    { month: '12월', cost: totalMonthlyCost },
  ];

  return (
    <div className="space-y-6 p-4 pb-24">
      <h2>구독 통계</h2>

      {/* 광고 배너 */}
      <AdBanner size="small" />

      {/* 전체 통계 카드 */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-primary">
              <TrendingUp className="h-4 w-4" />
              월 총 지출
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div>{formatCurrency(totalMonthlyCost)}</div>
          </CardContent>
        </Card>
        
        <Card className="border-purple-500/20 bg-gradient-to-br from-purple-500/5 to-transparent">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-purple-600">
              <PieChartIcon className="h-4 w-4" />
              평균 구독료
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              {subscriptions.length > 0 
                ? formatCurrency(totalMonthlyCost / subscriptions.length)
                : formatCurrency(0)
              }
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 카테고리별 파이 차트 */}
      {categoryStats.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>카테고리별 지출</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryStats}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="totalCost"
                    label={({ category, percent }) => `${category} ${(percent * 100).toFixed(0)}%`}
                  >
                    {categoryStats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => formatCurrency(value)} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="space-y-2">
              {categoryStats.map((stat) => (
                <div key={stat.category} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: stat.color }}
                    />
                    <span>{stat.category}</span>
                    <Badge variant="secondary" className="text-xs">
                      {stat.subscriptionCount}개
                    </Badge>
                  </div>
                  <span>{formatCurrency(stat.totalCost)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 월별 추이 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChartIcon className="h-4 w-4" />
            월별 지출 추이
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => `${Math.round(value/1000)}K`} />
                <Tooltip formatter={(value: number) => formatCurrency(value)} />
                <Bar dataKey="cost" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* N빵 통계 */}
      {subscriptions.some(s => s.isShared) && (
        <Card>
          <CardHeader>
            <CardTitle>N빵 절약 현황</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {subscriptions.filter(s => s.isShared).map((sub) => {
                const priceInKRW = convertToKRW(sub.price, sub.currency);
                const personalCostInKRW = convertToKRW(sub.personalCost, sub.currency);
                const originalCost = sub.billingCycle === 'yearly' ? priceInKRW / 12 : priceInKRW;
                const personalCost = sub.billingCycle === 'yearly' ? personalCostInKRW / 12 : personalCostInKRW;
                const savings = originalCost - personalCost;
                
                return (
                  <div key={sub.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: sub.color }}
                      />
                      <div>
                        <div>{sub.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {sub.shareCount}명 공유
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-green-600">
                        -{formatCurrency(savings)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        절약
                      </div>
                    </div>
                  </div>
                );
              })}
              
              <div className="pt-2 border-t">
                <div className="flex justify-between">
                  <span>총 월 절약액:</span>
                  <span className="text-green-600">
                    -{formatCurrency(
                      subscriptions
                        .filter(s => s.isShared)
                        .reduce((total, sub) => {
                          const priceInKRW = convertToKRW(sub.price, sub.currency);
                          const personalCostInKRW = convertToKRW(sub.personalCost, sub.currency);
                          const originalCost = sub.billingCycle === 'yearly' ? priceInKRW / 12 : priceInKRW;
                          const personalCost = sub.billingCycle === 'yearly' ? personalCostInKRW / 12 : personalCostInKRW;
                          return total + (originalCost - personalCost);
                        }, 0)
                    )}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 환율 정보 */}
      <ExchangeRateInfo />
    </div>
  );
}
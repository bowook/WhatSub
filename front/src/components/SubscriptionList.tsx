import { Subscription } from '../types/subscription';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { formatCurrency, getDaysUntilPayment } from '../utils/subscriptionUtils';
import { convertToKRW, formatCurrencyWithCode } from '../utils/currencyUtils';
import { Edit, Trash2, Users } from 'lucide-react';
import AdBanner from './AdBanner';

interface SubscriptionListProps {
  subscriptions: Subscription[];
  onEdit: (subscription: Subscription) => void;
  onDelete: (id: string) => void;
}

export default function SubscriptionList({ subscriptions, onEdit, onDelete }: SubscriptionListProps) {
  const sortedSubscriptions = [...subscriptions].sort((a, b) => 
    a.nextPaymentDate.getTime() - b.nextPaymentDate.getTime()
  );

  return (
    <div className="space-y-4 p-4 pb-24">
      <h2>전체 구독 목록</h2>
      
      {/* 광고 배너 */}
      <AdBanner size="small" />
      
      {sortedSubscriptions.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">아직 등록된 구독이 없습니다.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {sortedSubscriptions.map((subscription) => {
            const daysLeft = getDaysUntilPayment(subscription.nextPaymentDate);
            
            return (
              <Card key={subscription.id} className="hover:shadow-md transition-shadow border-primary/10">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <div 
                        className="w-4 h-4 rounded-full flex-shrink-0"
                        style={{ backgroundColor: subscription.color }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span>{subscription.name}</span>
                          {subscription.isShared && (
                            <Badge variant="outline" className="text-xs">
                              <Users className="h-3 w-3 mr-1" />
                              {subscription.shareCount}명
                            </Badge>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <Badge variant="secondary" className="mr-2 text-xs">
                            {subscription.category}
                          </Badge>
                          <span>{subscription.billingCycle === 'monthly' ? '월간' : '연간'}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="space-y-1">
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
                        {subscription.isShared && (
                          <div className="text-xs text-muted-foreground">
                            (전체: {subscription.currency === 'KRW' 
                              ? formatCurrency(subscription.price)
                              : formatCurrencyWithCode(subscription.price, subscription.currency)
                            })
                          </div>
                        )}
                        <Badge 
                          variant={daysLeft <= 3 ? "destructive" : daysLeft <= 7 ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {daysLeft === 0 ? '오늘' : daysLeft < 0 ? '지남' : `${daysLeft}일 후`}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(subscription)}
                      className="flex-1"
                    >
                      <Edit className="h-3 w-3 mr-1" />
                      수정
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onDelete(subscription.id)}
                      className="flex-1"
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      삭제
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
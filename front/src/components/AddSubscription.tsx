import { useState, useEffect } from 'react';
import { Subscription } from '../types/subscription';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { Badge } from './ui/badge';
import { getCategoryColor, calculatePersonalCost } from '../utils/subscriptionUtils';
import { SUPPORTED_CURRENCIES, convertToKRW, formatCurrencyWithCode, getLastUpdated, type CurrencyCode } from '../utils/currencyUtils';
import { Calendar, DollarSign, Users, Calculator, RefreshCw } from 'lucide-react';

interface AddSubscriptionProps {
  subscription?: Subscription;
  onSave: (subscription: Omit<Subscription, 'id'>) => void;
  onCancel: () => void;
}

const categories = ['OTT', '음악', 'AI', '소프트웨어', 'VPN', '쇼핑몰', '기타'];

const popularServices: Record<string, string[]> = {
  'OTT': ['넷플릭스', '디즈니플러스', '쿠팡플레이', '왓챠', '웨이브', '티빙'],
  '음악': ['유튜브 뮤직', '멜론', '애플 뮤직', '지니뮤직', '벅스', '플로'],
  'AI': ['ChatGPT Plus', 'Claude Pro', 'Gemini Advanced', 'Midjourney'],
  '소프트웨어': ['Figma', 'Adobe Creative', 'IntelliJ IDEA', 'GitHub Pro', 'Notion'],
  'VPN': ['ExpressVPN', 'NordVPN', 'Surfshark', 'CyberGhost'],
  '쇼핑몰': ['쿠팡 로켓와우', '네이버플러스', '11번가 플러스', 'SSG 프리미엄'],
  '기타': []
};

export default function AddSubscription({ subscription, onSave, onCancel }: AddSubscriptionProps) {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    currency: 'KRW' as CurrencyCode,
    billingCycle: 'monthly' as const,
    category: 'OTT' as const,
    nextPaymentDate: '',
    isShared: false,
    shareCount: 1
  });

  useEffect(() => {
    if (subscription) {
      setFormData({
        name: subscription.name,
        price: subscription.price.toString(),
        currency: subscription.currency,
        billingCycle: subscription.billingCycle,
        category: subscription.category,
        nextPaymentDate: subscription.nextPaymentDate.toISOString().split('T')[0],
        isShared: subscription.isShared,
        shareCount: subscription.shareCount
      });
    }
  }, [subscription]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const price = parseFloat(formData.price);
    const personalCost = calculatePersonalCost(price, formData.isShared ? formData.shareCount : 1);
    
    onSave({
      name: formData.name,
      price,
      currency: formData.currency,
      billingCycle: formData.billingCycle,
      category: formData.category,
      nextPaymentDate: new Date(formData.nextPaymentDate),
      isShared: formData.isShared,
      shareCount: formData.isShared ? formData.shareCount : 1,
      personalCost,
      color: getCategoryColor(formData.category)
    });
  };

  const personalCost = formData.price ? 
    calculatePersonalCost(parseFloat(formData.price), formData.isShared ? formData.shareCount : 1) : 0;
  
  // 한화 환산 금액 계산
  const krwAmount = formData.price && formData.currency !== 'KRW' 
    ? convertToKRW(parseFloat(formData.price), formData.currency)
    : 0;

  return (
    <div className="p-4 pb-24">
      <Card>
        <CardHeader>
          <CardTitle>
            {subscription ? '구독 수정' : '새 구독 추가'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 서비스 이름 */}
            <div className="space-y-2">
              <Label>서비스 이름</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="예: 넷플릭스"
                required
              />
              {popularServices[formData.category]?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {popularServices[formData.category].map((service) => (
                    <Badge
                      key={service}
                      variant="outline"
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                      onClick={() => setFormData({ ...formData, name: service })}
                    >
                      {service}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* 카테고리 */}
            <div className="space-y-2">
              <Label>카테고리</Label>
              <Select
                value={formData.category}
                onValueChange={(value: any) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: getCategoryColor(category) }}
                        />
                        {category}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* 가격 */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                가격
              </Label>
              <div className="flex gap-2">
                <Select
                  value={formData.currency}
                  onValueChange={(value: CurrencyCode) => setFormData({ ...formData, currency: value })}
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SUPPORTED_CURRENCIES.map((curr) => (
                      <SelectItem key={curr.code} value={curr.code}>
                        <span className="flex items-center gap-2">
                          <span>{curr.flag}</span>
                          <span>{curr.code}</span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="10000"
                  className="flex-1"
                  required
                />
              </div>
              {formData.currency !== 'KRW' && formData.price && (
                <div className="flex items-center gap-2 p-2 bg-muted rounded text-sm">
                  <RefreshCw className="h-3 w-3" />
                  <span className="text-muted-foreground">
                    ≈ {new Intl.NumberFormat('ko-KR', {
                      style: 'currency',
                      currency: 'KRW'
                    }).format(krwAmount)}
                  </span>
                  <span className="text-xs text-muted-foreground ml-auto">
                    환율 기준: {getLastUpdated()}
                  </span>
                </div>
              )}
            </div>

            {/* 결제 주기 */}
            <div className="space-y-2">
              <Label>결제 주기</Label>
              <Select
                value={formData.billingCycle}
                onValueChange={(value: any) => setFormData({ ...formData, billingCycle: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">월간</SelectItem>
                  <SelectItem value="yearly">연간</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* 다음 결제일 */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                다음 결제일
              </Label>
              <Input
                type="date"
                value={formData.nextPaymentDate}
                onChange={(e) => setFormData({ ...formData, nextPaymentDate: e.target.value })}
                required
              />
            </div>

            {/* N빵 설정 */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  N빵으로 공유
                </Label>
                <Switch
                  checked={formData.isShared}
                  onCheckedChange={(checked) => setFormData({ 
                    ...formData, 
                    isShared: checked,
                    shareCount: checked ? formData.shareCount : 1
                  })}
                />
              </div>

              {formData.isShared && (
                <div className="space-y-2">
                  <Label>공유 인원 수</Label>
                  <Input
                    type="number"
                    min="2"
                    max="10"
                    value={formData.shareCount}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      shareCount: parseInt(e.target.value) || 1
                    })}
                  />
                </div>
              )}

              {/* 개인 부담금 계산 */}
              {formData.price && (
                <Card className="bg-muted">
                  <CardContent className="p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Calculator className="h-4 w-4" />
                      <span>개인 부담금</span>
                    </div>
                    <div className="text-2xl">
                      {formatCurrencyWithCode(personalCost, formData.currency)}
                    </div>
                    {formData.isShared && (
                      <div className="text-sm text-muted-foreground">
                        {formatCurrencyWithCode(parseFloat(formData.price), formData.currency)} ÷ {formData.shareCount}명
                      </div>
                    )}
                    {formData.currency !== 'KRW' && (
                      <div className="text-sm text-muted-foreground mt-2 pt-2 border-t">
                        한화: {new Intl.NumberFormat('ko-KR', {
                          style: 'currency',
                          currency: 'KRW'
                        }).format(convertToKRW(personalCost, formData.currency))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>

            {/* 버튼들 */}
            <div className="flex gap-3">
              <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
                취소
              </Button>
              <Button 
                type="submit" 
                className="flex-1"
                style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
              >
                {subscription ? '수정' : '추가'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
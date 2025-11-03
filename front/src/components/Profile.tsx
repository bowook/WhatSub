import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';
import { Subscription } from '../types/subscription';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { User, Mail, LogOut, Shield, Bell, HelpCircle, ChevronRight } from 'lucide-react';
import { formatCurrency, getTotalMonthlyCost } from '../utils/subscriptionUtils';
import { convertToKRW } from '../utils/currencyUtils';
import NotificationSettings from './settings/NotificationSettings';
import PrivacySettings from './settings/PrivacySettings';
import HelpSettings from './settings/HelpSettings';
import AccountSettings from './settings/AccountSettings';

type SettingsView = 'main' | 'notifications' | 'privacy' | 'help' | 'account';

interface ProfileProps {
  subscriptions: Subscription[];
}

export default function Profile({ subscriptions }: ProfileProps) {
  const { user, signOut, isLoading } = useAuth();
  const [currentView, setCurrentView] = useState<SettingsView>('main');

  if (!user) return null;

  // 설정 상세 페이지 렌더링
  if (currentView === 'notifications') {
    return <NotificationSettings onBack={() => setCurrentView('main')} />;
  }
  if (currentView === 'privacy') {
    return <PrivacySettings onBack={() => setCurrentView('main')} />;
  }
  if (currentView === 'help') {
    return <HelpSettings onBack={() => setCurrentView('main')} />;
  }
  if (currentView === 'account') {
    return <AccountSettings onBack={() => setCurrentView('main')} />;
  }

  // 통계 계산
  const totalMonthlyCost = getTotalMonthlyCost(subscriptions);
  const sharedSubscriptions = subscriptions.filter(s => s.isShared);
  const totalSavings = sharedSubscriptions.reduce((total, sub) => {
    const priceInKRW = convertToKRW(sub.price, sub.currency);
    const personalCostInKRW = convertToKRW(sub.personalCost, sub.currency);
    const originalCost = sub.billingCycle === 'yearly' ? priceInKRW / 12 : priceInKRW;
    const personalCost = sub.billingCycle === 'yearly' ? personalCostInKRW / 12 : personalCostInKRW;
    return total + (originalCost - personalCost);
  }, 0);

  const getProviderBadge = () => {
    switch (user.provider) {
      case 'google':
        return <Badge variant="secondary">Google</Badge>;
      case 'github':
        return <Badge variant="secondary">GitHub</Badge>;
      case 'email':
        return <Badge variant="secondary">이메일</Badge>;
      default:
        return null;
    }
  };

  const menuItems = [
    { icon: Bell, label: '알림 설정', description: '결제 알림 및 리마인더', view: 'notifications' as const },
    { icon: Shield, label: '개인정보 보호', description: '계정 및 보안 설정', view: 'privacy' as const },
    { icon: HelpCircle, label: '도움말 & 지원', description: '자주 묻는 질문 및 문의', view: 'help' as const },
  ];

  return (
    <div className="space-y-6 p-4 pb-24">
      {/* 프로필 헤더 */}
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user.avatar} />
              <AvatarFallback>
                {user.name?.charAt(0).toUpperCase() || user.email.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3>{user.name || '사용자'}</h3>
                {getProviderBadge()}
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Mail className="h-3 w-3" />
                <span>{user.email}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 구독 통계 요약 */}
      <Card>
        <CardHeader>
          <CardTitle>내 구독 현황</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl">{subscriptions.length}</div>
              <div className="text-sm text-muted-foreground">활성 구독</div>
            </div>
            <div>
              <div className="text-2xl">{formatCurrency(totalMonthlyCost)}</div>
              <div className="text-sm text-muted-foreground">월 지출</div>
            </div>
            <div>
              <div className="text-2xl">{formatCurrency(totalSavings)}</div>
              <div className="text-sm text-muted-foreground">N빵 절약</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 설정 메뉴 */}
      <Card>
        <CardHeader>
          <CardTitle>설정</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          {menuItems.map((item, index) => (
            <div key={item.label}>
              <button 
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors text-left"
                onClick={() => setCurrentView(item.view)}
              >
                <item.icon className="h-5 w-5 text-muted-foreground" />
                <div className="flex-1">
                  <div>{item.label}</div>
                  <div className="text-sm text-muted-foreground">
                    {item.description}
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </button>
              {index < menuItems.length - 1 && <Separator className="my-1" />}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* 계정 관리 */}
      <Card>
        <CardHeader>
          <CardTitle>계정 관리</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => setCurrentView('account')}
          >
            <User className="h-4 w-4 mr-2" />
            계정 정보 수정
          </Button>

          <Button
            variant="outline"
            className="w-full justify-start text-destructive hover:text-destructive"
            onClick={signOut}
            disabled={isLoading}
          >
            <LogOut className="h-4 w-4 mr-2" />
            {isLoading ? '로그아웃 중...' : '로그아웃'}
          </Button>
        </CardContent>
      </Card>

      {/* 앱 정보 */}
      <div className="text-center text-sm text-muted-foreground">
        <p>WhatSub v1.0.0</p>
        <p className="mt-1">Made with ❤️ in Korea</p>
      </div>
    </div>
  );
}
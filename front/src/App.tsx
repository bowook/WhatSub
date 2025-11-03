import { useState } from 'react';
import { Subscription } from './types/subscription';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import SubscriptionList from './components/SubscriptionList';
import AddSubscription from './components/AddSubscription';
import Statistics from './components/Statistics';
import Profile from './components/Profile';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Home, List, Plus, BarChart3, UserCircle } from 'lucide-react';

type ActiveTab = 'dashboard' | 'subscriptions' | 'add' | 'statistics' | 'profile';

function MainApp() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([
    // 샘플 데이터
    {
      id: '1',
      name: '넷플릭스',
      price: 17000,
      currency: 'KRW',
      billingCycle: 'monthly',
      category: 'OTT',
      nextPaymentDate: new Date('2025-10-25'),
      isShared: true,
      shareCount: 4,
      personalCost: 4250,
      color: '#e74c3c'
    },
    {
      id: '2',
      name: 'ChatGPT Plus',
      price: 20,
      currency: 'USD',
      billingCycle: 'monthly',
      category: 'AI',
      nextPaymentDate: new Date('2025-10-22'),
      isShared: false,
      shareCount: 1,
      personalCost: 20,
      color: '#3498db'
    },
    {
      id: '3',
      name: '유튜브 뮤직',
      price: 7900,
      currency: 'KRW',
      billingCycle: 'monthly',
      category: '음악',
      nextPaymentDate: new Date('2025-10-28'),
      isShared: false,
      shareCount: 1,
      personalCost: 7900,
      color: '#9b59b6'
    }
  ]);
  const [editingSubscription, setEditingSubscription] = useState<Subscription | undefined>();

  const handleAddSubscription = (subscriptionData: Omit<Subscription, 'id'>) => {
    const newSubscription: Subscription = {
      ...subscriptionData,
      id: Date.now().toString()
    };
    
    if (editingSubscription) {
      setSubscriptions(prev => 
        prev.map(sub => sub.id === editingSubscription.id ? { ...newSubscription, id: editingSubscription.id } : sub)
      );
      setEditingSubscription(undefined);
    } else {
      setSubscriptions(prev => [...prev, newSubscription]);
    }
    
    setActiveTab('dashboard');
  };

  const handleEditSubscription = (subscription: Subscription) => {
    setEditingSubscription(subscription);
    setActiveTab('add');
  };

  const handleDeleteSubscription = (id: string) => {
    if (confirm('정말로 이 구독을 삭제하시겠습니까?')) {
      setSubscriptions(prev => prev.filter(sub => sub.id !== id));
    }
  };

  const handleCancelAdd = () => {
    setEditingSubscription(undefined);
    setActiveTab('dashboard');
  };

  // 로그인하지 않은 경우 로그인 화면 표시
  if (!user) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-md mx-auto bg-card min-h-screen relative">
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as ActiveTab)}>
          {/* 상단 헤더 */}
          <div className="sticky top-0 z-10 border-b backdrop-blur-sm" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <div className="p-4">
              <h1 className="text-center text-white">WhatSub</h1>
            </div>
          </div>

          {/* 콘텐츠 영역 */}
          <TabsContent value="dashboard" className="mt-0">
            <Dashboard 
              subscriptions={subscriptions}
              onAddSubscription={() => setActiveTab('add')}
            />
          </TabsContent>

          <TabsContent value="subscriptions" className="mt-0">
            <SubscriptionList
              subscriptions={subscriptions}
              onEdit={handleEditSubscription}
              onDelete={handleDeleteSubscription}
            />
          </TabsContent>

          <TabsContent value="add" className="mt-0">
            <AddSubscription
              subscription={editingSubscription}
              onSave={handleAddSubscription}
              onCancel={handleCancelAdd}
            />
          </TabsContent>

          <TabsContent value="statistics" className="mt-0">
            <Statistics subscriptions={subscriptions} />
          </TabsContent>

          <TabsContent value="profile" className="mt-0">
            <Profile subscriptions={subscriptions} />
          </TabsContent>

          {/* 하단 네비게이션 */}
          <div className="fixed bottom-0 left-0 right-0 bg-card/80 backdrop-blur-md border-t z-10">
            <div className="max-w-md mx-auto">
              <TabsList className="grid w-full grid-cols-5 h-16 rounded-none bg-transparent">
                <TabsTrigger value="dashboard" className="flex flex-col gap-1 data-[state=active]:text-primary">
                  <Home className="h-5 w-5" />
                  <span className="text-xs">홈</span>
                </TabsTrigger>
                <TabsTrigger value="subscriptions" className="flex flex-col gap-1 data-[state=active]:text-primary">
                  <List className="h-5 w-5" />
                  <span className="text-xs">목록</span>
                </TabsTrigger>
                <TabsTrigger value="add" className="flex flex-col gap-1 data-[state=active]:text-primary">
                  <Plus className="h-5 w-5" />
                  <span className="text-xs">추가</span>
                </TabsTrigger>
                <TabsTrigger value="statistics" className="flex flex-col gap-1 data-[state=active]:text-primary">
                  <BarChart3 className="h-5 w-5" />
                  <span className="text-xs">통계</span>
                </TabsTrigger>
                <TabsTrigger value="profile" className="flex flex-col gap-1 data-[state=active]:text-primary">
                  <UserCircle className="h-5 w-5" />
                  <span className="text-xs">프로필</span>
                </TabsTrigger>
              </TabsList>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
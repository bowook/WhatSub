import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Button } from '../ui/button';
import { ChevronLeft, Bell } from 'lucide-react';
import AdBanner from '../AdBanner';

interface NotificationSettingsProps {
  onBack: () => void;
}

export default function NotificationSettings({ onBack }: NotificationSettingsProps) {
  const [settings, setSettings] = useState({
    paymentReminder: true,
    daysBefore: 3,
    dailyReminder: false,
    weeklyReport: true,
    pushEnabled: true,
  });

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* 헤더 */}
      <div className="sticky top-0 z-10 bg-card border-b">
        <div className="flex items-center gap-3 p-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2 flex-1">
            <Bell className="h-5 w-5" />
            <h2>알림 설정</h2>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* 광고 배너 */}
        <AdBanner size="small" />

        {/* 결제 알림 */}
        <Card>
          <CardHeader>
            <CardTitle>결제 알림</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label>결제일 알림</Label>
                <p className="text-sm text-muted-foreground">
                  결제일이 다가오면 미리 알려드립니다
                </p>
              </div>
              <Switch
                checked={settings.paymentReminder}
                onCheckedChange={(checked) => 
                  setSettings({ ...settings, paymentReminder: checked })
                }
              />
            </div>

            {settings.paymentReminder && (
              <div className="space-y-2 pl-4 border-l-2">
                <Label>알림 시점</Label>
                <Select
                  value={settings.daysBefore.toString()}
                  onValueChange={(value) => 
                    setSettings({ ...settings, daysBefore: parseInt(value) })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1일 전</SelectItem>
                    <SelectItem value="3">3일 전</SelectItem>
                    <SelectItem value="5">5일 전</SelectItem>
                    <SelectItem value="7">7일 전</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </CardContent>
        </Card>

        {/* 정기 리포트 */}
        <Card>
          <CardHeader>
            <CardTitle>정기 리포트</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label>일일 리마인더</Label>
                <p className="text-sm text-muted-foreground">
                  매일 오전 9시에 오늘의 구독 현황
                </p>
              </div>
              <Switch
                checked={settings.dailyReminder}
                onCheckedChange={(checked) => 
                  setSettings({ ...settings, dailyReminder: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label>주간 리포트</Label>
                <p className="text-sm text-muted-foreground">
                  매주 월요일 이번 주 결제 일정
                </p>
              </div>
              <Switch
                checked={settings.weeklyReport}
                onCheckedChange={(checked) => 
                  setSettings({ ...settings, weeklyReport: checked })
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* 푸시 알림 */}
        <Card>
          <CardHeader>
            <CardTitle>푸시 알림</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label>푸시 알림 활성화</Label>
                <p className="text-sm text-muted-foreground">
                  앱 알림을 받으려면 활성화하세요
                </p>
              </div>
              <Switch
                checked={settings.pushEnabled}
                onCheckedChange={(checked) => 
                  setSettings({ ...settings, pushEnabled: checked })
                }
              />
            </div>
          </CardContent>
        </Card>

        <Button className="w-full" onClick={() => alert('설정이 저장되었습니다.')}>
          저장
        </Button>
      </div>
    </div>
  );
}

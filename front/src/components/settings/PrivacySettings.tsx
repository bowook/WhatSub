import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Button } from '../ui/button';
import { ChevronLeft, Shield, Lock, Eye, Trash2 } from 'lucide-react';
import AdBanner from '../AdBanner';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog';

interface PrivacySettingsProps {
  onBack: () => void;
}

export default function PrivacySettings({ onBack }: PrivacySettingsProps) {
  const [settings, setSettings] = useState({
    analytics: true,
    crashReports: true,
    personalization: false,
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
            <Shield className="h-5 w-5" />
            <h2>개인정보 보호</h2>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* 광고 배너 */}
        <AdBanner size="small" />

        {/* 데이터 수집 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              데이터 수집
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label>사용 통계</Label>
                <p className="text-sm text-muted-foreground">
                  앱 개선을 위한 익명 사용 데이터
                </p>
              </div>
              <Switch
                checked={settings.analytics}
                onCheckedChange={(checked) => 
                  setSettings({ ...settings, analytics: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label>오류 보고서</Label>
                <p className="text-sm text-muted-foreground">
                  앱 안정성 향상을 위한 오류 정보
                </p>
              </div>
              <Switch
                checked={settings.crashReports}
                onCheckedChange={(checked) => 
                  setSettings({ ...settings, crashReports: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label>맞춤 설정</Label>
                <p className="text-sm text-muted-foreground">
                  개인화된 추천 및 경험 제공
                </p>
              </div>
              <Switch
                checked={settings.personalization}
                onCheckedChange={(checked) => 
                  setSettings({ ...settings, personalization: checked })
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* 보안 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              보안
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Lock className="h-4 w-4 mr-2" />
              비밀번호 변경
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Shield className="h-4 w-4 mr-2" />
              2단계 인증 설정
            </Button>
          </CardContent>
        </Card>

        {/* 데이터 관리 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trash2 className="h-4 w-4" />
              데이터 관리
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              내 데이터 다운로드
            </Button>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive">
                  <Trash2 className="h-4 w-4 mr-2" />
                  모든 데이터 삭제
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>정말로 삭제하시겠습니까?</AlertDialogTitle>
                  <AlertDialogDescription>
                    이 작업은 되돌릴 수 없습니다. 모든 구독 데이터가 영구적으로 삭제됩니다.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>취소</AlertDialogCancel>
                  <AlertDialogAction className="bg-destructive hover:bg-destructive/90">
                    삭제
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>

        <Button className="w-full" onClick={() => alert('설정이 저장되었습니다.')}>
          저장
        </Button>
      </div>
    </div>
  );
}

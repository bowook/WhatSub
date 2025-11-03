import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { ChevronLeft, User, Mail, Camera } from 'lucide-react';
import AdBanner from '../AdBanner';

interface AccountSettingsProps {
  onBack: () => void;
}

export default function AccountSettings({ onBack }: AccountSettingsProps) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    avatar: user?.avatar || ''
  });

  const handleSave = () => {
    // TODO: Supabase 연동 후 실제 저장 로직 구현
    alert('계정 정보가 저장되었습니다. (Supabase 연동 후 실제 구현 예정)');
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* 헤더 */}
      <div className="sticky top-0 z-10 bg-card border-b">
        <div className="flex items-center gap-3 p-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2 flex-1">
            <User className="h-5 w-5" />
            <h2>계정 정보 수정</h2>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* 광고 배너 */}
        <AdBanner size="small" />

        {/* 프로필 사진 */}
        <Card>
          <CardHeader>
            <CardTitle>프로필 사진</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={formData.avatar} />
                <AvatarFallback>
                  {formData.name?.charAt(0).toUpperCase() || formData.email.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <Button variant="outline" className="flex items-center gap-2">
                <Camera className="h-4 w-4" />
                사진 변경
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              JPG, PNG 파일 (최대 5MB)
            </p>
          </CardContent>
        </Card>

        {/* 기본 정보 */}
        <Card>
          <CardHeader>
            <CardTitle>기본 정보</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">이름</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="이름을 입력하세요"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                이메일
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="email@example.com"
                disabled
              />
              <p className="text-xs text-muted-foreground">
                이메일은 소셜 로그인 계정으로 변경할 수 없습니다
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">전화번호 (선택)</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="010-0000-0000"
              />
            </div>
          </CardContent>
        </Card>

        {/* 연결된 계정 */}
        <Card>
          <CardHeader>
            <CardTitle>연결된 계정</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                  G
                </div>
                <div>
                  <div className="text-sm">Google</div>
                  <div className="text-xs text-muted-foreground">{user?.email}</div>
                </div>
              </div>
              <Button variant="outline" size="sm">
                연결 해제
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 저장 버튼 */}
        <div className="flex gap-3">
          <Button variant="outline" onClick={onBack} className="flex-1">
            취소
          </Button>
          <Button onClick={handleSave} className="flex-1">
            저장
          </Button>
        </div>

        <p className="text-xs text-center text-muted-foreground">
          계정 정보 변경 기능은 Supabase 연동 후 완전히 구현됩니다
        </p>
      </div>
    </div>
  );
}

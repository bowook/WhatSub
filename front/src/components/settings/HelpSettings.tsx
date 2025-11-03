import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { ChevronLeft, HelpCircle, MessageCircle, Mail, FileText, ExternalLink } from 'lucide-react';
import AdBanner from '../AdBanner';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';

interface HelpSettingsProps {
  onBack: () => void;
}

export default function HelpSettings({ onBack }: HelpSettingsProps) {
  const faqs = [
    {
      question: 'N빵 기능은 어떻게 사용하나요?',
      answer: '구독 추가 시 "N빵으로 공유" 옵션을 켜고 공유 인원 수를 입력하면, 전체 구독료가 인원수로 나뉘어 개인 부담금이 자동 계산됩니다.'
    },
    {
      question: '환율은 어떻게 적용되나요?',
      answer: '구독 추가 시 통화를 선택하면 실시간 환율이 자동으로 적용됩니다. 외화로 결제하는 구독도 한화로 환산하여 통계에 반영됩니다.'
    },
    {
      question: '결제 알림은 언제 오나요?',
      answer: '알림 설정에서 원하는 시점(1~7일 전)을 선택하면 해당 시점에 푸시 알림이 발송됩니다.'
    },
    {
      question: '데이터는 어디에 저장되나요?',
      answer: '모든 데이터는 안전하게 암호화되어 저장됩니다. 백업 및 동기화를 위해 클라우드 연동이 가능합니다.'
    },
    {
      question: '구독을 삭제하면 복구할 수 있나요?',
      answer: '삭제된 구독은 30일 동안 휴지통에 보관되며, 그 기간 내에 복구할 수 있습니다.'
    }
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* 헤더 */}
      <div className="sticky top-0 z-10 bg-card border-b">
        <div className="flex items-center gap-3 p-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2 flex-1">
            <HelpCircle className="h-5 w-5" />
            <h2>도움말 & 지원</h2>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* 광고 배너 */}
        <AdBanner size="small" />

        {/* 문의하기 */}
        <Card>
          <CardHeader>
            <CardTitle>문의하기</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <MessageCircle className="h-4 w-4 mr-2" />
              카카오톡 문의
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Mail className="h-4 w-4 mr-2" />
              이메일 문의
            </Button>
          </CardContent>
        </Card>

        {/* 자주 묻는 질문 */}
        <Card>
          <CardHeader>
            <CardTitle>자주 묻는 질문</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* 리소스 */}
        <Card>
          <CardHeader>
            <CardTitle>리소스</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-between">
              <span className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                사용 가이드
              </span>
              <ExternalLink className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="w-full justify-between">
              <span className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                개인정보 처리방침
              </span>
              <ExternalLink className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="w-full justify-between">
              <span className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                서비스 이용약관
              </span>
              <ExternalLink className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        {/* 앱 정보 */}
        <Card>
          <CardHeader>
            <CardTitle>앱 정보</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">버전</span>
              <span>1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">최신 업데이트</span>
              <span>2025.10.18</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">개발사</span>
              <span>WhatSub Team</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

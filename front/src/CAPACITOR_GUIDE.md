# 📱 Capacitor를 사용한 Android APK 변환 가이드

이 가이드는 현재 React 웹앱을 Android 네이티브 앱(APK)으로 변환하는 방법을 설명합니다.

## 🎯 Capacitor란?

**Capacitor**는 Ionic 팀이 만든 크로스 플랫폼 네이티브 런타임입니다.
- ✅ 웹 코드를 그대로 사용하여 Android/iOS 앱 생성
- ✅ 네이티브 기능 접근 가능 (카메라, 알림, 파일 시스템 등)
- ✅ Google Play Store / App Store 배포 가능
- ✅ 네이티브 앱과 거의 동일한 성능

---

## 📋 사전 준비사항

### 1. 개발 환경 설치

**Node.js & npm** (이미 설치되어 있음)
```bash
node --version  # v16 이상 확인
npm --version
```

**Android Studio 설치**
1. [Android Studio 다운로드](https://developer.android.com/studio)
2. 설치 시 Android SDK, Android SDK Platform, Android Virtual Device 모두 선택
3. SDK Manager에서 최신 Android SDK 설치 (API 33 이상 권장)

**환경 변수 설정** (Windows)
```
ANDROID_HOME=C:\Users\[사용자명]\AppData\Local\Android\Sdk
Path에 추가: %ANDROID_HOME%\platform-tools
Path에 추가: %ANDROID_HOME%\tools
```

**환경 변수 설정** (Mac/Linux)
```bash
# ~/.zshrc 또는 ~/.bash_profile에 추가
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/tools
```

---

## 🚀 Step 1: 프로젝트 빌드 설정

현재 프로젝트가 Vite 기반이라고 가정하고 진행합니다.

### 1-1. package.json 확인

프로젝트 루트에 `package.json` 파일이 있어야 하며, 빌드 스크립트가 있어야 합니다:

```json
{
  "name": "subscription-manager",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.x.x",
    "react-dom": "^18.x.x"
    // ... 기타 의존성
  }
}
```

### 1-2. 웹앱 빌드 테스트

```bash
npm run build
```

성공하면 `dist` 폴더가 생성됩니다.

---

## 📦 Step 2: Capacitor 설치

### 2-1. Capacitor Core 설치

```bash
npm install @capacitor/core @capacitor/cli
```

### 2-2. Capacitor 초기화

```bash
npx cap init
```

다음 정보를 입력하라는 프롬프트가 나타납니다:

```
? App name: WhatSub
? App Package ID (in Java package format, no dashes): com.subscription.manager
? Web asset directory (default is dist): dist
```

- **App name**: 앱 이름 (한글 가능)
- **Package ID**: 고유한 패키지명 (역도메인 형식, 예: com.yourname.appname)
- **Web asset directory**: 빌드 결과물 폴더 (보통 `dist` 또는 `build`)

### 2-3. Android 플랫폼 추가

```bash
npm install @capacitor/android
npx cap add android
```

이제 프로젝트에 `android` 폴더가 생성됩니다!

---

## ⚙️ Step 3: Capacitor 설정 파일 구성

### 3-1. capacitor.config.ts 수정

프로젝트 루트에 생성된 `capacitor.config.ts` 파일을 다음과 같이 수정:

```typescript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.subscription.manager',
  appName: '구독 매니저',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#667eea",
      showSpinner: false
    }
  }
};

export default config;
```

### 3-2. index.html 수정

`index.html`의 `<head>` 섹션에 다음을 추가:

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
    <title>WhatSub</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

---

## 🔨 Step 4: Android 앱 빌드

### 4-1. 웹 자산 빌드 및 복사

```bash
# 웹앱 빌드
npm run build

# Capacitor에 빌드 결과물 복사
npx cap copy android

# 또는 sync (플러그인도 함께 동기화)
npx cap sync android
```

### 4-2. Android Studio에서 프로젝트 열기

```bash
npx cap open android
```

Android Studio가 자동으로 실행됩니다.

### 4-3. Android Studio에서 빌드

1. Android Studio가 프로젝트를 로드할 때까지 대기 (Gradle 동기화)
2. 상단 메뉴: **Build → Build Bundle(s) / APK(s) → Build APK(s)**
3. 빌드가 완료되면 APK 경로가 표시됩니다
   - 보통 `android/app/build/outputs/apk/debug/app-debug.apk`

### 4-4. 에뮬레이터/실제 기기에서 실행

**에뮬레이터 사용:**
1. Android Studio → AVD Manager → Create Virtual Device
2. Pixel 5 등 최신 기기 선택
3. 상단의 실행 버튼(▶️) 클릭

**실제 기기 사용:**
1. 안드로이드 폰을 USB로 연결
2. 개발자 옵션 활성화 및 USB 디버깅 켜기
3. Android Studio에서 기기 선택 후 실행

---

## 🔔 Step 5: 네이티브 기능 추가 (선택사항)

### 5-1. 푸시 알림 (Local Notifications)

```bash
npm install @capacitor/local-notifications
npx cap sync
```

**사용 예시:**

```typescript
import { LocalNotifications } from '@capacitor/local-notifications';

// 권한 요청
await LocalNotifications.requestPermissions();

// 알림 스케줄링
await LocalNotifications.schedule({
  notifications: [
    {
      title: "넷플릭스 결제 알림",
      body: "내일 17,000원이 결제됩니다.",
      id: 1,
      schedule: { at: new Date(Date.now() + 1000 * 60 * 60 * 24) } // 24시간 후
    }
  ]
});
```

### 5-2. 앱 아이콘 설정

**Android 아이콘 생성:**
1. [App Icon Generator](https://www.appicon.co/) 방문
2. 1024x1024 이미지 업로드
3. Android 아이콘 다운로드
4. `android/app/src/main/res/` 폴더에 각 해상도별로 복사
   - mipmap-hdpi
   - mipmap-mdpi
   - mipmap-xhdpi
   - mipmap-xxhdpi
   - mipmap-xxxhdpi

### 5-3. 스플래시 스크린 설정

`android/app/src/main/res/values/styles.xml` 수정:

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <style name="AppTheme.NoActionBarLaunch" parent="AppTheme.NoActionBar">
        <item name="android:background">@drawable/splash</item>
    </style>
</resources>
```

스플래시 이미지를 `android/app/src/main/res/drawable/splash.png`로 추가

---

## 📤 Step 6: APK 배포 준비

### 6-1. 릴리즈 APK 빌드

Android Studio에서:
1. **Build → Generate Signed Bundle / APK**
2. **APK 선택**
3. 키스토어 생성 (처음인 경우)
   - Key store path: 안전한 위치 선택
   - Password: 강력한 비밀번호
   - Alias: 앱 이름
4. Build Variants: **release** 선택
5. 빌드 완료 후 `app-release.apk` 생성

### 6-2. Google Play Console 업로드

1. [Google Play Console](https://play.google.com/console) 가입
2. 새 앱 만들기
3. APK 업로드 (또는 AAB 권장)
4. 스토어 등록 정보 작성
5. 검토 제출

---

## 🔄 Step 7: 개발 워크플로우

### 7-1. 코드 변경 시 반영하기

웹 코드를 수정한 후:

```bash
# 1. 웹앱 빌드
npm run build

# 2. Android에 복사
npx cap sync android

# 3. Android Studio에서 실행 (또는 명령어로)
npx cap run android
```

### 7-2. 라이브 리로드 (개발 시 편리)

개발 중에는 로컬 서버를 사용할 수 있습니다:

`capacitor.config.ts` 수정:

```typescript
const config: CapacitorConfig = {
  appId: 'com.subscription.manager',
  appName: 'WhatSub',
  webDir: 'dist',
  server: {
    url: 'http://192.168.0.10:5173', // 로컬 IP:포트
    cleartext: true
  }
};
```

```bash
# 개발 서버 실행
npm run dev

# 다른 터미널에서
npx cap run android
```

이제 코드 변경 시 자동으로 앱에 반영됩니다!

---

## 🎨 Step 8: WhatSub 앱에 필요한 추가 플러그인

### 8-1. 앱 정보 (App Info)

```bash
npm install @capacitor/app
```

```typescript
import { App } from '@capacitor/app';

// 앱 버전 확인
const info = await App.getInfo();
console.log('App version:', info.version);
```

### 8-2. Storage (로컬 저장소)

```bash
npm install @capacitor/preferences
```

```typescript
import { Preferences } from '@capacitor/preferences';

// 데이터 저장
await Preferences.set({
  key: 'subscriptions',
  value: JSON.stringify(subscriptions)
});

// 데이터 불러오기
const { value } = await Preferences.get({ key: 'subscriptions' });
const subscriptions = JSON.parse(value || '[]');
```

### 8-3. Share (공유 기능)

```bash
npm install @capacitor/share
```

```typescript
import { Share } from '@capacitor/share';

// 구독 데이터 공유
await Share.share({
  title: '내 구독 현황',
  text: `월 ${totalCost}원 지출 중`,
  url: 'https://yourapp.com',
  dialogTitle: '공유하기'
});
```

---

## 🐛 문제 해결

### 문제 1: Android Studio 빌드 오류

**증상:** Gradle 동기화 실패

**해결:**
```bash
cd android
./gradlew clean
./gradlew build
```

### 문제 2: 앱이 흰 화면만 표시

**원인:** 웹 자산 경로 문제

**해결:**
```bash
npm run build
npx cap copy android
npx cap sync android
```

### 문제 3: 네트워크 요청 실패 (CORS)

**원인:** Android는 기본적으로 cleartext HTTP를 차단

**해결:** `android/app/src/main/AndroidManifest.xml`에 추가:
```xml
<application
    android:usesCleartextTraffic="true"
    ...>
```

### 문제 4: React Router 라우팅 문제

**해결:** `capacitor.config.ts`에서:
```typescript
server: {
  androidScheme: 'https',
  hostname: 'app'
}
```

---

## 📊 성능 최적화

### 1. 번들 크기 줄이기

```bash
# Vite 빌드 분석
npm run build -- --analyze
```

### 2. 이미지 최적화

- WebP 포맷 사용
- 불필요한 큰 이미지 제거
- 아이콘은 SVG 사용

### 3. Code Splitting

```typescript
// React Lazy Loading
import { lazy, Suspense } from 'react';

const Statistics = lazy(() => import('./components/Statistics'));

<Suspense fallback={<div>Loading...</div>}>
  <Statistics />
</Suspense>
```

---

## 📱 앱 권한 설정

`android/app/src/main/AndroidManifest.xml`에 필요한 권한 추가:

```xml
<manifest>
    <!-- 알림 권한 (Android 13+) -->
    <uses-permission android:name="android.permission.POST_NOTIFICATIONS" />
    
    <!-- 네트워크 상태 확인 -->
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    
    <!-- 인터넷 접근 -->
    <uses-permission android:name="android.permission.INTERNET" />
</manifest>
```

---

## ✅ 체크리스트

배포 전 확인사항:

- [ ] 앱 이름 확인
- [ ] 앱 아이콘 설정
- [ ] 스플래시 스크린 설정
- [ ] 버전 코드/이름 설정 (`android/app/build.gradle`)
- [ ] 릴리즈 키스토어 생성 및 안전하게 보관
- [ ] ProGuard 설정 (코드 난독화)
- [ ] 개인정보 처리방침 작성
- [ ] Google Play Console 앱 정보 작성
- [ ] 스크린샷 준비 (최소 2개)
- [ ] 기능 그래픽 (1024x500)

---

## 🎯 다음 단계

1. ✅ **지금 바로 시도**: 위 Step 1-4를 따라 첫 APK 생성
2. 🔔 **알림 기능 추가**: Local Notifications 플러그인 사용
3. 💾 **데이터 영구 저장**: Preferences 또는 SQLite 사용
4. 🔐 **Supabase 연동**: 실제 백엔드 기능 구현
5. 📤 **Google Play 배포**: 전 세계 사용자에게 공개

---

## 📚 추가 자료

- [Capacitor 공식 문서](https://capacitorjs.com/docs)
- [Android 개발자 가이드](https://developer.android.com/guide)
- [Google Play Console 헬프](https://support.google.com/googleplay/android-developer)
- [Capacitor Plugins](https://capacitorjs.com/docs/plugins)

---

## 💡 팁

**개발 속도 향상:**
```bash
# alias 설정 (.zshrc / .bashrc)
alias cap-build="npm run build && npx cap sync"
alias cap-run="npm run build && npx cap sync && npx cap run android"
```

**Android Studio 메모리 최적화:**
`android/gradle.properties`에 추가:
```
org.gradle.jvmargs=-Xmx4096m -XX:MaxPermSize=512m
```

---

## 🎉 완료!

이제 웹 개발 지식만으로 Android 네이티브 앱을 만들 수 있습니다!

궁금한 점이 있으면 언제든지 문의하세요. 🚀

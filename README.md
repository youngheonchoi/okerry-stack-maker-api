# okerry-stack-maker-api

okerry-stack-maker 미니앱에서 호출하는 Next.js + TypeScript API 서버입니다. 미니앱과 별도 저장소이며 Vercel에 독립적으로 배포합니다.

## 로컬 개발

Node.js 24 이상과 npm을 사용하세요.

```bash
npm ci
npm run dev
```

기본 주소: http://localhost:3001

- GET /: 서비스 정보
- GET /api/health: 상태 확인, { "status": "ok", "service": "okerry-stack-maker-api" }
- OPTIONS /api/*: CORS 사전 요청 처리

```bash
npm run lint
npm run typecheck
npm run build
npm start
```

새 API는 src/app/api/<경로>/route.ts에 추가합니다. 상태 확인 API는 공개 엔드포인트이며, 사용자 인증과 데이터베이스는 아직 연결하지 않았습니다.

## 미니앱 통신과 CORS

src/proxy.ts에서 /api/* 요청에 CORS를 적용합니다. 현재 미니앱 SDK 3.8.1에 맞춰 다음 Origin을 정확히 허용합니다.

- https://okerry-stack-maker.apps.tossmini.com
- https://okerry-stack-maker.private-apps.tossmini.com

개발 모드에서만 http://localhost:5173과 http://127.0.0.1:5173을 추가로 허용합니다. Vercel과 프로덕션 모드에서는 localhost를 허용하지 않습니다. 다른 Origin은 403을 반환합니다. Origin이 없는 서버 간 요청은 허용합니다.

CORS는 사용자 인증을 대신하지 않습니다. 사용자 데이터 API를 추가할 때 서버에서 검증하는 인증과 접근 권한을 함께 구현하세요. 토스 파트너 API를 호출하려면 mTLS 인증서 설정과 파트너 API 응답 검증도 별도로 구현해야 합니다.

공식 기준: https://developers-apps-in-toss.toss.im/documentation/integration/server-api

## Vercel 배포

1. Vercel의 새 프로젝트에서 youngheonchoi/okerry-stack-maker-api 저장소를 가져옵니다.
2. Framework Preset은 Next.js, Root Directory는 저장소 루트(.)를 사용합니다.
3. 패키지 설치와 빌드는 자동 감지되는 npm ci 및 npm run build를 사용합니다.
4. 배포 후 https://<실제 배포 도메인>/api/health에서 응답을 확인합니다.
5. 미니앱의 VITE_API_BASE_URL에 실제 배포 주소를 설정하고 다시 빌드합니다. 이 프로젝트 생성 작업에서는 미니앱 코드를 변경하지 않았습니다.

Vercel 프로젝트 생성이나 배포는 아직 실행하지 않았습니다. 현재 API는 별도 환경 변수 없이 실행됩니다. 나중에 추가하는 비밀값은 Vercel Environment Variables와 로컬 .env.local에만 저장하고, NEXT_PUBLIC_ 접두사를 붙이지 마세요.

## Git 관리

node_modules, .next, .vercel, .env 파일, 인증서와 개인키는 제외합니다. package-lock.json과 비밀값 없는 .env.example은 커밋할 수 있습니다.

저장소: https://github.com/youngheonchoi/okerry-stack-maker-api.git

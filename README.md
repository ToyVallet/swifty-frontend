# Swifty 프로젝트 프론트엔드 레포지토리

[![🚀 Chromatic Deployment](https://github.com/ToyVallet/swifty-frontend/actions/workflows/deploy.yml/badge.svg?branch=dev)](https://github.com/ToyVallet/swifty-frontend/actions/workflows/deploy.yml)

Swifty 프로젝트의 프론트엔드 레포지토리입니다.
모노레포를 사용하고 있으며, [Turborepo](https://turbo.build/repo/docs/)를 사용하고 있습니다.

### Apps and Packages

- `swifty`: 본 서비스
- `@swifty/ui`: 공통 UI 컴포넌트 라이브러리
- `@swifty/eslint-config`: `eslint` 설정
- `@swifty/typescript-config`: 모노레포 전체에 적용되는`tsconfig.json` 파일들

### package 설치

패키지 설치 명령어는 다음과 같이 입력합니다.

```bash
yarn workspace swifty add <package>
```

### Build

모든 패키지를 빌드하기 위해서는 다음의 커맨드를 실행합니다.

```bash
yarn build
```

### Develop

모든 앱을 개발모드로 실행하기 위해서는 다음의 커맨드를 실행합니다.

```bash
yarn dev
```

### Test

모든 패키지의 테스트를 실행하기 위해서는 다음의 커맨드를 실행합니다.

```bash
yarn test
```

### Lint

모든 패키지의 lint를 실행하기 위해서는 다음의 커맨드를 실행합니다.

```bash
yarn lint
```

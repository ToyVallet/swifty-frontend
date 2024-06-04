## Navigation

### 사용자 관리(USER)

- 사용자 목록, 학교 목록(학교CRUD)

### 축제 관리

- 축제 CRUD -> 라인업 CRUD
- 축제 생성
  - 날짜 정보를 입력하면 콘서트까지 생성이 된다.
  - 학교 입력은 required

### host dns 수정하기

1. host 파일의 DNS 네임을 localhost.swifty.kr로 수정합니다.
2. mkcert를 생성후 swifty root 프로젝트에서 사용할 인증서를 아래와 같이 생성합니다.

```sh
  mkcert "*.swifty.kr" localhost 127.0.0.1 ::1
```

3. 두 인증서의 이름을 다음과 같이 변경합니다.
   key : loaclhost-key
   cert: localhost
4. `npm run https` 혹은 `yarn https`로 실행합니다.

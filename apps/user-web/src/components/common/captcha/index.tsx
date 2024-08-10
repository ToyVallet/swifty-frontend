'use client';

import { http } from '@swifty/shared-lib';
import type { RefObject } from 'react';
import { useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

type Props = {
  onSucess?: () => void;
};

export default function GoogleCaptcha({ onSucess }: Props) {
  const recaptcha: RefObject<ReCAPTCHA> = useRef(null);
  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const onChange = async (value: string | null) => {
    // 서버로 데이터 전송하기
    const result = await http.post<{ result: boolean }>(
      '/recaptcha',
      {
        token: value,
      },
      { credentials: 'include' },
    );
    // 데이터 확인 성공
    if (result) {
      onSucess?.();
    }
  };
  return (
    <ReCAPTCHA
      sitekey="6LfgthoqAAAAAHkLJli12cf5AH1Qetq6s7BQkjqh"
      onChange={onChange}
      ref={recaptcha}
      size="normal"
      theme={isDark ? 'light' : 'dark'}
    />
  );
}

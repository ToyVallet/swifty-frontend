'use client';

import type { RefObject } from 'react';
import { useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

type Props = {
  onSucess?: () => void;
};

export default function GoogleCaptcha({ onSucess }: Props) {
  const recaptcha: RefObject<ReCAPTCHA> = useRef(null);
  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const onChange = (value: string | null) => {
    // 서버로 데이터 전송하기
    console.log(value);
    // 데이터 확인 성공
    onSucess?.();
  };
  return (
    <ReCAPTCHA
      sitekey="6Lf1fxoqAAAAALPYFLz7APuNwHCGLOjvh_j8wxbh"
      onChange={onChange}
      ref={recaptcha}
      size="normal"
      theme={isDark ? 'light' : 'dark'}
    />
  );
}

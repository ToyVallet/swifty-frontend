'use client';

import { Button, Input } from '@swifty/ui';
import { forwardRef, useRef, useState } from 'react';
import type { ControllerRenderProps } from 'react-hook-form';

export default forwardRef<HTMLInputElement, Omit<ControllerRenderProps, 'ref'>>(
  function PhoneInput({ onBlur, ...props }) {
    const inputRef = useRef<HTMLInputElement>(null);

    const text = ['인증번호 발송', '발송 완료'] as const;
    const [buttonText, setButtonText] =
      useState<(typeof text)[number]>('인증번호 발송');

    // 버튼 상태 조정하기
    const [showButton, setShowButton] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);

    const onClick = () => {
      // text에 따른 로직 변경
      console.log(inputRef.current?.value);
      if (buttonText === '인증번호 발송') {
        setIsLoading(true);
      }
      if (buttonText === '발송 완료') {
        setIsDisabled(true);
      }
    };

    const handleFocus = () => {
      setShowButton(true);
    };

    const handleBlur = () => {
      if (!inputRef.current?.value) {
        setShowButton(false);
      }
      onBlur?.();
    };
    return (
      <Input
        ref={inputRef}
        placeholder="휴대폰 번호"
        type="tel"
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
        button={
          showButton && (
            <Button
              type="button"
              className="absolute top-[12px] right-[12px] transition-all"
              onClick={onClick}
              isLoading={isLoading}
              disabled={isDisabled}
            >
              {buttonText}
            </Button>
          )
        }
      />
    );
  },
);

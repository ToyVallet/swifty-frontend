'use client';

import { Button, Input } from '@swifty/ui';
import { forwardRef, useRef, useState } from 'react';
import type { ControllerRenderProps } from 'react-hook-form';

export default forwardRef<HTMLInputElement, Omit<ControllerRenderProps, 'ref'>>(
  function IdCheckInput({ onBlur, ...props }) {
    const inputRef = useRef<HTMLInputElement>(null);

    const text = ['중복 확인', '사용 가능'] as const;
    const [buttonText, setButtonText] =
      useState<(typeof text)[number]>('중복 확인');

    // 버튼 상태 조정하기
    const [showButton, setShowButton] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);

    const onClick = () => {
      // text에 따른 로직 변경
      console.log(inputRef.current?.value);
      if (buttonText === '중복 확인') {
        setIsLoading(true);
      }
      if (buttonText === '사용 가능') {
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
        placeholder="아이디"
        type="text"
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

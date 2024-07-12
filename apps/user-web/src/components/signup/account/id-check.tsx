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

    const onCheckDuplicate = () => {
      // text에 따른 로직 변경
      if (buttonText === '중복 확인') {
        setIsLoading(true);
      }
      if (buttonText === '사용 가능') {
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
        label="아이디"
        type="text"
        onFocus={handleFocus}
        onBlur={handleBlur}
        /*         button={
          showButton && (
            <Button
              type="button"
              className="absolute top-[12px] right-[12px] transition-all"
              onClick={onCheckDuplicate}
              isLoading={isLoading}
              disabled={buttonText === '사용 가능'}
              variant={buttonText === '중복 확인' ? 'default' : 'white'}
            >
              {buttonText}
            </Button>
          )
        } */
        {...props}
      />
    );
  },
);

'use client';

import { Button, Input } from '@swifty/ui';
import { forwardRef, useRef, useState } from 'react';
import type { ControllerRenderProps } from 'react-hook-form';

export default forwardRef<HTMLInputElement, Omit<ControllerRenderProps, 'ref'>>(
  function CheckPhoneInput({ onBlur, ...props }) {
    const inputRef = useRef<HTMLInputElement>(null);

    // 버튼 상태 조정하기
    const [showButton, setShowButton] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);

    const onClick = () => {};

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
        placeholder="인증번호"
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
              인증확인
            </Button>
          )
        }
      />
    );
  },
);

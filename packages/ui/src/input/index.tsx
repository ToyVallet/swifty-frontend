'use client';

import { cn } from '@swifty/shared-lib';
import {
  type ComponentPropsWithoutRef,
  forwardRef,
  useCallback,
  useState,
} from 'react';

import EyeCrossIcon from '../../icon/input/eye-cross.svg';
import EyeIcon from '../../icon/input/eye.svg';
import { If } from '../lib';
import { Label } from './label';

interface InputProps
  extends Omit<ComponentPropsWithoutRef<'input'>, 'name' | 'placeholder'> {
  name: string;
  placeholder: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(function (
  {
    name,
    disabled,
    type = 'text',
    placeholder,
    onFocus,
    onBlur,
    value,
    ...props
  },
  ref,
) {
  const [isFocused, setIsFocused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const isActive = isFocused || !!value;

  const toggleVisibilty = () => {
    setIsVisible((prev) => !prev);
  };

  const handleFocus = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  }, []);

  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur?.(e);
  }, []);

  return (
    <div
      className={cn(
        'w-full relative rounded-xl overflow-hidden bg-neutral-800 border *:transition-all *:duration-200 *:ease-in-out',
        isFocused ? 'border-primary shadow-input-active' : 'border-transparent',
      )}
    >
      {placeholder && (
        <Label
          htmlFor={name}
          className={cn(
            'left-5 absolute top-[14px]',
            isActive ? 'text-14' : 'text-16',
            isFocused ? 'text-primary' : 'text-swifty-color-400',
          )}
        >
          {placeholder}
        </Label>
      )}
      <input
        type={!isVisible ? type : 'text'}
        ref={ref}
        className="w-full bg-transparent text-white text-16 autofill:bg-transparent"
        disabled={disabled}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={{
          marginTop: isActive ? '30px' : '',
          padding: '0.75rem 1.25rem',
        }}
        {...props}
      />
      <If condition={type === 'password' && isActive}>
        <Eye cross={isVisible} onClick={toggleVisibilty} />
      </If>
    </div>
  );
});
Input.displayName = 'Input';

type EyeProps = React.SVGProps<SVGSVGElement> & {
  cross?: boolean;
};

const Eye = forwardRef<SVGSVGElement, EyeProps>(({ cross, ...props }, ref) =>
  cross ? (
    <EyeCrossIcon
      ref={ref}
      fill="white"
      className="absolute top-1/2 right-7 translate-x-1/2 -translate-y-1/2 active:bg-swifty-color-800/80"
      {...props}
    />
  ) : (
    <EyeIcon
      ref={ref}
      fill="white"
      className="absolute top-1/2 right-7 translate-x-1/2 -translate-y-1/2 active:bg-swifty-color-800/80"
      {...props}
    />
  ),
);
Eye.displayName = 'Eye';

export default Input;

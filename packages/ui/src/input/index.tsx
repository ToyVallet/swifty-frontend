'use client';

import { cn, formatDateOfBirth, formatPhoneNumber } from '@swifty/shared-lib';
import { motion } from 'framer-motion';
import {
  type ComponentPropsWithoutRef,
  forwardRef,
  useCallback,
  useEffect,
  useState,
} from 'react';
import type { FieldError } from 'react-hook-form';

import EyeCrossIcon from '../../icon/input/eye-cross.svg';
import EyeIcon from '../../icon/input/eye.svg';
import { If, transition } from '../lib';
import { Label } from './label';

interface InputProps
  extends Omit<ComponentPropsWithoutRef<'input'>, 'name' | 'placeholder'> {
  label: string;
  name: string;
  placeholder?: string;
  isError?: FieldError | undefined;
}

export const variants = {
  initial: {
    scale: 1,
    filter: 'brightness(1)',
  },
  active: {
    scale: 0.99,
    filter: 'brightness(0.9)',
  },
  transition,
};

const Input = forwardRef<HTMLInputElement, InputProps>(function (
  {
    name,
    label,
    type = 'text',
    placeholder,
    onFocus,
    onBlur,
    value,
    onChange,
    isError,
    ...props
  },
  ref,
) {
  const [inputValue, setInputValue] = useState(value);
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

  const labelClick = useCallback((e: React.MouseEvent<HTMLLabelElement>) => {
    setIsFocused(true);
  }, []);

  useEffect(() => {
    if (name === 'search') {
      setInputValue(value);
    }
  }, [value]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    let sanitizedValue = e.target.value;
    if (type === 'number') {
      sanitizedValue = sanitizedValue.replaceAll(/[^0-9]/g, '');
    } else if (type === 'tel') {
      sanitizedValue = formatPhoneNumber(sanitizedValue).slice(0, 13);
    } else if (label === '생년월일') {
      sanitizedValue = formatDateOfBirth(sanitizedValue).slice(0, 11);
    }
    setInputValue(sanitizedValue);
    onChange?.(e);
  }, []);

  return (
    <motion.div
      tabIndex={-1}
      variants={variants}
      whileTap={'active'}
      initial="initial"
      className={cn(
        'ui-w-full ui-relative ui-rounded-xl ui-overflow-hidden ui-bg-swifty-color-200 dark:ui-bg-swifty-color-800 ui-transition-colors ui-duration-200 ui-ease-in-out',
        isFocused &&
          !isError &&
          'ui-border ui-border-primary ui-shadow-input-active',
        isError && 'ui-border ui-border-destructive ui-shadow-input-error',
      )}
    >
      {label && (
        <Label
          htmlFor={name}
          className={cn(
            'ui-absolute ui-left-5 ui-top-[14px] ui-transition-all ui-duration-200 ui-ease-in-out',
            isFocused && !isError && 'ui-text-primary',
            isError && 'ui-text-destructive',
            !isFocused && 'ui-text-swifty-color-400',
            isActive ? 'ui-text-[14px]' : 'ui-text-16',
          )}
          onClick={labelClick}
        >
          {label}
        </Label>
      )}
      <input
        ref={ref}
        id={name}
        type={!isVisible && type !== 'number' ? type : 'text'}
        value={inputValue}
        className={cn(
          'ui-w-full ui-bg-transparent ui-text-16 ui-py-3 ui-px-5 autofill:ui-bg-transparent ui-transition-all ui-duration-200 ui-ease-in-out',
          isActive && 'ui-mt-[30px]',
        )}
        inputMode={
          type === 'number' || type === 'tel' || label === '생년월일'
            ? 'numeric'
            : 'text'
        }
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder={isActive ? placeholder : ''}
        {...props}
      />
      <If condition={type === 'password' && isActive}>
        <Eye cross={isVisible} onClick={toggleVisibilty} />
      </If>
    </motion.div>
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
      className="ui-absolute ui-top-1/2 ui-right-7 ui-translate-x-1/2 ui--translate-y-1/2 active:ui-bg-swifty-color-800/80"
      {...props}
    />
  ) : (
    <EyeIcon
      ref={ref}
      fill="white"
      className="ui-absolute ui-top-1/2 ui-right-7 ui-translate-x-1/2 ui--translate-y-1/2 active:ui-bg-swifty-color-800/80"
      {...props}
    />
  ),
);
Eye.displayName = 'Eye';

export default Input;

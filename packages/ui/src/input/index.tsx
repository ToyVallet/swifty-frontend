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

import EyeCrossIcon from '../../icon/input/eye-cross.svg';
import EyeIcon from '../../icon/input/eye.svg';
import { If, transition } from '../lib';
import { Label } from './label';

interface InputProps
  extends Omit<ComponentPropsWithoutRef<'input'>, 'name' | 'placeholder'> {
  label: string;
  name: string;
  placeholder?: string;
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

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    let sanitizedValue = e.target.value;
    if (type === 'number') {
      sanitizedValue = sanitizedValue.replaceAll(/[^0-9]/g, '');
    } else if (type === 'tel') {
      sanitizedValue = formatPhoneNumber(sanitizedValue).slice(0, 13);
    }
    if (label === '생년월일') {
      sanitizedValue = formatDateOfBirth(sanitizedValue);
    }
    setInputValue(sanitizedValue);
    onChange?.(e);
  }, []);

  return (
    <motion.div
      variants={variants}
      whileTap={'active'}
      initial="initial"
      className={cn(
        'w-full relative rounded-xl overflow-hidden bg-neutral-800 border transition-colors duration-200 ease-in-out',
        isFocused ? 'border-primary shadow-input-active' : 'border-transparent',
      )}
    >
      {label && (
        <Label
          htmlFor={name}
          className={cn(
            'left-5 absolute top-[14px] transition-all duration-200 ease-in-out',
            isActive ? 'text-[14px]' : 'text-16',
            isFocused ? 'text-primary' : 'text-swifty-color-400',
          )}
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
          'w-full bg-transparent text-16 py-3 px-5 autofill:bg-transparent transition-all duration-200 ease-in-out text-white',
          isActive && 'mt-[30px]',
        )}
        inputMode={type === 'number' || type === 'tel' ? 'numeric' : 'text'}
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

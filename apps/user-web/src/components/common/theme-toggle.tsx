'use client';

import { Icon } from '@swifty/assets';
import { cn } from '@swifty/shared-lib';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';

export default function ThemeToggle() {
  const { setTheme, theme, systemTheme } = useTheme();

  const themeValue = theme === 'system' ? systemTheme : theme;
  const toggleSwitch = () => {
    if (themeValue === 'dark') setTheme('light');
    else setTheme('dark');
  };

  const spring = {
    type: 'spring',
    stiffness: 700,
    damping: 30,
  };

  return (
    <div
      onClick={toggleSwitch}
      className={cn(
        'flex justify-between h-[42px] w-[80px] rounded-[20px] bg-white p-[5px] shadow-inner hover:cursor-pointer relative',
      )}
    >
      <motion.div
        layout
        transition={spring}
        className={cn(
          'absolute top-0 left-0 bottom-0 my-auto w-[40px] h-[40px] rounded-full',
          themeValue === 'light'
            ? 'left-0 bg-primary'
            : 'left-[38px] bg-primary',
        )}
      />

      <Icon
        name="user-web/theme/sun"
        width={30}
        height={30}
        className={cn('relative z-10 rounded-full')}
      />

      <Icon
        name="user-web/theme/moon"
        width={30}
        height={30}
        className={cn('relative z-10 rounded-full')}
      />
    </div>
  );
}

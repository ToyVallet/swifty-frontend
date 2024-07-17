'use client';

import { cn } from '@swifty/shared-lib';
import type { Dayjs } from 'dayjs';
import 'dayjs/locale/ko';
import { motion } from 'framer-motion';

type DateBlockProps = {
  date: Dayjs;
  className?: string;
  disabled?: boolean;
  selected?: boolean;
  onClick?: () => void;
};

export default function DateBlock({
  date,
  className,
  disabled,
  selected,
  onClick,
}: DateBlockProps) {
  return (
    <motion.div
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      onClick={onClick}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      className={cn(
        'flex flex-col h-full justify-center items-center rounded-lg flex-1 relative gap-2 text-white',
        disabled &&
          'text-neutral-400 dark:text-neutral-700 pointer-events-none',
        selected && 'text-white bg-primary',
        className,
      )}
    >
      <div className="text-20 font-bold z-10">{date.date()}</div>
      <div className="text-12 font-medium z-10">
        {date.format('ddd').toUpperCase()}
      </div>
    </motion.div>
  );
}

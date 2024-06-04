'use client';

import { cn } from '@lib/utils';
import { Dayjs } from 'dayjs';
import 'dayjs/locale/ko';
import { motion } from 'framer-motion';
import { useLocale } from 'next-intl';

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
  const locale = useLocale();

  return (
    <motion.div
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      onClick={onClick}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      className={cn(
        'flex flex-col h-full justify-center items-center rounded-lg flex-1 relative gap-2',
        disabled &&
          'text-neutral-400 dark:text-neutral-700 pointer-events-none',
        selected && 'text-white bg-primary',
        className,
      )}
    >
      <div className="text-xl font-bold z-10">{date.date()}</div>
      <div className="text-xs font-medium z-10">
        {date.locale(locale).format('ddd')}
      </div>
    </motion.div>
  );
}

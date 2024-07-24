'use client';

import { useTheme } from 'next-themes';
import { Toaster } from 'sonner';

type ToastProps = React.ComponentProps<typeof Toaster>;

export default function Toast(props: ToastProps) {
  const { theme = 'system' } = useTheme();

  return (
    <Toaster
      theme={theme as ToastProps['theme']}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:ui-bg-white group-[.toaster]:ui-text-neutral-950 group-[.toaster]:ui-border-neutral-200 group-[.toaster]:ui-shadow-lg dark:group-[.toaster]:ui-bg-neutral-950 dark:group-[.toaster]:ui-text-neutral-50 dark:group-[.toaster]:ui-border-neutral-800',
          description:
            'group-[.toast]:ui-text-neutral-500 dark:group-[.toast]:ui-text-neutral-400',
          actionButton:
            'group-[.toast]:ui-bg-neutral-900 group-[.toast]:ui-text-neutral-50 dark:group-[.toast]:ui-bg-neutral-50 dark:group-[.toast]:ui-text-neutral-900',
          cancelButton:
            'group-[.toast]:ui-bg-neutral-100 group-[.toast]:ui-text-neutral-500 dark:group-[.toast]:ui-bg-neutral-800 dark:group-[.toast]:ui-text-neutral-400',
        },
      }}
      {...props}
    />
  );
}

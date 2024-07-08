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
            'group toast group-[.toaster]:bg-white group-[.toaster]:text-neutral-950 group-[.toaster]:border-neutral-200 group-[.toaster]:shadow-lg dark:group-[.toaster]:bg-neutral-950 dark:group-[.toaster]:text-neutral-50 dark:group-[.toaster]:border-neutral-800',
          description:
            'group-[.toast]:text-neutral-500 dark:group-[.toast]:text-neutral-400',
          actionButton:
            'group-[.toast]:bg-neutral-900 group-[.toast]:text-neutral-50 dark:group-[.toast]:bg-neutral-50 dark:group-[.toast]:text-neutral-900',
          cancelButton:
            'group-[.toast]:bg-neutral-100 group-[.toast]:text-neutral-500 dark:group-[.toast]:bg-neutral-800 dark:group-[.toast]:text-neutral-400',
        },
      }}
      {...props}
    />
  );
}
'use client';

import { notification } from 'antd';
import type { ArgsProps } from 'antd/lib/notification/interface';
import type { PropsWithChildren} from 'react';
import { createContext, useCallback, useMemo } from 'react';

type NotificationKey = 'success' | 'error' | 'info' | 'warning';

export const NotificationHandlerContext = createContext<
  (option: ArgsProps, type: NotificationKey) => void
>(() => {});

export default function NotificationProvider({ children }: PropsWithChildren) {
  const [api, contextHolder] = notification.useNotification();

  const handleNotification = useCallback(
    (option: ArgsProps, type: NotificationKey = 'success') => {
      api[type](option);
    },
    [api],
  );

  const memoizedContextHolder = useMemo(() => contextHolder, [contextHolder]);
  return (
    <NotificationHandlerContext.Provider value={handleNotification}>
      {children}
      {memoizedContextHolder}
    </NotificationHandlerContext.Provider>
  );
}

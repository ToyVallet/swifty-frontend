'use client';

import { handleApiError } from '@lib';
import { http, revalidate } from '@swifty/shared-lib';
import type { Status } from '@type';
import type { SegmentedProps } from 'antd';
import { ConfigProvider, Segmented } from 'antd';
import { useContext, useState } from 'react';
import { NotificationHandlerContext } from 'src/components/provider';

interface Props {
  apiTarget: 'FESTIVAL' | 'CONCERT' | 'LINEUP' | 'CERTIFICATION';
  status: Status;
  id: string;
  size?: SegmentedProps['size'];
}

const STATUS_LIST: Status[] = ['HIDDEN', 'OPEN'];

const hiddenOpenHttp = {
  FESTIVAL: {
    HIDDEN: async (id: string) =>
      http.patch(
        '/host/admin/festival/{id}/hidden',
        {},
        {
          params: { id },
          credentials: 'include',
        },
      ),
    OPEN: async (id: string) =>
      http.patch(
        '/host/admin/festival/{id}/open',
        {},
        {
          params: { id },
          credentials: 'include',
        },
      ),
  },
  CONCERT: {
    HIDDEN: async (id: string) =>
      http.patch(
        '/host/admin/concert/{id}/hidden',
        {},
        { params: { id }, credentials: 'include' },
      ),
    OPEN: async (id: string) =>
      http.patch(
        '/host/admin/concert/{id}/open',
        {},
        { params: { id }, credentials: 'include' },
      ),
  },
  LINEUP: {
    HIDDEN: async (id: string) =>
      http.patch(
        '/host/admin/lineup/{id}/hidden',
        {},
        { params: { id }, credentials: 'include' },
      ),
    OPEN: async (id: string) =>
      http.patch(
        '/host/admin/lineup/{id}/open',
        {},
        { params: { id }, credentials: 'include' },
      ),
  },
  CERTIFICATION: {
    HIDDEN: async (id: string) =>
      http.patch(
        '/host/admin/certification/{id}/hidden',
        {},
        { params: { id }, credentials: 'include' },
      ),
    OPEN: async (id: string) =>
      http.patch(
        '/host/admin/certification/{id}/open',
        {},
        { params: { id }, credentials: 'include' },
      ),
  },
};
export default function OpenHiddenToggle({
  apiTarget,
  status,
  id,
  size = 'small',
}: Props) {
  const [curStatus, setCurStatus] = useState(status);
  const handleNotification = useContext(NotificationHandlerContext);

  const onChange = async (value: Status) => {
    const prev = curStatus;

    setCurStatus(value);
    try {
      await hiddenOpenHttp[apiTarget][value](id);
      if (apiTarget === 'CERTIFICATION')
        await revalidate('university-certificatin');
      else await revalidate('detail-festival');
    } catch (err) {
      setCurStatus(prev);
      handleApiError(err, handleNotification);
    }
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Segmented: {
            itemSelectedBg: '#7c5dfa',
            itemSelectedColor: '#f8f8f8',
          },
        },
      }}
    >
      <Segmented
        title={`${apiTarget} 공개 여부 결정`}
        defaultValue={status}
        value={curStatus}
        onChange={(value) => onChange(value)}
        options={STATUS_LIST}
        size={size}
      />
    </ConfigProvider>
  );
}

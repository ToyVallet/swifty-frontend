'use client';

import { API_LINEUP, FETCH_TAG } from '@lib';
import { http, revalidate } from '@swifty/shared-lib';
import type { Status } from '@type';
import type { SegmentedProps } from 'antd';
import { ConfigProvider, Segmented } from 'antd';
import { useState } from 'react';

interface Props {
  apiTarget: 'FESTIVAL' | 'CONCERT' | 'LINEUP';
  status: Status;
  id: string;
  festivalId: string;
  size?: SegmentedProps['size'];
}

const STATUS_LIST: Status[] = ['HIDDEN', 'OPENED'];

export default function OpenHiddenToggle({
  apiTarget,
  status,
  id,
  festivalId,
  size = 'small',
}: Props) {
  const [curStatus, setCurStatus] = useState(status);

  const hiddenOpenHttp = {
    FESTIVAL: {
      HIDDEN: http.patch(
        '/host/admin/festival/{id}/hidden',
        {},
        {
          params: { id },
          credentials: 'include',
        },
      ),
      OPENED: http.patch(
        '/host/admin/festival/{id}/open',
        {},
        {
          params: { id },
          credentials: 'include',
        },
      ),
    },
    CONCERT: {
      HIDDEN: http.patch(
        '/host/admin/concert/{id}/hidden',
        {},
        { params: { id }, credentials: 'include' },
      ),
      OPENED: http.patch(
        '/host/admin/concert/{id}/open',
        {},
        { params: { id }, credentials: 'include' },
      ),
    },
    LINEUP: {
      HIDDEN: http.patch(
        '/host/admin/line_up/{id}/hidden',
        {},
        { params: { id }, credentials: 'include' },
      ),
      OPENED: http.patch(
        '/host/admin/line_up/{id}/open',
        {},
        { params: { id }, credentials: 'include' },
      ),
    },
  };

  const onChange = async (value: Status) => {
    const prev = curStatus;
    setCurStatus(value);
    try {
      await hiddenOpenHttp[apiTarget][value]; //
      //await revalidate(FETCH_TAG.festivalsDetail(festivalId));
    } catch (err) {
      setCurStatus(prev);
      console.error(err);
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

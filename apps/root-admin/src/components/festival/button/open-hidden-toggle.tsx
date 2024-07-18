'use client';

import { API_CONCERT, API_FESTIVAL, API_LINEUP, FETCH_TAG } from '@lib';
import { customFetch, revalidate } from '@swifty/shared-lib';
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

  const API_URL = {
    FESTIVAL: {
      HIDDEN: API_FESTIVAL.hidden(id),
      OPENED: API_FESTIVAL.open(id),
    },
    CONCERT: {
      HIDDEN: API_CONCERT.hidden(id),
      OPENED: API_CONCERT.open(id),
    },
    LINEUP: {
      HIDDEN: API_LINEUP.hidden(id),
      OPENED: API_LINEUP.open(id),
    },
  };

  const onChange = async (value: Status) => {
    const prev = curStatus;
    setCurStatus(value);
    try {
      await customFetch(API_URL[apiTarget][value], { method: 'PATCH' });
      await revalidate(FETCH_TAG.festivalsDetail(festivalId));
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

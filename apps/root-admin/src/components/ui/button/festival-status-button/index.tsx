'use client';

import { API_CONCERT, API_FESTIVAL, API_LINEUP, FETCH_TAG } from '@lib';
import { customFetch, revalidate } from '@swifty/shared-lib';
import type { Status } from '@type';
import type { SegmentedProps } from 'antd';
import { ConfigProvider, Segmented } from 'antd';
import { useEffect, useState } from 'react';

interface Props {
  apiTarget: 'FESTIVAL' | 'CONCERT' | 'LINEUP';
  status: Status;
  subId: string;
  festivalId: string;
  size?: SegmentedProps['size'];
}

export default function FestivalStatusButton({
  apiTarget,
  status,
  subId,
  festivalId,
  size = 'small',
}: Props) {
  console.log(status);
  const STATUS_LIST: Status[] = ['HIDDEN', 'OPENED'];
  const [curStatus, setCurStatus] = useState(status);

  const API_URL = {
    FESTIVAL: {
      HIDDEN: API_FESTIVAL.hidden(subId),
      OPENED: API_FESTIVAL.open(subId),
    },
    CONCERT: {
      HIDDEN: API_CONCERT.hidden(subId),
      OPENED: API_CONCERT.open(subId),
    },
    LINEUP: {
      HIDDEN: API_LINEUP.hidden(subId),
      OPENED: API_LINEUP.open(subId),
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

'use client';

import { ConfigProvider, Segmented } from 'antd';
import { useCallback, useEffect, useState } from 'react';

interface Props {
  source: '' | 'CLIENT' | 'SERVER';
  setSource: (string: '' | 'CLIENT' | 'SERVER') => void;
}

const SOURCE = ['ALL', 'CLIENT', 'SERVER'];

export default function LogSourceToggle({ source }: Props) {
  const [curStatus, setCurStatus] = useState<(typeof SOURCE)[number]>(() =>
    selectStatus(source),
  );

  const selectStatus = useCallback((source: '' | 'CLIENT' | 'SERVER') => {
    if (source === '') return 'ALL';
    return source;
  }, []);

  const onChange = async (value: (typeof SOURCE)[number]) => {
    setCurStatus(value);
  };

  useEffect(() => {
    setCurStatus(() => selectStatus(source));
  }, [source]);

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
        defaultValue={curStatus}
        value={curStatus}
        onChange={(value) => onChange(value)}
        options={SOURCE}
        size={'small'}
      />
    </ConfigProvider>
  );
}

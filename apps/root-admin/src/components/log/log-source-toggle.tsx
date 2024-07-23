'use client';

import { ConfigProvider, Segmented } from 'antd';
import { useCallback, useEffect, useState } from 'react';

interface Props {
  source: '' | 'CLIENT' | 'SERVER';
  setSource: (string: '' | 'CLIENT' | 'SERVER') => void;
}

const SOURCE = ['ALL', 'CLIENT', 'SERVER'] as const;

export default function LogSourceToggle({ source, setSource }: Props) {
  const selectStatus = useCallback((source: '' | 'CLIENT' | 'SERVER') => {
    if (source === '') return 'ALL';
    return source;
  }, []);

  const [curStatus, setCurStatus] = useState<(typeof SOURCE)[number]>(() =>
    selectStatus(source),
  );

  const onChange = async (value: (typeof SOURCE)[number]) => {
    setCurStatus(value);
    const changeValue = value === 'ALL' ? '' : value;
    setSource(changeValue);
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
      <Segmented<'ALL' | 'CLIENT' | 'SERVER'>
        defaultValue={curStatus}
        value={curStatus}
        onChange={(value) => onChange(value)}
        options={['ALL', 'CLIENT', 'SERVER']}
        size={'small'}
      />
    </ConfigProvider>
  );
}

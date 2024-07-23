'use client';

import { http } from '@swifty/shared-lib';
import { Button } from 'antd';
import { useState } from 'react';

export default function Download() {
  const [isLoading, setIsLoading] = useState(false);
  const onLoading = () => {
    setIsLoading(true);
  };
  const offLoading = () => {
    setIsLoading(false);
  };

  const onClick = async () => {
    try {
      onLoading();
      const data = await http.get<Blob>('/log/export');

      const url = window.URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'log-data.xlsx'); // 파일명 설정
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error(err);
    } finally {
      offLoading();
    }
  };

  return (
    <Button onClick={onClick} loading={isLoading}>
      다운로드
    </Button>
  );
}

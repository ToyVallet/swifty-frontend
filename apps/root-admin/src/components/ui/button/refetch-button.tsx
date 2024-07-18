'use client';

import { RedoOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useRouter } from 'next/navigation';

export default function RefetchButton() {
  const router = useRouter();
  return (
    <Button
      onClick={() => {
        router.refresh();
      }}
    >
      <RedoOutlined />
    </Button>
  );
}

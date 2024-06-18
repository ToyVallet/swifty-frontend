'use client';

import { Button, Popconfirm } from 'antd';
import type { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  title: string;
  description: string;
  onConfirm: () => void | Promise<void>;
  size?: 'small' | 'large';
}

export default function DeleteButton({
  title,
  description,
  onConfirm,
  children,
  size = 'small',
}: Props) {
  return (
    <Popconfirm
      title={title}
      description={description}
      okText="확인"
      okType="danger"
      cancelText="취소"
      onConfirm={onConfirm}
    >
      <Button type="primary" danger size={size}>
        {children}
      </Button>
    </Popconfirm>
  );
}
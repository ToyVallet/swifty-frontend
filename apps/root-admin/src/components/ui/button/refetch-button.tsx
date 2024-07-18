'use client';

import { RedoOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useRouter } from 'next/navigation';
import { type ComponentPropsWithoutRef, type Ref, forwardRef } from 'react';

const RefetchButton = forwardRef(function RefetchButton(
  props: ComponentPropsWithoutRef<typeof Button>,
  ref: Ref<HTMLButtonElement>,
) {
  const { onClick, ...rest } = props;
  const router = useRouter();
  return (
    <Button
      ref={ref}
      icon={<RedoOutlined />}
      onClick={(e) => {
        router.refresh();
        onClick?.(e);
      }}
      {...rest}
    />
  );
});

export default RefetchButton;

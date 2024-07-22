'use client';

import { NotificationHandlerContext } from '@components';
import { Button, type ButtonProps, Popconfirm } from 'antd';
import {
  type PropsWithChildren,
  type Ref,
  forwardRef,
  useContext,
} from 'react';

export interface Props extends PropsWithChildren {
  title: string;
  description: string;
  onConfirm: () => void | Promise<void>;
  size?: ButtonProps['size'];
}

const DeleteButton = forwardRef(function DeleteButton(
  { title, description, onConfirm, children, size = 'small' }: Props,
  ref: Ref<HTMLButtonElement>,
) {
  const handleNotification = useContext(NotificationHandlerContext);
  const onDelete = async () => {
    try {
      await onConfirm();
    } catch (err) {
      handleNotification(
        {
          message: '삭제에 실패했습니다.',
          description: (err as Error).message,
        },
        'error',
      );
    }
  };

  return (
    <Popconfirm
      title={title}
      description={description}
      okText="확인"
      okType="danger"
      cancelText="취소"
      onConfirm={onDelete}
    >
      <Button type="primary" ref={ref} danger size={size}>
        {children}
      </Button>
    </Popconfirm>
  );
});

export default DeleteButton;

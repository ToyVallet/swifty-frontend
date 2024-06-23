'use client';

import type { DrawerProps } from 'antd';
import { Button, Drawer, Form, Space } from 'antd';
import clsx from 'clsx';
import React, { useState } from 'react';

import styles from './drawer-button.module.css';

const variantButtons = {
  'concert-create': '콘서트 추가',
  'concert-update': '콘서트 수정',
  'lineup-create': '라인업 추가',
  'lineup-update': '라인업 수정',
  'university-create': '대학교 추가',
  'university-logo-update': '대학 로고 수정',
  'university-update': '대학 수정',
  'host-create': '호스트 생성',
  'festival-create': '대학 축제 생성',
  'festival-update': '대학 축제 수정',
} as const;

interface DrawerButtonProps extends DrawerProps {
  variant: keyof typeof variantButtons;
  children: JSX.Element;
}

export default function DrawerButton({
  className,
  variant,
  children,
}: DrawerButtonProps) {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);

  const showDrawer = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onSubmit = () => {
    form.submit();
  };

  return (
    <>
      <Button
        className={clsx(
          { [styles.createButton!]: variant.includes('create') },
          className,
        )}
        type={variant.includes('create') ? 'primary' : 'default'}
        style={
          variant.includes('create')
            ? {
                height: '3rem',
                borderRadius: '1.5rem',
                fontSize: '14px',
                fontWeight: '700',
              }
            : {}
        }
        onClick={showDrawer}
      >
        {variantButtons[variant]}
      </Button>
      <Drawer
        title={variantButtons[variant]}
        width={720}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={onSubmit} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        {React.cloneElement(children, { onClose, form })}
      </Drawer>
    </>
  );
}

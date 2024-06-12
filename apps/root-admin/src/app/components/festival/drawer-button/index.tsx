"use client";

import React, { useState } from 'react';
import { Button, Drawer, Space } from 'antd';
import type { DrawerProps } from 'antd';
import clsx from 'clsx';

import styles from './drawer-button.module.css';

const variantButtons = {
  'concert-create': '콘서트 추가',
  'concert-update': '콘서트 수정',
  'lineup-create': '라인업 추가',
  'lineup-update': '라인업 수정',
} as const;

interface DrawerButtonProps extends DrawerProps {
  variant: keyof typeof variantButtons;
  isLock?: boolean;
  lock?: () => void;
  children: React.ReactNode;
}

export default function DrawerButton({
  className,
  variant,
  isLock = false,
  lock,
  children,
  ...drawerProps
}: DrawerButtonProps) {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
    if (lock)
      lock();
  };

  return (
    <>
      <Button
        className={clsx({ [styles.createButton as string]: variant.includes('create') }, className)}
        type={variant.includes('create') ? 'primary' : 'default'}
        style={variant.includes('create') ? { height: '3rem', borderRadius: '1.5rem', fontSize: '14px', fontWeight: '700' } : {}}
        onClick={showDrawer}
      >
        {variant.includes('update') ? '수정' : variantButtons[variant]}
      </Button>
      <Drawer
        title={variantButtons[variant]}
        width={720}
        onClose={onClose}
        open={open}
        {...drawerProps}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button
              type="primary"
              htmlType="submit"
              form={variant}
              disabled={isLock}
            >
              Submit
            </Button>
          </Space>
        }
      >
        {children}
      </Drawer>
    </>
  );
}


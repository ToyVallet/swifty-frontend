"use client";

import React, { useState } from 'react';
import { Button, Drawer, Space } from 'antd';
import type { DrawerProps } from 'antd';
import clsx from 'clsx';

import styles from './drawer-button.module.css';

const variantButtons = {
  'concert-create': '콘서트 추가',
  'concert-update': '수정',
  'lineup-create': '라인업 추가',
  'lineup-update': '수정',
} as const;

interface DrawerButtonProps extends DrawerProps {
  variant: keyof typeof variantButtons;
  children: React.ReactNode;
}

export default function DrawerButton({
  className,
  variant,
  children,
  ...drawerProps
}: DrawerButtonProps) {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        className={clsx({ [styles.createButton as string]: variant.includes('create') }, className)}
        type={variant.includes('create') ? 'primary' : 'default'}
        style={variant.includes('create') ? { height: '3rem', borderRadius: '1.5rem', fontSize: '14px', fontWeight: '700' } : {}}
        onClick={showDrawer}
      >
        {variantButtons[variant]}
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


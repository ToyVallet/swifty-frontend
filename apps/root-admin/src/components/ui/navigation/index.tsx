'use client';

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Logo, LogoutButton } from '@components';
import { Button, Layout, Menu } from 'antd';
import Link from 'next/link';
import React, { type PropsWithChildren, useState } from 'react';

import styles from './navigation.module.css';

const { Header, Sider, Content } = Layout;

type GetItem = (
  label: React.ReactNode,
  key: string,
  icon?: React.ReactNode,
  children?: any,
) => {
  label: React.ReactNode;
  key: string;
  icon?: React.ReactNode;
  children?: ReturnType<GetItem>[];
};

const getItem: GetItem = (
  label: React.ReactNode,
  key: string,
  icon?: React.ReactNode,
  children?: ReturnType<GetItem>[],
) => {
  return {
    key,
    icon,
    children,
    label,
  };
};

const items = [
  getItem('사용자 관리', '1', <UserOutlined />, [
    getItem(<Link href="/user">사용자 목록</Link>, '11'),
    getItem(<Link href="/university">학교 목록</Link>, '12'),
  ]),
  getItem(<Link href="/festivals">축제 관리</Link>, '2', <UploadOutlined />),
];

export default function Navigation({ children }: PropsWithChildren) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout className={styles.navigation}>
      <Sider
        className={styles.sider}
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <Logo variant={collapsed ? 'small' : 'default'} />
        <div className="demo-logo-vertical" />
        <Menu mode="inline" defaultSelectedKeys={['1']} items={items} />
      </Sider>
      <Layout>
        <Header className={styles.header} style={{ background: '#e8f0ff' }}>
          <Button
            // block
            type="default"
            size="large"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? '펼치기' : '접기'}
          </Button>
          <LogoutButton />
        </Header>
        <Content className={styles.content}>{children}</Content>
      </Layout>
    </Layout>
  );
}

'use client';

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Logo } from '@components/ui';
import { Button, Layout, Menu, theme } from 'antd';
import Link from 'next/link';
import React, { type PropsWithChildren, useState } from 'react';

import styles from './navigation.module.css';

const { Header, Sider, Content } = Layout;

export default function Navigation({ children }: PropsWithChildren) {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

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
        <Menu
          style={{
            borderInlineEnd: 'none',
          }}
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: '사용자 관리',
              children: [
                { key: '11', label: <Link href="/user">사용자 목록</Link> },
                { key: '12', label: <Link href="/user">학교 목록</Link> },
              ],
            },
            {
              key: '2',
              icon: <UploadOutlined />,
              label: <Link href="/festivals">축제 관리</Link>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header className={styles.header} style={{ background: '#F8F8F8' }}>
          <Button
            type="primary"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
          />
        </Header>
        <Content className={styles.content}>{children}</Content>
      </Layout>
    </Layout>
  );
}

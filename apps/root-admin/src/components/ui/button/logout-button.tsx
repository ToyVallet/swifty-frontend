'use client';

import { LogoutOutlined } from '@ant-design/icons';
import { customFetch } from '@swifty/shared-lib';
import { Button } from 'antd';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();
  const logout = async () => {
    try {
      await customFetch('/user/logout');
      router.replace('/login');
    } catch {
      console.error('로그아웃 중 오류가 발생했습니다.');
    }
  };
  return (
    <Button size="large" icon={<LogoutOutlined />} onClick={logout}>
      로그아웃
    </Button>
  );
}

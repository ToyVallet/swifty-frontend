'use client';

import { LogoutOutlined } from '@ant-design/icons';
import { logout } from '@swifty/shared-lib';
import { Button } from 'antd';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const { push } = useRouter();

  return (
    <Button
      size="large"
      icon={<LogoutOutlined />}
      onClick={() => logout().then(() => push('/login'))}
    >
      로그아웃
    </Button>
  );
}

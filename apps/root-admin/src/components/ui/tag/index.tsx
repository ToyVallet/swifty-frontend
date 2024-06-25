'use client';

import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  ManOutlined,
  MinusCircleOutlined,
  WomanOutlined,
} from '@ant-design/icons';
import type { UserEnrolled, UserGender, UserStatus } from '@type';
import { Tag } from 'antd';

interface GenderProps {
  gender: UserGender;
}

export function GenderTag({ gender }: GenderProps) {
  const Icon = gender.includes('FEMALE') ? WomanOutlined : ManOutlined;
  const color = gender.includes('FEMALE') ? 'red' : 'blue';
  return (
    <Tag icon={<Icon />} color={color}>
      {gender}
    </Tag>
  );
}

interface RoleProps {
  value: string;
}
export function DefaultTag({ value }: RoleProps) {
  return <Tag>{value}</Tag>;
}

interface LoginProps {
  type: UserEnrolled;
}
export function LoginTag({ type }: LoginProps) {
  const color = type === 'KAKAO' ? '#F7E600' : '#1574ef';
  return <Tag color={color}>{type}</Tag>;
}

interface StatusProps {
  status: UserStatus;
}
export function StatusTag({ status }: StatusProps) {
  const color: Record<UserStatus, string> = {
    BANNED: 'error',
    ACTIVE: 'processing',
    WITHDRAWAL: 'default',
    PAUSED: 'warning',
  };

  const icon: Record<UserStatus, JSX.Element> = {
    BANNED: <CloseCircleOutlined />,
    ACTIVE: <CheckCircleOutlined />,
    WITHDRAWAL: <ClockCircleOutlined />,
    PAUSED: <MinusCircleOutlined />,
  };
  return (
    <Tag color={color[status]} icon={icon[status]}>
      {status}
    </Tag>
  );
}

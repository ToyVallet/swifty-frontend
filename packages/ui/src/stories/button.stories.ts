import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import Button from '../button';

const meta = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    onClick: fn(),
    size: 'default',
    variant: 'default',
    isLoading: false,
    asChild: false,
    disabled: false,
  },
  argTypes: {
    onClick: {
      action: 'clicked',
      type: 'function',
      description: '버튼 클릭 이벤트입니다.',
    },
    size: {
      control: {
        type: 'select',
      },
      options: ['default', 'sm', 'lg', 'full'],
      description: '버튼의 크기를 설정합니다.',
    },
    variant: {
      control: {
        type: 'select',
      },
      options: ['default', 'white', 'destructive'],
      description: '버튼의 스타일을 설정합니다.',
    },
    isLoading: {
      type: 'boolean',
      description: '로딩 상태를 설정합니다.',
    },
    disabled: {
      type: 'boolean',
      description: '버튼을 비활성화합니다.',
    },
    children: {
      type: 'string',
      description: '버튼 내용입니다.',
    },
    asChild: {
      type: 'boolean',
      description: '버튼을 자식 요소로 사용합니다.',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'default',
    children: '기본 버튼',
  },
};

export const Outlined: Story = {
  args: {
    variant: 'white',
    children: '흰색 버튼',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: '디스트럭티브 버튼',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: '비활성화 버튼',
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
    variant: 'default',
    children: '로딩 버튼',
    size: 'full',
  },
};

export const Full: Story = {
  args: {
    size: 'full',
    children: '전체 너비 버튼',
  },
};

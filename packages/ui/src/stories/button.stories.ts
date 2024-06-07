import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import Button from '../button';

const meta = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],

  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'default',
    label: '기본 버튼',
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    label: '아웃라인 버튼',
  },
};

export const Bottom: Story = {
  args: {
    variant: 'bottom',
    label: '버튼 2',
  },
};

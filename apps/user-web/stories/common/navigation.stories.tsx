import { Navigation } from '@/app/components/common';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Navigation> = {
  title: 'COMMON/Navigation',
  component: Navigation,
  argTypes: {
    title: { control: 'text' },
    variant: { control: 'radio', options: ['main', 'back', 'back-with-logo'] },
  },
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Navigation>;

export const Default: Story = {
  args: { variant: 'main' },
};

export const Back_Button: Story = {
  args: { variant: 'back-with-logo' },
};

export const Back_Button_Not_Logo: Story = {
  args: { variant: 'back', title: '검색' },
};

import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@swifty/ui';

const meta = {
  title: 'Example/Button',
  component: Button,
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'I am a primary button.',
    variant: 'default',
    disabled: false,
    type: 'button',
    isLoading: false,
  },
};

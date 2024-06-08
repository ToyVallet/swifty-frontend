import { SideNav } from '@components/common';
import type { Meta, StoryObj } from '@storybook/react';
import { createMock } from 'storybook-addon-module-mock';

const meta: Meta<typeof SideNav> = {
  title: 'COMMON/SideNav',
  component: SideNav,
  argTypes: {},
  parameters: {},
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SideNav>;

export const Default: Story = {
  args: {},
  parameters: {},
};

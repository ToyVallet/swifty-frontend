import RootNavLayout from '@app/layout';
import Home from '@app/page';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Home> = {
  title: 'PAGE/Main',
  component: Home,
  argTypes: {},
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Home>;

export const Default: Story = {
  args: {},
  parameters: {},
  render: () => {
    return (
      <RootNavLayout>
        <Home />
      </RootNavLayout>
    );
  },
};

import Page from '@app/(root)/festivals/page';
import RootNavLayout from '@app/layout';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Page> = {
  title: 'PAGE/festivals',
  component: Page,
  argTypes: {},
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Page>;

export const Default: Story = {
  args: {},
  parameters: {},
  render: () => {
    return (
      <RootNavLayout>
        <Page />
      </RootNavLayout>
    );
  },
};

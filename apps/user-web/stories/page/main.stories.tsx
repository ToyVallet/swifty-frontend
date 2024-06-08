import * as FestivalAPI from '@app/(root-nav)/action';
import RootNavLayout from '@app/(root-nav)/layout';
import Home from '@app/(root-nav)/page';
import LocaleLayout from '@app/layout';
import { festivalLinupes } from '@lib/mock/data';
import type { Meta, StoryObj } from '@storybook/react';
import { createMock } from 'storybook-addon-module-mock';

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

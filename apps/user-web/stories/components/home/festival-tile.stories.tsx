import { FestivalTiles } from '@components/home';
import { festivalLinupes } from '@lib/mock/data';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof FestivalTiles> = {
  title: 'COMPONENTS/HOME/FestivalTiles',
  component: FestivalTiles,
  argTypes: {},
  parameters: {},
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FestivalTiles>;

export const Default: Story = {
  args: {
    festivals: festivalLinupes,
  },
  parameters: {},
};

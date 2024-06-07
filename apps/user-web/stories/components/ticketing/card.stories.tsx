import * as api from '@app/api';
import { Card } from '@components/ticketing';
import type { Meta, StoryObj } from '@storybook/react';
import { createMock } from 'storybook-addon-module-mock';

const meta: Meta<typeof Card> = {
  title: 'COMPONENTS/TICKETING/Card',
  argTypes: {
    from: { control: 'date' },
    to: { control: 'date' },
  },
  component: Card,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    from: '2023-05-19',
    to: '2023-05-20',
    name: 'Ticket Test',
  },
  parameters: {},
};

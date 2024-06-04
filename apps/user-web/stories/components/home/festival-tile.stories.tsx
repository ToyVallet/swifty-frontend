import { FestivalTiles } from '@/app/components/home';
import { festivalLinupes } from '@/app/lib/mock/data';
import type { Meta, StoryObj } from '@storybook/react';
import * as NextIntlServer from 'next-intl/server';
import { createMock } from 'storybook-addon-module-mock';

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
  parameters: {
    moduleMock: {
      mock: () => {
        const getTranslationsMock = createMock(
          NextIntlServer,
          'getTranslations',
        );
        getTranslationsMock.mockReturnValue(
          Promise.resolve<any>((link: string) => link),
        );
        return [getTranslationsMock];
      },
    },
  },
};

import { MenuTiles } from '@components/common';
import type { Meta, StoryObj } from '@storybook/react';
import { BsBellFill } from 'react-icons/bs';
import { TiStarFullOutline } from 'react-icons/ti';

const meta: Meta<typeof MenuTiles> = {
  title: 'COMPONENTS/HOME/MenuTiles',
  component: MenuTiles,
  argTypes: {},
  parameters: {},
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MenuTiles>;

export const Default: Story = {
  args: {
    tiles: [
      {
        id: 1,
        subtitle: 'info',
        title: (
          <div className="font-bold leading-6">
            축제 정보
            <br />
            인스타그램
          </div>
        ),
        link: '/events',
        icon: <TiStarFullOutline size={17} />,
        bgColor: 'bg-primary text-white border-none',
      },
      {
        id: 2,
        subtitle: 'Line-up',
        title: <div className="font-bold leading-6">라인업</div>,
        link: '/notice',
        icon: <BsBellFill size={17} />,
        bgColor: 'bg-white text-black',
      },
    ],
  },
};

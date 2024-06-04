import { festivalLinupes } from '@/app/lib/mock/data';
import { Carousel, HeroTile } from '@components/common';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Carousel> = {
  title: 'COMMON/Carousel',
  component: Carousel,
  argTypes: {
    hasIndicator: { control: 'boolean' },
  },
  decorators: (Story) => (
    <div
      style={{
        height: '80dvh',
        width: '50dvw',
      }}
    >
      <Story />
    </div>
  ),
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Carousel>;

export const Default: Story = {
  args: {
    children: festivalLinupes.map((fetsival) => (
      <HeroTile key={fetsival.name} {...fetsival} />
    )),
  },
  render: (args) => {
    return (
      <div className="w-80 h-80">
        <Carousel {...args}>
          {festivalLinupes.map((fetsival) => (
            <HeroTile key={fetsival.name} {...fetsival} />
          ))}
        </Carousel>
      </div>
    );
  },
};

export const Indicator: Story = {
  args: {
    children: festivalLinupes.map((fetsival) => (
      <HeroTile key={fetsival.name} {...fetsival} />
    )),
    hasIndicator: true,
  },
  render: (args) => {
    return (
      <div className="w-80 h-80">
        <Carousel {...args}>
          {festivalLinupes.map((fetsival) => (
            <HeroTile key={fetsival.name} {...fetsival} />
          ))}
        </Carousel>
      </div>
    );
  },
};

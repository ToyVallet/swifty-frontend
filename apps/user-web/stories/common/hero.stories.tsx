import HeroTile from '@/app/components/common/hero/hero-tile';
import { festivalLinupes } from '@/app/lib/mock/data';
import { Carousel, Hero } from '@components/common';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Hero> = {
  title: 'COMMON/Hero',
  argTypes: { variant: { control: 'radio', options: ['carousel', 'image'] } },
  component: Hero,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Hero>;

export const Default: Story = {
  args: {},
  render: () => {
    return (
      <Hero>
        <div>test</div>
      </Hero>
    );
  },
};

export const Hero_Tile: Story = {
  args: {
    variant: 'image',
  },
  render: (args) => {
    return (
      <Hero {...args}>
        <HeroTile {...festivalLinupes[0]} />
      </Hero>
    );
  },
};

export const Hero_Carousel: Story = {
  args: {
    variant: 'carousel',
  },
  render: (args) => {
    return (
      <Hero {...args}>
        <Carousel hasIndicator>
          {festivalLinupes.map((fetsival) => (
            <HeroTile key={fetsival.name} {...fetsival} />
          ))}
        </Carousel>
      </Hero>
    );
  },
};

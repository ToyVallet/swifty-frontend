import ImageWithFallback from '@/app/components/common/image-with-fallback';
import type { Meta, StoryObj } from '@storybook/react';
import FallbackHero from '@images/fallback-hero.png';
import FallbackFestival from '@images/fallback-festival.png';

export default {
  title: 'COMMON/ImageWithFallback',
  component: ImageWithFallback,
  decorators: [
    (Story) => (
      <div className="relative aspect-[3/4]">
        <Story />
      </div>
    ),
  ],
} as Meta<typeof ImageWithFallback>;

type Template = StoryObj<typeof ImageWithFallback>;

export const Default: Template = {
  args: {
    src: 'data:image/png;base64,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',
    alt: 'hero image',
    className: "object-cover",
    sizes: "auto",
    fill: true,
    fallback: FallbackHero
  },
};

export const FallbackInFestivalTiles: Template = {
  args: {
    src: '',
    fill: true,
    fallback: FallbackHero
  },
};

export const FallbackInHeroTiles: Template = {
  args: {
    src: '',
    fill: true,
    fallback: FallbackFestival
  },
};

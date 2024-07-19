import {
  type ComponentType,
  type LazyExoticComponent,
  type SVGProps,
} from 'react';

import { type CommonIconsMap, commonIcons } from './common';
import { type UserWebIconsMap, userWebIcons } from './user-web';

export type ImportedIconComponent = LazyExoticComponent<
  ComponentType<SVGProps<SVGSVGElement>>
>;

interface IconSVGMap extends CommonIconsMap, UserWebIconsMap {}

export const icons: IconSVGMap = {
  ...commonIcons,
  ...userWebIcons,
} as const;

export type IconNames = keyof typeof icons;

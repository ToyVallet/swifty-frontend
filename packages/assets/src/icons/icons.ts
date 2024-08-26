import {
  type ComponentType,
  type LazyExoticComponent,
  type SVGProps,
} from 'react';

import { type CommonIconsMap, commonIcons } from './common';
import { type HostIconMap, hostIconMap } from './host-admin';
import { type UserWebIconsMap, userWebIcons } from './user-web';
import { type UsingTicketIconsMap, usingTicketIconsMap } from './using-ticket';

export type ImportedIconComponent = LazyExoticComponent<
  ComponentType<SVGProps<SVGSVGElement>>
>;

interface IconSVGMap
  extends CommonIconsMap,
    UserWebIconsMap,
    UsingTicketIconsMap,
    HostIconMap {}

export const icons: IconSVGMap = {
  ...commonIcons,
  ...userWebIcons,
  ...usingTicketIconsMap,
  ...hostIconMap,
} as const;

export type IconNames = keyof typeof icons;

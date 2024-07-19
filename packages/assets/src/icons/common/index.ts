import { lazy } from 'react';

import { type ImportedIconComponent } from '../icons';

export interface CommonIconsMap {
  'swifty-full-logo': ImportedIconComponent;
  ticket: ImportedIconComponent;
  search: ImportedIconComponent;
  'chevron-right': ImportedIconComponent;
  'arrow-left': ImportedIconComponent;
  bell: ImportedIconComponent;
  home: ImportedIconComponent;
  category: ImportedIconComponent;
  lock: ImportedIconComponent;
  user: ImportedIconComponent;
  'check-circle': ImportedIconComponent;
}

export const commonIcons: CommonIconsMap = {
  'swifty-full-logo': lazy(() => import('./swifty-full-logo.svg')),
  ticket: lazy(() => import('./ticket.svg')),
  search: lazy(() => import('./search.svg')),
  'chevron-right': lazy(() => import('./chevron-right.svg')),
  'arrow-left': lazy(() => import('./arrow-left.svg')),
  bell: lazy(() => import('./bell.svg')),
  category: lazy(() => import('./category.svg')),
  home: lazy(() => import('./home.svg')),
  lock: lazy(() => import('./lock.svg')),
  user: lazy(() => import('./user.svg')),
  'check-circle': lazy(() => import('./check-circle.svg')),
} as const;

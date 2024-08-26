import { lazy } from 'react';

import { type ImportedIconComponent } from '../icons';

export interface HostIconMap {
  'host-admin/swifty-logo': ImportedIconComponent;
  'host-admin/swifty-logo-small': ImportedIconComponent;
  'host-admin/home': ImportedIconComponent;
  'host-admin/profile': ImportedIconComponent;
  'host-admin/document': ImportedIconComponent;
}

export const hostIconMap: HostIconMap = {
  'host-admin/swifty-logo': lazy(() => import('./swifty-logo.svg')),
  'host-admin/swifty-logo-small': lazy(() => import('./swifty-logo-small.svg')),
  'host-admin/home': lazy(() => import('./home.svg')),
  'host-admin/profile': lazy(() => import('./profile.svg')),
  'host-admin/document': lazy(() => import('./document.svg')),
} as const;

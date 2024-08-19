import { lazy } from 'react';

import { type ImportedIconComponent } from '../icons';

export interface UsingTicketIconsMap {
  'using-ticket/swifty-samll-logo': ImportedIconComponent;
  'using-ticket/back': ImportedIconComponent;
}

export const usingTicketIconsMap: UsingTicketIconsMap = {
  'using-ticket/swifty-samll-logo': lazy(
    () => import('./swifty-small-logo.svg'),
  ),
  'using-ticket/back': lazy(() => import('./back.svg')),
} as const;

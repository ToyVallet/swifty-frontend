import { lazy } from 'react';

import { type ImportedIconComponent } from '../icons';

export interface UsingTicketIconsMap {
  'using-ticket/swifty-samll-logo': ImportedIconComponent;
}

export const usingTicketIconsMap: UsingTicketIconsMap = {
  'using-ticket/swifty-samll-logo': lazy(
    () => import('./swifty-small-logo.svg'),
  ),
} as const;

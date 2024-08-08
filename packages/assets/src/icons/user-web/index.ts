import { lazy } from 'react';

import { ImportedIconComponent } from '../icons';

export interface UserWebIconsMap {
  'user-web/mypage/shield': ImportedIconComponent;
  'user-web/mypage/runner': ImportedIconComponent;
  'user-web/mypage/face-id': ImportedIconComponent;
  'user-web/mypage/profile': ImportedIconComponent;
  'user-web/404/caution': ImportedIconComponent;
  'user-web/500/face': ImportedIconComponent;
  'user-web/verification/varification-done': ImportedIconComponent;
  'user-web/verification/varification-request': ImportedIconComponent;
  'user-web/verification/varification': ImportedIconComponent;
  'user-web/ticketing/calender': ImportedIconComponent;
  'user-web/ticketing/time': ImportedIconComponent;
  'user-web/ticket-list/calender': ImportedIconComponent;
}

export const userWebIcons: UserWebIconsMap = {
  'user-web/mypage/shield': lazy(() => import('./mypage/shield.svg')),
  'user-web/mypage/profile': lazy(() => import('./mypage/profile.svg')),
  'user-web/mypage/runner': lazy(() => import('./mypage/runner.svg')),
  'user-web/mypage/face-id': lazy(() => import('./mypage/face-id.svg')),
  'user-web/404/caution': lazy(() => import('./404/caution.svg')),
  'user-web/500/face': lazy(() => import('./500/face.svg')),
  'user-web/verification/varification-done': lazy(
    () => import('./verification/verification-done.svg'),
  ),
  'user-web/verification/varification-request': lazy(
    () => import('./verification/verification-request.svg'),
  ),
  'user-web/verification/varification': lazy(
    () => import('./verification/verification.svg'),
  ),
  'user-web/ticketing/calender': lazy(() => import('./ticketing/calender.svg')),
  'user-web/ticketing/time': lazy(() => import('./ticketing/time.svg')),
  'user-web/ticket-list/calender': lazy(
    () => import('./ticket-list/calender.svg'),
  ),
} as const;

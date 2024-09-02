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
  'user-web/facepass/browser': ImportedIconComponent;
  'user-web/facepass/light': ImportedIconComponent;
  'user-web/facepass/logo': ImportedIconComponent;
  'user-web/facepass/mask': ImportedIconComponent;
  'user-web/facepass/phone': ImportedIconComponent;
  'user-web/facepass/title': ImportedIconComponent;
  'user-web/theme/sun': ImportedIconComponent;
  'user-web/theme/moon': ImportedIconComponent;
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
  'user-web/facepass/browser': lazy(() => import('./facepass/browser.svg')),
  'user-web/facepass/light': lazy(() => import('./facepass/light.svg')),
  'user-web/facepass/logo': lazy(() => import('./facepass/logo.svg')),
  'user-web/facepass/mask': lazy(() => import('./facepass/mask.svg')),
  'user-web/facepass/phone': lazy(() => import('./facepass/phone.svg')),
  'user-web/facepass/title': lazy(() => import('./facepass/title.svg')),
  'user-web/theme/sun': lazy(() => import('./theme/sun.svg')),
  'user-web/theme/moon': lazy(() => import('./theme/moon.svg')),
} as const;

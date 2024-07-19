import {
  type ComponentType,
  type LazyExoticComponent,
  type SVGProps,
  lazy,
} from 'react';

type ImportedIconComponent = LazyExoticComponent<
  ComponentType<SVGProps<SVGSVGElement>>
>;

/**
 * 아이콘 맵입니다
 */
interface IconSVGMap {
  // common
  'swifty-full-logo': ImportedIconComponent;
  ticket: ImportedIconComponent;
  search: ImportedIconComponent;
  // gnb요소
  home: ImportedIconComponent;
  category: ImportedIconComponent;
  lock: ImportedIconComponent;
  user: ImportedIconComponent;
}

export const icons: IconSVGMap = {
  'swifty-full-logo': lazy(() => import('./common/swifty-full-logo.svg')),
  ticket: lazy(() => import('./common/ticket.svg')),
  search: lazy(() => import('./common/search.svg')),
  category: lazy(() => import('./common/category.svg')),
  home: lazy(() => import('./common/home.svg')),
  lock: lazy(() => import('./common/lock.svg')),
  user: lazy(() => import('./common/user.svg')),
} as const;

export type IconNames = keyof typeof icons;

import { transition } from '@swifty/ui';

export const variants = {
  hidden: { y: -10, height: 0, scaleY: 0.9 },
  visible: { y: 0, height: 'auto', scaleY: 1 },
  transition,
};

import { transition } from '../lib';

export const variants = {
  input: {
    initial: {
      scale: 1,
      filter: 'brightness(1)',
    },
    active: {
      scale: 0.99,
      filter: 'brightness(0.9)',
    },
    transition,
  },
};

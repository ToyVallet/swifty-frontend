import type { ERROR_TEXT } from '@util';

export type FacePassImage = { src: string; name: string };

export type ErrorMessage = (typeof ERROR_TEXT)[number];

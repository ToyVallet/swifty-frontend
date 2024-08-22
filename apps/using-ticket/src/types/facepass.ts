import type { ERROR_TEXT, MESSAGE } from '@util';

export type FacePassImage = { src: string; name: string };

export type ErrorMessage = (typeof ERROR_TEXT)[number];

export type Message = (typeof MESSAGE)[number];

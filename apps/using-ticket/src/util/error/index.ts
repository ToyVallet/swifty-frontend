'use client';

import { sendErrorLog } from '@swifty/shared-lib';

export default function sendModelError(error: unknown) {
  if (error instanceof Error) sendErrorLog(error);
}

'use client';

import { type ReturnTypeContext } from '@components';
import { APIError } from '@swifty/shared-lib';

export default function handleApiError(
  err: unknown,
  handleNotification: ReturnTypeContext,
) {
  if (APIError.isAPIError(err)) {
    handleNotification(
      {
        message: err.message[0],
        description: (err as Error).message,
      },
      'error',
    );
  } else {
    handleNotification(
      {
        message: '예상치 못한 에러가 발생했습니다.',
        description: (err as Error).message,
      },
      'error',
    );
  }
}

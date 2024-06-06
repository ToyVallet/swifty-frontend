import { checkStatusForRefreshToken } from '@/app/api/check-status-for-RefreshToken';
import { getCookieValue } from '@/app/lib/cookies';
import { COOKIE_KEYS, SERVER_URL } from '@constant';

export interface ErrorResponse {
  message: string;
  statusCode: number;
  timestamp: string;
  trackingId: string;
}

const isErrorResponse = (data: unknown): data is ErrorResponse =>
  typeof data === 'object' && data !== null && 'trackingId' in data;

const isServer = () => typeof window === 'undefined';

export async function customFetch<T>(
  url: string,
  option?: RequestInit,
): Promise<T> {
  if (isServer()) {
    const access = await getCookieValue(COOKIE_KEYS.accessToken);
    const refresh = await getCookieValue(COOKIE_KEYS.refreshToken);
    option = {
      headers: {
        Cookie: `${COOKIE_KEYS.accessToken}=${access}; ${COOKIE_KEYS.refreshToken}=${refresh};`,
      },
      ...option,
    };
  }

  try {
    const response = await fetch(`${SERVER_URL}${url}`, {
      headers: {
        'Content-type': 'application/json',
      },
      credentials: 'include',
      ...option,
    });
    await checkStatusForRefreshToken(response.status);
    if (!response.ok) {
      const error: ErrorResponse = await response.json();
      throw error;
    }
    const data: T = await response.json();
    return data;
  } catch (e) {
    if (isErrorResponse(e) || e instanceof Error) {
      throw new Error(e.message);
    }
    throw new Error('예상치 못한 오류가 발생했습니다.');
  }
}

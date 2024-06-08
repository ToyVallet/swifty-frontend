import { getCookieValue } from '@app/lib/cookies';
import { COOKIE_KEYS, isServer } from '@swifty/shared-lib';

export default async function insertCookieInRequest(option: RequestInit) {
  if (isServer()) {
    const access = await getCookieValue(COOKIE_KEYS.accessToken);
    const refresh = await getCookieValue(COOKIE_KEYS.refreshToken);
    return {
      headers: {
        Cookie: `${COOKIE_KEYS.accessToken}=${access}; ${COOKIE_KEYS.refreshToken}=${refresh};`,
      },
      ...option,
    };
  }
  return option;
}

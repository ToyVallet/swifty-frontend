'use server';

import { removeAllCookies } from './cookie';

/**
 * 모든 쿠키를 삭제하고 로그아웃합니다.
 * @returns Promise<void>
 */
const logout = async () => {
  await removeAllCookies();
};

export default logout;

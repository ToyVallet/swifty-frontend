/**
 * @description 서버 URL
 */
export const SERVER_URL: string = 'http://localhost:8080';

/**
 * @description 서버 URL
 */
export const SERVER_EXTERNAL_URL: string = 'https://swifty.kr/api';

/**
 * @description 쿠키 키값
 */
export const COOKIE_KEYS = {
  accessToken: 'swifty-access',
  refreshToken: 'swifty-refresh',
} as const;

export * from './enums';

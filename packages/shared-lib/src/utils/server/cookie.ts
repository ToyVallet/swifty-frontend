'use server';

import { cookies } from 'next/headers';

import { COOKIE_KEYS } from '../../constants';

type CookieKeys = keyof typeof COOKIE_KEYS;

/**
 * 쿠키가 존재하는지 확인합니다.
 * @param key 쿠키 키 값
 * @returns 쿠키가 존재하면 true, 존재하지 않으면 false
 */
export const hasCookie = async (key: CookieKeys) => {
  return cookies().has(COOKIE_KEYS[key]);
};

/**
 * 쿠키 값을 가져옵니다.
 * @param key 쿠키 키 값
 * @returns 쿠키 값
 */
export const getCookie = async (key: CookieKeys) => {
  return cookies().get(COOKIE_KEYS[key])?.value;
};

/**
 * 모든 쿠키 값을 가져옵니다.
 */
export const getAllCookies = async () => {
  return cookies()
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join('; ');
};

/**
 * 쿠키 값을 설정합니다.
 * @param key 설정할 쿠키 키 값
 * @param value 설정할 쿠키 값
 */
export const setCookie = async (key: CookieKeys, value: string) => {
  cookies().set(COOKIE_KEYS[key], value, {
    domain: '.swifty.kr',
    secure: true,
    httpOnly: true,
  });
};

/**
 * 쿠키를 삭제합니다.
 * @param key 삭제할 쿠키 키 값
 */
export const removeCookie = async (key: CookieKeys) => {
  cookies().set(COOKIE_KEYS[key], '', {
    expires: new Date(0),
    domain: '.swifty.kr',
  });
};

/**
 * 모든 쿠키를 삭제합니다.
 */
export const removeAllCookies = async () => {
  Object.keys(COOKIE_KEYS).forEach((key) => {
    removeCookie(key as CookieKeys);
  });
};

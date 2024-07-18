'use server';

import { http } from '@swifty/shared-lib';

import { type FormValues } from '../signup/schema';

export async function login(body: FormValues) {
  await http.post('/user/login', body);
}

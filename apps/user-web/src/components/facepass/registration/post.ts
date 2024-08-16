'use client';

import { STEP } from '@lib/fascepass';
import { http } from '@swifty/shared-lib';

export default async function facepassPost(fileArr: File[]) {
  const formData = new FormData();
  STEP.slice(2).forEach((item, index) => {
    formData.append(item[1], fileArr[index]!);
  });
  await http.post('/facepass', formData, {
    credentials: 'include',
  });
}

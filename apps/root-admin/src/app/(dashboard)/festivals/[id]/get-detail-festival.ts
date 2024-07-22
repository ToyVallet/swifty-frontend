'use server';

import { http } from '@swifty/shared-lib';
import type { FestivalDetailResponse } from '@type';

export async function getDetailFestival(id: string) {
  return http.get<FestivalDetailResponse>('/festival/detail/{id}', {
    params: { id },
    credentials: 'include',
  });
}

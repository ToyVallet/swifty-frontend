'use server';

import { http } from '@swifty/shared-lib';
import type { FestivalDetailResponse } from '@type';

export async function getDetailFestival(id: string) {
  return http.get<FestivalDetailResponse>('/host/admin/festival/{id}/detail', {
    params: { id },
    credentials: 'include',
  });
}

'use server';

import type { FestivalInfo, LineUp } from '@lib/types';

export async function getFestivalInfos(id: number): Promise<FestivalInfo> {
  return {
    id: String(id),
    name: '축제 이름',
    description: '축제 설명',
    addr: '축제 주소',
    startdate: '2022-01-01',
    enddate: '2022-01-02',
    festivalStatus: "AFTER",
    url: 'https://festival.url',
  }
}

export async function getLineups(festivalId: number): Promise<LineUp[]> {
  return [
  ];
}

'use server';

import type { FestivalInfo } from '@lib/types';

export async function getLineupInfos(): Promise<FestivalInfo[]> {
  return [
    {
      id: '1',
      name: '축제 이름',
      description: '축제 설명',
      addr: '축제 주소',
      startdate: '2022-01-01',
      enddate: '2022-01-02',
      festivalStatus: 'AFTER',
      url: 'https://festival.url',
    },
  ];
}

export async function getLineupHero(num: number = 10): Promise<FestivalInfo[]> {
  return Array(num).fill({
    id: '1',
    name: '축제 이름',
    description: '축제 설명',
    addr: '축제 주소',
    startdate: '2022-01-01',
    enddate: '2022-01-02',
    festivalStatus: 'AFTER',
    url: 'https://festival.url',
  });
}

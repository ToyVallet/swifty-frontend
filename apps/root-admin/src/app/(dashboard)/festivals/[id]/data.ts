'use server';

import type { FestivalDetailResponse } from '@type/festival';

const dynamic = 'force-dynamic';

export async function getFestivalDetail(subId: string) {
  const res = await fetch(`/admin/festival/detail/${subId}`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
  });
  const datas = await res.json();
  return datas;
}

export async function getMockFestivalDetail(
  subId: string,
): Promise<FestivalDetailResponse> {
  return {
    adminFestivalInfoResponse: {
      subId: '6fa85f64-5717-4562-b3fc-2c963f66afa6',
      name: '단국대 축제',
      addr: '단국대학교',
      startDate: '2024-05-23T14:51:24.779Z',
      endDate: '2024-05-23T14:51:24.779Z',
      revealStartDate: '2024-05-23T14:51:24.779Z',
      revealEndDate: '2024-05-23T14:51:24.779Z',
      festivalStatus: 'BEFORE',
      description: '2024년 단국대학교 축제 `Orbit`',
      thumbnail: 'string',
      poster: 'string',
      logo: 'string',
    },
    adminConcertInfoResponses: [
      {
        subId: '55585f64-5717-4562-b3fc-2c963f66afa6',
        name: '1일차',
        startDate: '2024-05-23T14:51:24.779Z',
        endDate: '2024-05-23T14:51:24.779Z',
        location: '단국대학교 대운동장',
        description: '생수를 지참하시길 바랍니다',
        lineUpInfoResponses: [
          {
            subId: '11a85f64-5717-4562-b3fc-2c963f66afa6',
            title: '콜드플레이',
            description: '- 스물셋\n- Celebrity',
            performanceDate: '2024-05-23',
            lineUpImagePath: 'string',
            isOpened: 'CLOSED',
          },
        ],
        concertStatus: 'PROCESS',
      },
      {
        subId: '66685f64-5717-4562-b3fc-2c963f66afa6',
        name: '2일차',
        startDate: '2024-05-23T14:51:24.779Z',
        endDate: '2024-05-23T14:51:24.779Z',
        location: '단국대학교 대운동장',
        description: '생수를 지참하시길 바랍니다',
        lineUpInfoResponses: [
          {
            subId: '22a85f64-5717-4562-b3fc-2c963f66afa6',
            title: '아이유',
            description: '- 스물셋\n- Celebrity',
            performanceDate: '2024-05-23',
            lineUpImagePath: 'string',
            isOpened: 'CLOSED',
          },
        ],
        concertStatus: 'PROCESS',
      },
    ],
  };
}

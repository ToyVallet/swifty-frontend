import type { ConcertsResponse } from './concert';

export type FestivalRequest = {
  sort: 'updated' | 'recently' | 'popular';
  count: number;
  status: 'all' | 'available' | 'active' | 'end' | 'before';
  imageType: 'all' | 'thumbnail' | 'poster';
};

export type FestivalInfoResponse = {
  subId: string;
  name: string;
  addr: string;
  startDate: string;
  endDate: string;
  description: string;
};

export type FestivalDetailResponse = {
  adminFestivalInfoResponse: {
    revealStartDate: string;
    revealEndDate: string;
    festivalStatus: 'BEFORE' | 'PROCESS' | 'CLOSED';
    thumbnail: string;
    poster: string;
    logo: string;
  } & FestivalInfoResponse;
  adminConcertInfoResponses: ConcertsResponse[];
};

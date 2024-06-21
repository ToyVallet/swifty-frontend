import type { ConcertsResponse } from './concert';

export type Status = 'OPENED' | 'HIDDEN';

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

export type FestivalDetail = {
  revealStartDate: string;
  revealEndDate: string;
  festivalStatus: Status;
  thumbnail: string;
  poster: string;
  logo: string;
} & FestivalInfoResponse;

export type FestivalDetailResponse = {
  adminFestivalInfoResponse: FestivalDetail;
  adminConcertInfoResponses: ConcertsResponse[];
};

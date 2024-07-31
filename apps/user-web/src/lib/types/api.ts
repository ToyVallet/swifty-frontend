import type { Concert, Festival } from '@lib/types/festival';

export type LineupApi = {
  festivalInfoRespnse: Festival;
  thumbnailImage: string;
  logoImage: string;
  concertsResponse: Concert[];
};

export type UserInfoApi = {
  name: string;
  phoneNumber: string;
  dob: string;
  gender: 'FEMALE' | 'MALE';
  enrolled: string;
};

export type UserTicketApi = {
  ticketId: string;
  festivalName: string;
  festivalDescription: string;
  concertDate: '2024-07-30T10:28:02.440Z';
  festivalId: string;
  festivalImage: string;
};

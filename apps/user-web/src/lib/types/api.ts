import type { Concert, Festival } from '@lib/types/festival';

export type LineupApi = {
  festivalInfoResponse: Festival;
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
  concertDate: string;
  festivalId: string;
  festivalImage: string;
};

export interface TicketingResultApi {
  name: string;
  issuedDateTime: string;
  concertStartDateTime: string;
  concertEndDateTime: string;
  concertLocation: string;
  areaName: string;
  ticketIdentifier: string;
  festivalName: string;
  concertName: string;
  poster: string;
}

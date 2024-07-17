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

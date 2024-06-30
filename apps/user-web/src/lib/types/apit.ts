import type { Concert, Festival } from '@lib/types/festival';

export type LineupApi = {
  festivalInfoRespnse: Festival;
  thumbnailImage: string;
  logoImage: string;
  concertsResponse: Concert[];
};

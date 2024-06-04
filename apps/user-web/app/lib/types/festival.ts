export type FestivalImage = {
  file: string;
  originalFileName: string;
  mimeType: string;
  type: string;
};

export type FestivalInfo = {
  id: string;
  name: string;
  addr: string;
  startdate: string;
  enddate: string;
  festivalStatus: 'BEFORE' | 'PENDING' | 'AFTER';
  description: string;
  festivalFiles?: FestivalImage[];
  festivalimage?: string;
  url: string;
};

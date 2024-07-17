export type UniversitySearch = {
  universityId: string;
  universityName: string;
  exampleImage: {
    url: string;
    subId: string;
  };
};

export type ApiCertification = {
  content: UniversitySearch[];
  hasNext: boolean;
  totalPages: number;
  totalElements: number;
  page: number;
  size: number;
  first: boolean;
  last: boolean;
};

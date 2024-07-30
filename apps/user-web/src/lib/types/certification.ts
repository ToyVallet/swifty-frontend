export type UniversitySearch = {
  id: string;
  name: string;
  exampleImage: {
    url: string;
    id: string;
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

export type VerficationStatus =
  | 'APPROVED'
  | 'REJECTED'
  | 'PENDING'
  | 'UNAPPLIED';

export type VerficationAPI = {
  certificationAnswerId: string;
  certificationStatus: VerficationStatus;
  rejectedReason: string;
};

export interface Paginaiton<T> {
  content: T[];
  hasNext: boolean;
  totalPages: number;
  totalElements: number;
  page: number;
  size: number;
  first: boolean;
  last: boolean;
}

export interface UniversityInfo {
  campusName: string;
  collegeinfourl: string;
  schoolType: '대학교';
  link: string;
  schoolGubun: string;
  adres: string;
  schoolName: string;
  region: string;
  totalCount: number;
  estType: '국립' | '사립' | '공립';
  seq: number;
}

export interface UniversityApi {
  dataSearch: {
    content: UniversityInfo[];
  };
}

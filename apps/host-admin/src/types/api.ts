export type universityApi = {
  universityName: string;
};

export type StudentStatus =
  | 'STUDENT'
  | 'GRADUATE'
  | 'DROP_OUT'
  | 'POST_GRADUATE';

export type AnswerStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'UNAPPLIED';

export type Table = {
  id: string;
  ocrNameData: string;
  ocrStudentIdData: string;
  ocrMajorData: string;
  ocrStudentStatusData: StudentStatus;
  answerStatus: AnswerStatus;
};

export type TableAPI = {
  content: Table[];
  hasNext: boolean;
  totalPages: number;
  totalElements: number;
  page: number;
  size: number;
  first: boolean;
  last: boolean;
};

export type UserDetailApi = Table & {
  answerAt: string;
  file: {
    url: string;
    id: string;
  };
  rejectReason?: string;
};

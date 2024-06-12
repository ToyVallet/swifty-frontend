export type UserRole =
  | 'USER'
  | 'GUEST'
  | 'CLIENT'
  | 'SUB_MANAGER'
  | 'MANAGER'
  | 'ADMIN'
  | 'BANNED';

export type UserStatus = 'ACTIVE' | 'WITHDRAWAL' | 'PAUSE' | 'BANNED';

export type UserGender =
  | 'OLD_MALE'
  | 'OLE_FEMALE'
  | 'YOUNG_MALE'
  | 'YOUNG_FEMALE';

export type UserEnrolled = 'FORM' | 'KAKAO';

export interface User {
  userSubId: string;
  name: string;
  phoneNumber: string;
  userFormId: string;
  bod: string;
  gender: UserGender;
  userRole: UserRole;
  enrolled: UserEnrolled;
  status: UserStatus;
}

export interface UserApi {
  content: User[];
  hasNext: boolean;
  totalPages: number;
  totalElements: number;
  page: number;
  size: number;
  first: boolean;
  last: boolean;
}

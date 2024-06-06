export type UserRole =
  | 'USER'
  | 'GUEST'
  | 'CLIENT'
  | 'SUB_MANAGER'
  | 'MANAGER'
  | 'ADMIN'
  | 'BANNED';

type UserStatus = 'ACTIVE' | 'WITHDRAWL' | 'PAUSE' | 'BANNED';

type UserGender = 'OLD_MALE' | 'OLE_FEMALE' | 'YOUNG_MALE' | 'YOUNG_FEMALE';

export interface User {
  userSubId: string;
  name: string;
  phoneNumber: string;
  userFormId: string;
  gender: UserGender;
  userRole: UserRole;
  enrolled: 'FORM' | 'KAKAO';
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

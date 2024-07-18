export type UserRole =
  | 'USER'
  | 'GUEST'
  | 'CLIENT'
  | 'SUB_MANAGER'
  | 'MANAGER'
  | 'ADMIN'
  | 'BANNED';

export type UserStatus = 'ACTIVE' | 'WITHDRAWAL' | 'PAUSED' | 'BANNED';

export type UserGender = 'MALE' | 'FEMALE';

export type UserEnrolled = 'FORM' | 'KAKAO';

export interface User {
  userId: string;
  name: string;
  phoneNumber: string;
  userFormId: string;
  bod: string;
  gender: UserGender;
  userRole: UserRole;
  enrolled: UserEnrolled;
  status: UserStatus;
}

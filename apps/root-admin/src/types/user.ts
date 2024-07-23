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
  id: string;
  name: string;
  phoneNumber: string;
  loginId: string;
  dateOfBirth: string;
  gender: UserGender;
  userRole: UserRole;
  enrolled: UserEnrolled;
  status: UserStatus;
}

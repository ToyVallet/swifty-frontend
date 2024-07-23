export interface University {
  id: string;
  name: string;
  addr: string;
  logo: string;
}

export interface UniversityLogo {
  url: string | null;
  id: string | null;
}

export interface UniversityDetail {
  id: string;
  name: string;
  addr: string;
  fileInfoResponse: UniversityLogo;
}

export interface UniversityHostUser {
  subId: string;
  phone: string;
  userId: string;
  userLoginId: string;
}

export interface UniversityHostCreate {
  clientLoginId: string;
  clientPassword: string;
}

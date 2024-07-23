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
  hostId: string;
  phone: string;
  userId: string;
  loginId: string;
}

export interface UniversityHostCreate {
  loginId: string;
  password: string;
}

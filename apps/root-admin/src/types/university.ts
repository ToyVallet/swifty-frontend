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
  universityId: string;
  universityName: string;
  universityAddr: string;
  fileInfoResponse: UniversityLogo;
}

export interface UniversityHostUser {
  id: string;
  phone: string;
  subUserId: string;
  userFormId: string;
}

export interface UniversityHostCreate {
  clientLoginId: string;
  clientPassword: string;
}

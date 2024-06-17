export interface University {
  subId: string;
  name: string;
  addr: string;
  logo: string;
}

export interface UniversityLogo {
  url: string | null;
  subId: string | null;
}

export interface UniversityDetail {
  universitySubId: string;
  universityName: string;
  universityAddr: string;
  fileInfoResponse: UniversityLogo;
}

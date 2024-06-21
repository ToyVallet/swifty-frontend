import type { UniversityApi } from '@type';

export default async function getUniversity(searchSchulNm: string) {
  const url = 'https://www.career.go.kr/cnet/openapi/getOpenApi';
  const param = {
    apiKey: 'cded80f642750b2b0ef6339ce34a6b8e',
    svcType: 'api',
    svcCode: 'SCHOOL',
    contentType: 'json',
    gubun: 'univ_list',
    searchSchulNm,
  };
  const searchParam = new URLSearchParams(param).toString();
  const response = await fetch(`${url}?${searchParam}`);
  const data: UniversityApi = await response.json();
  return data;
}

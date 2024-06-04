"use server";

type ResponseType = {
  subId: string;
  name: string;
  addr: string;
  startDate: string;
  endDate: string;
  description: string;
};

export async function getAllFestivals() {
  const res = await fetch('/admin/festival', {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
    },
  });
  const datas: ResponseType[] = await res.json();
  return datas;
}

export async function getMockAllFestivals(): Promise<FestivalInfoResponse[]> {
  return (
    [
      {
        "subId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "name": "단국대 축제",
        "addr": "단국대학교",
        "startDate": "2024-05-23T13:57:23.132Z",
        "endDate": "2024-05-23T13:57:23.132Z",
        "description": "2024년 단국대학교 축제 `Orbit`"
      },
      {
        "subId": "2fa85f64-5717-4562-b3fc-2c963f66afa6",
        "name": "서울대 축제",
        "addr": "서울대학교",
        "startDate": "2024-05-23T13:57:23.132Z",
        "endDate": "2024-05-23T13:57:23.132Z",
        "description": "2024년 서울대학교 축제 `Sorbit`"
      },
    ]
  );
}

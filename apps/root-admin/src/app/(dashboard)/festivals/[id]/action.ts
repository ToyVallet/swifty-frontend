"use server";

type RequestType = {
  subId: string;
  name: string;
  festivalSubId: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
}

export async function createConcert(values: RequestType) {
  const res = await fetch('/admin/concert', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(values),
  });
  const datas = await res.json();
  return datas;
}

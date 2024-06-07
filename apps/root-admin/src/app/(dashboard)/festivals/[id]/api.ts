import { customFetch } from "@/app/api";
import { API_CONCERT } from "@/constant";

export async function createConcert(id: string, formData: FormData) {
  await customFetch(API_CONCERT.concert(id), {
    method: 'POST',
    body: JSON.stringify(formData),
  });
}

export async function removeConcert(id: string) {
  await customFetch(API_CONCERT.concert(id), {
    method: 'DELETE'
  });
}

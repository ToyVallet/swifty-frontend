import { SERVER_URL } from '../constants';
import APIError from '../error';

export async function customFetch<Res>(
  url: string,
  option?: RequestInit,
): Promise<Res> {
  try {
    const response = await fetch(`${SERVER_URL}${url}`, {
      headers: {
        'Content-type': 'application/json',
      },
      credentials: 'include',
      ...option,
    });

    if (!response.ok) {
      const error = await response.json();
      throw error;
    }
    const data: Res = await response.json();

    return data;
  } catch (e) {
    if (APIError.isAPIError(e)) {
      throw new APIError(e);
    }
    if (e instanceof Error) {
      throw e;
    }
    throw new Error('예상치 못한 오류가 발생했습니다.');
  }
}

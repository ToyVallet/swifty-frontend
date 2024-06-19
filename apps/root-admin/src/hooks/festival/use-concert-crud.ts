'use client';

import { API_CONCERT, FETCH_TAG, changeDateFormat } from '@lib';
import { customFetch, revalidate } from '@swifty/shared-lib';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { useCallback, useState } from 'react';

const FORMAT = 'YYYY-MM-DDTHH:mm:ss';

type FieldType = {
  name: string;
  rangeDateTime: string[];
  location: string;
  description: string;
};

type UpdateFieldType = {
  name: string;
  startDate: Date;
  endDate: Date;
  location: string;
  description: string;
};

export default function useConcertCRUD() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createConcert = useCallback(
    async (festivalSubId: string, values: FieldType) => {
      const { name, location, description, rangeDateTime } = values;
      setIsLoading(true);
      setError(null);
      const formData = new FormData();

      formData.append('name', name);
      formData.append('festivalSubId', festivalSubId);
      formData.append('startDate', changeDateFormat(rangeDateTime[0]));
      formData.append('endDate', changeDateFormat(rangeDateTime[1]));
      formData.append('location', location);
      formData.append('description', description);

      try {
        await customFetch(API_CONCERT.concert(), {
          method: 'POST',
          headers: {},
          body: formData,
        });
        await revalidate(FETCH_TAG.festivalsDetail(festivalSubId));
      } catch (e) {
        if (e instanceof Error) setError(e.message);
        else setError('예상치 못한 오류가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const updateConcert = useCallback(
    async (id: string, values: UpdateFieldType) => {
      const { name, location, description, startDate, endDate } = values;
      setIsLoading(true);
      setError(null);
      const formData = new FormData();

      formData.append('name', name);
      formData.append('concertSubId', id);
      formData.append('startDate', dayjs(startDate).format(FORMAT));
      formData.append('endDate', dayjs(endDate).format(FORMAT));
      formData.append('location', location);
      formData.append('description', description);

      try {
        await customFetch(API_CONCERT.concert(), {
          method: 'PATCH',
          headers: {},
          body: formData,
        });
        await revalidate('festival-detail');
      } catch (e) {
        if (e instanceof Error) setError(e.message);
        else setError('예상치 못한 오류가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const deleteConcert = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await customFetch(API_CONCERT.concert(id), {
        method: 'DELETE',
      });
      await revalidate('festival-detail');
    } catch (e) {
      if (e instanceof Error) setError(e.message);
      else setError('예상치 못한 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    createConcert,
    updateConcert,
    deleteConcert,
  };
}

'use client';

import { NotificationHandlerContext } from '@components';
import { FETCH_TAG, changeDateFormat } from '@lib';
import { http, revalidate } from '@swifty/shared-lib';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { useCallback, useContext, useState } from 'react';

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
  const handleNotification = useContext(NotificationHandlerContext);

  const createConcert = useCallback(
    async (festivalId: string, values: FieldType) => {
      const { name, location, description, rangeDateTime } = values;
      setIsLoading(true);
      setError(null);
      const formData = new FormData();

      formData.append('name', name);
      formData.append('festivalId', festivalId);
      formData.append('startDate', changeDateFormat(rangeDateTime[0]));
      formData.append('endDate', changeDateFormat(rangeDateTime[1]));
      formData.append('location', location);
      formData.append('description', description);

      try {
        await http.post('/host/admin/concert', formData, {
          credentials: 'include',
        });

        await revalidate(FETCH_TAG.festivalsDetail(festivalId));
      } catch (e) {
        if (e instanceof Error) setError(e.message);
        else setError('예상치 못한 오류가 발생했습니다.');
        handleNotification(
          {
            message: '콘서트 생성에 실패하였습니다.',
            description: (e as Error).message,
          },
          'error',
        );
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
      formData.append('concertId', id);
      formData.append('startDate', dayjs(startDate).format(FORMAT));
      formData.append('endDate', dayjs(endDate).format(FORMAT));
      formData.append('location', location);
      formData.append('description', description);

      try {
        await http.patch('/host/admin/concert', formData, {
          credentials: 'include',
        });

        await revalidate('festival-detail');
      } catch (e) {
        if (e instanceof Error) setError(e.message);
        else setError('예상치 못한 오류가 발생했습니다.');
        handleNotification(
          {
            message: '콘서트 수정에 실패하였습니다.',
            description: (e as Error).message,
          },
          'error',
        );
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
      await http.delete('/host/admin/concert/{id}', {
        credentials: 'include',
        params: { id },
      });

      await revalidate('festival-detail');
    } catch (e) {
      if (e instanceof Error) setError(e.message);
      else setError('예상치 못한 오류가 발생했습니다.');
      handleNotification(
        {
          message: '콘서트 삭제에 실패하였습니다.',
          description: (e as Error).message,
        },
        'error',
      );
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

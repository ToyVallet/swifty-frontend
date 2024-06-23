'use client';

import { API_LINEUP } from '@lib';
import { customFetch } from '@swifty/shared-lib';
import type { UploadFile } from 'antd';
import type { RcFile } from 'antd/es/upload';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { useCallback, useState } from 'react';

const FORMAT = 'HH:mm:ss';

type FieldType = {
  title: string;
  description: string;
  performanceTime: Date;
};

export default function useLineupCRUD() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createLineup = useCallback(
    async (concertSubId: string, values: FieldType, newFile: UploadFile) => {
      const { title, description, performanceTime } = values;
      setIsLoading(true);
      setError(null);

      const formData = new FormData();
      formData.append('concertSubId', concertSubId);
      formData.append('title', title);
      formData.append('description', description);
      formData.append('performanceTime', dayjs(performanceTime).format(FORMAT));

      if (newFile.originFileObj) {
        formData.append(
          'newFile',
          newFile.originFileObj as RcFile,
          newFile.name,
        );
      }

      try {
        await customFetch(API_LINEUP.lineup(), {
          method: 'POST',
          headers: {},
          body: formData,
        });
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError('예상치 못한 오류가 발생했습니다.');
        }
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const updateLineup = useCallback(
    async (
      id: string,
      values: FieldType,
      newFile: UploadFile,
      previousFile: string,
    ) => {
      const { title, description, performanceTime } = values;
      setIsLoading(true);
      setError(null);
      const formData = new FormData();
      formData.append('lineUpSubId', id);
      formData.append('title', title);
      formData.append('description', description);
      formData.append('performanceTime', dayjs(performanceTime).format(FORMAT));
      formData.append('previousFile', previousFile);

      // 이미지 파일 변경 있는지 확인
      if (newFile.originFileObj) {
        formData.append(
          'newFile',
          newFile.originFileObj as RcFile,
          newFile.name,
        );
      } else {
        formData.append('previousFile', newFile.url!);
      }

      try {
        await customFetch(API_LINEUP.lineup(), {
          method: 'PATCH',
          headers: {},
          body: formData,
        });
      } catch (e) {
        if (e instanceof Error) setError(e.message);
        else setError('예상치 못한 오류가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const deleteLineup = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await customFetch(API_LINEUP.lineup(id), {
        method: 'DELETE',
      });
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
    createLineup,
    updateLineup,
    deleteLineup,
  };
}

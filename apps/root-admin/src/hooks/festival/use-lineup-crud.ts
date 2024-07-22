'use client';

import { NotificationHandlerContext } from '@components';
import { API_LINEUP } from '@lib';
import { http } from '@swifty/shared-lib';
import type { UploadFile } from 'antd';
import type { RcFile } from 'antd/es/upload';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { useCallback, useContext, useState } from 'react';

const FORMAT = 'HH:mm:ss';

type FieldType = {
  title: string;
  description: string;
  performanceTime: Date;
};

export default function useLineupCRUD() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const handleNotification = useContext(NotificationHandlerContext);

  const createLineup = useCallback(
    async (concertId: string, values: FieldType, newFile: UploadFile) => {
      const { title, description, performanceTime } = values;
      setIsLoading(true);
      setError(null);

      const formData = new FormData();
      formData.append('concertId', concertId);
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
        await http.post('/host/admin/line_up', formData, {
          credentials: 'include',
        });
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError('예상치 못한 오류가 발생했습니다.');
        }
        handleNotification(
          {
            message: '라인업 생성에 실패하였습니다.',
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
      formData.append('lineUpId', id);
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
        await http.patch('/host/admin/line_up', formData, {
          credentials: 'include',
        });
      } catch (e) {
        if (e instanceof Error) setError(e.message);
        else setError('예상치 못한 오류가 발생했습니다.');
        handleNotification(
          {
            message: '라인업 수정에 실패하였습니다.',
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

  const deleteLineup = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await http.delete('/host/admin/line_up/{id}', {
        params: { id },
        credentials: 'include',
      });
    } catch (e) {
      if (e instanceof Error) setError(e.message);
      else setError('예상치 못한 오류가 발생했습니다.');
      handleNotification(
        {
          message: '라인업 삭제에 실패하였습니다.',
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
    createLineup,
    updateLineup,
    deleteLineup,
  };
}

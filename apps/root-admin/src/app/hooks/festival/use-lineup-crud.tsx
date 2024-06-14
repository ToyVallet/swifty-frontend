"use client";

import { useCallback, useState } from "react";
import { customFetch } from "@swifty/shared-lib";
import { API_LINEUP } from "@app/lib/constant/api";
import type { UploadFile } from "antd";
import type { RcFile } from "antd/es/upload";

type FieldType = {
  title: string;
  description: string;
  performanceTime: string;
};

function formatDate(performanceTime: string) {
  const offset = 1000 * 60 * 60 * 9;
  const pt = new Date(performanceTime + offset);
  return pt.toISOString().slice(0, 10);
}

export default function useLineupCRUD() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createLineup = useCallback(async (concertSubId: string, values: FieldType, newFile: UploadFile) => {
    const { title, description, performanceTime } = values;
    setIsLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append('concertSubId', concertSubId);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('performanceTime', formatDate(performanceTime));
    if (newFile)
      formData.append('newFile', newFile.originFileObj as RcFile, newFile.name);
    try {
      await customFetch(API_LINEUP.lineup(), {
        headers: {},
        method: 'POST',
        body: formData
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
  }, []);

  const updateLineup = useCallback(async (id: string, values: FieldType, newFile: UploadFile, previousFile: string) => {
    const { title, description, performanceTime } = values;
    setIsLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append('lineUpSubId', id);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('performanceTime', formatDate(performanceTime));
    formData.append('newFile', newFile.originFileObj as RcFile, newFile.name);
    formData.append('previousFile', previousFile);
    try {
      const result = await customFetch(API_LINEUP.lineup(), {
        headers: {},
        method: 'PATCH',
        body: formData
      });
      console.log('result: ', JSON.stringify(result));
      console.log('previousFile: ', previousFile);
    } catch (e) {
      if (e instanceof Error)
        setError(e.message);
      else
        setError('예상치 못한 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteLineup = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await customFetch(API_LINEUP.lineup(id), {
        method: 'DELETE'
      });
    } catch (e) {
      if (e instanceof Error)
        setError(e.message);
      else
        setError('예상치 못한 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    createLineup,
    updateLineup,
    deleteLineup,
  };
}

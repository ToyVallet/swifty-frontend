"use client";

import { useCallback, useState } from "react";
import { customFetch, customFetchMultipart } from '@swifty/shared-lib';
import { API_CONCERT } from '@lib/constant/api';
import { useRouter } from "next/navigation";

type FieldType = {
  name: string;
  rangeDateTime: string[];
  location: string;
  description: string;
};

type UpdateFieldType = {
  name: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
}

function formatDates(rangeDateTime: string[]) {
  const startDate = new Date(rangeDateTime[0] as string);
  const endDate = new Date(rangeDateTime[1] as string);
  const startDateStr = startDate.toISOString().slice(0, 19);
  const endDateStr = endDate.toISOString().slice(0, 19);
  return {
    startDate: startDateStr,
    endDate: endDateStr
  };
}

export default function useConcert() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createConcert = useCallback(async (festivalSubId: string, values: FieldType) => {
    const { name, location, description, rangeDateTime } = values;
    setIsLoading(true);
    setError(null);
    const formData = new FormData();
    const { startDate, endDate } = formatDates(rangeDateTime);
    formData.append('name', name);
    formData.append('festivalSubId', festivalSubId);
    formData.append('startDate', startDate);
    formData.append('endDate', endDate);
    formData.append('location', location);
    formData.append('description', description);

    try {
      await customFetch(API_CONCERT.concert(), {
        headers: {},
        method: 'POST',
        body: formData
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

  const updateConcert = useCallback(async (id: string, values: UpdateFieldType) => {
    const { name, location, description, startDate: sd, endDate: ed } = values;
    setIsLoading(true);
    setError(null);
    const formData = new FormData();
    const { startDate, endDate } = formatDates([sd, ed]);
    formData.append('name', name);
    formData.append('concertSubId', id);
    formData.append('startDate', startDate);
    formData.append('endDate', endDate);
    formData.append('location', location);
    formData.append('description', description);

    try {
      await customFetch(API_CONCERT.concert(), {
        headers: {},
        method: 'PATCH',
        body: formData
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

  const deleteConcert = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await customFetch(API_CONCERT.concert(id), {
        headers: {},
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
    error,
    createConcert,
    updateConcert,
    deleteConcert
  };
}

import { useCallback, useState } from "react";
import { customFetch } from "@/app/api";
import { API_CONCERT } from "@/constant";

export function useConcert() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createConcert = useCallback(async (id: string, value: any) => {
    setIsLoading(true);
    setError(null);
    try {
      await customFetch(API_CONCERT.concert(id), {
        method: 'POST',
        body: JSON.stringify(value),
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
    deleteConcert
  };
}


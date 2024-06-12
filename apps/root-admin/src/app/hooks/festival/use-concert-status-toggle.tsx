import { useCallback, useState } from "react";
import { API_CONCERT } from '@lib/constant/api';
import { customFetch } from "@swifty/shared-lib";
import type { ConcertStatus } from "@app/types/concert";

export default function useConcertStatusToggle(id: string, initialStatus: ConcertStatus) {
  const [status, setStatus] = useState<ConcertStatus>(initialStatus);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const open = useCallback(async () => {
    const prevStatus = status;
    try {
      setIsLoading(true);
      await customFetch(API_CONCERT.open(id), { method: 'PATCH' });
      setStatus('OPENED');
    } catch (e) {
      if (e instanceof Error)
        setError(e.message);
      else
        setStatus(prevStatus);
      setError('예상치 못한 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  }, [status]);

  const hidden = useCallback(async () => {
    const prevStatus = status;
    try {
      setIsLoading(true);
      await customFetch(API_CONCERT.hidden(id), { method: 'PATCH' });
      setStatus('HIDDEN');
    } catch (e) {
      if (e instanceof Error)
        setError(e.message);
      else
        setError('예상치 못한 오류가 발생했습니다.');
      setStatus(prevStatus);
    } finally {
      setIsLoading(false);
    }
  }, [status]);

  return {
    optimisticConcertStatus: status,
    isLoading,
    error,
    open,
    hidden
  }
}

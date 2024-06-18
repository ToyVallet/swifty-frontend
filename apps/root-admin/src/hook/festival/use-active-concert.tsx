import { API_CONCERT } from '@lib';
import { customFetch } from '@swifty/shared-lib';
import type { ConcertsResponse } from '@type';
import { useCallback, useEffect, useState } from 'react';

export default function useActiveConcert(
  adminConcertInfoResponses: ConcertsResponse[],
) {
  const [concerts, setConcerts] = useState([...adminConcertInfoResponses]);
  const defaultPanes = adminConcertInfoResponses.map(({ subId, name }) => {
    return { label: name, key: subId };
  });
  const [activeKey, setActiveKey] = useState(defaultPanes[0]?.key);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const open = useCallback(
    async (id: string) => {
      const prevConcerts = concerts;
      try {
        setIsLoading(true);
        await customFetch(API_CONCERT.open(id), { method: 'PATCH' });
        setConcerts((prev) =>
          prev.map((concert) =>
            concert.subId === id ? { ...concert, status: 'open' } : concert,
          ),
        );
      } catch (e) {
        setConcerts(prevConcerts);
        if (e instanceof Error) setError(e.message);
        else setError('예상치 못한 오류가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    },
    [concerts, activeKey],
  );

  const hide = useCallback(
    async (id: string) => {
      const prevConcerts = concerts;
      try {
        setIsLoading(true);
        await customFetch(API_CONCERT.hidden(id), { method: 'PATCH' });
        setConcerts((prev) =>
          prev.map((concert) =>
            concert.subId === id ? { ...concert, status: 'hidden' } : concert,
          ),
        );
      } catch (e) {
        setConcerts(prevConcerts);
        if (e instanceof Error) setError(e.message);
        else setError('예상치 못한 오류가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    },
    [concerts, activeKey],
  );

  useEffect(() => {
    setConcerts([...adminConcertInfoResponses]);
  }, [adminConcertInfoResponses]);

  return {
    activeConcert: concerts.find(({ subId }) => subId === activeKey),
    defaultPanes,
    activeKey,
    setActiveKey,
    open,
    hide,
    isLoading,
    error,
  };
}

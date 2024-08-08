'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function UseEventSource(id: string) {
  const router = useRouter();
  useEffect(() => {
    const eventSource = new EventSource(
      `https://swifty.kr/api/ticketing/subscribe/${id}`,
      {
        withCredentials: true,
      },
    );

    eventSource.addEventListener('ticketing', (event: MessageEvent<string>) => {
      // 서버에서 데이터가 전송될 때 호출되는 이벤트 핸들러
      const data: { id: string; finished: boolean } = JSON.parse(event.data);

      if (data.finished) {
        eventSource.close();
        router.replace(`/ticketing-result/${id}/result`);
      }
    });

    // Clean up on component unmount
    return () => {
      eventSource.close();
    };
  }, [id]);
}

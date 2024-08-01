'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function UseEventSource(cookie: string, id: string) {
  const router = useRouter();
  useEffect(() => {
    // Use the polyfill for custom headers support

    const eventSource = new EventSource(
      `https://swifty.kr/api/ticketing/subscribe/${id}`,
      {
        withCredentials: true,
      },
    );

    eventSource.addEventListener('ticketing', (event: MessageEvent<string>) => {
      // 서버에서 데이터가 전송될 때 호출되는 이벤트 핸들러
      const data: { id: string; isFinished: boolean } = JSON.parse(event.data);
      if (data.isFinished) {
        eventSource.close();
        router.replace(`/ticketing-result/${id}/result`);
      }
    });

    // Clean up on component unmount
    return () => {
      eventSource.close();
    };
  }, [cookie, id]); // Add cookie and id to the dependency array
}

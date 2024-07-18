'use client';

import { Button, Card, Tag } from 'antd';

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Card
        style={{
          width: '400px',
        }}
      >
        <h2
          style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            marginBottom: '1rem',
          }}
        >
          오류가 생겼어요
        </h2>
        <p
          style={{
            color: 'GrayText',
          }}
        >
          {error.message}
        </p>
        <p
          style={{
            color: 'GrayText',
          }}
        >
          digest: <Tag icon>{error.digest}</Tag>
        </p>
        <Button
          block
          onClick={reset}
          style={{
            marginTop: '1rem',
          }}
        >
          다시 시도하기
        </Button>
      </Card>
    </div>
  );
}

import { FlushButton, LogTable, RefetchButton } from '@components';
import { type BaseErrorLog, type Pageable, http } from '@swifty/shared-lib';

export type MultipleLogs = BaseErrorLog & {
  id: string;
};

export default async function Home() {
  const fullErrorLogs = await http.get<Pageable<MultipleLogs>>('/log', {
    credentials: 'include',
    query: {
      size: `${100}`,
    },
  });
  console.log(fullErrorLogs);
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        overflow: 'scroll',
      }}
    >
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-end',
          marginBottom: '10px',
          marginTop: '10px',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <FlushButton />
        <RefetchButton />
      </div>
      <LogTable
        data={fullErrorLogs.content}
        pageSize={fullErrorLogs.size}
        total={fullErrorLogs.totalElements}
      />
    </div>
  );
}

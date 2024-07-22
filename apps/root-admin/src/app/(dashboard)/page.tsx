import { FlushButton, LogTable, RefetchButton } from '@components';
import {
  type BaseErrorLog,
  type ErrorLogResponse,
  type Pageable,
  http,
} from '@swifty/shared-lib';

export default async function Home() {
  const fullErrorLogs = await http.get<Pageable<BaseErrorLog>>('/log');

  const clientErrorLog = await Promise.resolve([
    {
      source: 'CLIENT',
      host: 'localhost.swifty.kr:3000',
      path: '/',
      message: 'fetch failed',
      time: '2024-07-22T08:55:23.581Z',
      trackingId: '1084068237',
      user_agent:
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
    },
  ] as ErrorLogResponse[]);

  const serverErrorLog = await Promise.resolve([
    {
      source: 'SERVER',
      host: 'www.swifty.kr',
      path: '/api/user',
      message: 'fetch failed',
      time: '2024-07-22T08:55:23.581Z',
      trackingId: '1084068237',
      status_code: 400,
      status: 'BAD_REQUEST',
      code: 'BadRequestException',
      trace_log: {
        error_point:
          '2024-07-21T00:59:29.775Z ERROR 1 --- [nio-8080-exec-5] f.b.t.global.error.ControllerAdvisor     : A problem has occurred in controller advice: [id=3176421d-9c97-41e5-a6c6-17e6c71731e3]',
        error_code: 'notsupport.http-method',
        caused_by:
          "Caused by: org.springframework.web.HttpRequestMethodNotSupportedException: Request method 'GET' is not supported",
        service_point: [
          'at feasta.backend.template.application.service.impl.CertificationManageServiceImpl.uploadCertification(CertificationManageServiceImpl.java:60) ~[!/:1.1.0]',
        ],
      },
    },
  ] as ErrorLogResponse[]);
  // const errorLog = await http.get<ErrorLogResponse>('/log');

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        overflow: 'hidden',
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
        data={fullErrorLogs.content as BaseErrorLog[]}
        pageSize={fullErrorLogs.size}
        total={fullErrorLogs.totalElements}
      />
    </div>
  );
}

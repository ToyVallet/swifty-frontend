import { v4 as uuidv4 } from 'uuid';

import { isServer } from './device';
import http from './http';

type Source = 'CLIENT' | 'SERVER';

export interface BaseErrorLog extends Record<string, unknown> {
  source: Source;
  trackingId: string;
  time: string;
  path: string;
  message: string;
  host: string;
}

interface ClientSpecificErrorLogField {
  userAgent: string;
}

export interface ServerSpecificErrorLogField {
  statusCode: number;
  status: string;
  code: string;
  traceLog: {
    errorPoint: string;
    errorCode: string;
    causedBy: string;
    servicePoint: string[];
  };
}

export type ErrorLogResponse = BaseErrorLog &
  (Partial<ClientErrorLog> | Partial<ServerErrorLog>);

export type ClientErrorLog = BaseErrorLog & ClientSpecificErrorLogField;
export type ServerErrorLog = BaseErrorLog & ServerSpecificErrorLogField;

export type NextError = Error & { digest?: string };

export const isClientLog = (
  data: ErrorLogResponse | undefined,
): data is ClientErrorLog => {
  return data?.source === 'CLIENT';
};

export const isServerLog = (
  data: ErrorLogResponse | undefined,
): data is ServerErrorLog => {
  return data?.source === 'SERVER';
};

export const sendErrorLog = async (error: NextError) => {
  if (isServer()) return;

  const { pathname, host, search } = location;
  const path = `${pathname}${search}`;
  const userAgent = navigator.userAgent;
  const time = new Date().toISOString();
  const trackingId = error.digest || uuidv4().replace(/-/g, '').slice();
  const { message } = error;

  const log: ClientErrorLog = {
    source: 'CLIENT',
    trackingId,
    time,
    message,
    userAgent: userAgent,
    path,
    host,
  };

  const { NODE_ENV } = process.env;

  if (NODE_ENV === 'production') await http.post('/log', log);
  else console.error(log);
};

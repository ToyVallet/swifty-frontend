import { isServer } from './device';
import http from './http';

export interface ClientErrorLog extends Record<string, string> {
  source: 'client';
  tracking_id: string;
  time: string;
  path: string;
  message: string;
  host: string;
  user_agent: string;
}

export type NextError = Error & { digest?: string };

export const sendErrorLog = async (error: NextError) => {
  if (isServer()) return;
  const { pathname, host, search } = location;
  const url = `${pathname}${search}`;
  const userAgent = navigator.userAgent;
  const time = new Date().toISOString();
  const trackingId = error.digest || Date.now().toString().slice(0, 10);
  const { message } = error;

  const log: ClientErrorLog = {
    source: 'client',
    tracking_id: trackingId,
    time,
    message,
    user_agent: userAgent,
    path: url,
    host,
  };

  if (process.env.NODE_ENV === 'development') console.error(log);
  await http.post('/log', log);
};

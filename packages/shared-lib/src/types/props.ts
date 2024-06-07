import { PropsWithChildren } from 'react';

export type Params<P extends Record<string, any>> = {
  params: P;
};

export type SearchParams<P extends Record<string, any>> = {
  searchParams: P;
};

export type PropsWithClassName<P = unknown> = PropsWithChildren<
  P & { className?: string }
>;

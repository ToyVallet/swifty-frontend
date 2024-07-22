export type KeyOf<T> = keyof T;

export type ValueOf<T> = T[KeyOf<T>];

export type DeepValueOf<T> = T extends object
  ? ValueOf<{ [K in keyof T]: DeepValueOf<T[K]> }>
  : T;

export type NonEmptyArray<T> = [T, ...T[]];

export type Pageable<T> = {
  content: T[];
  hasNext: boolean;
  totalPages: number;
  totalElements: number;
  page: number;
  size: number;
  first: boolean;
  last: boolean;
};

export type KeyOf<T> = keyof T;

export type ValueOf<T> = T[KeyOf<T>];

export type DeepValueOf<T> = T extends object
  ? ValueOf<{ [K in keyof T]: DeepValueOf<T[K]> }>
  : T;

export type NonEmptyArray<T> = [T, ...T[]];

export type ValueOf<T> = T[keyof T];

export type DeepValueOf<T> = T extends object
  ? ValueOf<{ [K in keyof T]: DeepValueOf<T[K]> }>
  : T;

export type NonEmptyArray<T> = [T, ...T[]];
export type NonEmptyArrayReadOnly<T> = readonly [T, ...T[]];

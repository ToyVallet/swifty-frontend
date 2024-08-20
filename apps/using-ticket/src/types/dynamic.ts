import type { FixedLengthArray } from '@swifty/shared-lib';

export type DynamicSendSms = {
  id: string;
  codes: FixedLengthArray<string, 6>;
};

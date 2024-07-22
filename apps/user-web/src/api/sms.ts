'use server';

import { type SmsSituationCode, assert, http } from '@swifty/shared-lib';

const assertPhoneNumber = (phoneNumber: string) => {
  const regex = /010-?\d{3,4}-?\d{4}$/;
  assert(regex.test(phoneNumber), '올바른 휴대폰 번호를 입력해주세요');
};

export const sendSms = async (
  phoneNumber: string,
  smsSituationCode: SmsSituationCode,
) => {
  assertPhoneNumber(phoneNumber);

  await http.post(
    '/sms/code',
    {
      phoneNumber,
      smsSituationCode,
    },
    {
      credentials: smsSituationCode.includes('CHANGE') ? 'include' : undefined,
    },
  );
};

export const checkSmsCode = async (
  code: string,
  phoneNumber: string,
  situationCode: SmsSituationCode,
) => {
  assertPhoneNumber(phoneNumber);

  await http.post(
    '/sms/code/check',
    {
      code,
      phoneNumber,
      situationCode,
    },
    { credentials: situationCode.includes('CHANGE') ? 'include' : undefined },
  );
};

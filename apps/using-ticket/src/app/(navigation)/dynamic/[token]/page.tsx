import { Instruction, NumberButtonGroup } from '@components';
import { type Params, http } from '@swifty/shared-lib';
import type { DynamicSendSms } from 'src/types';

export default async function QrCheckPage({
  params: { token },
}: Params<{ token: string }>) {
  const data = await http.get<DynamicSendSms>(
    '/host/admin/entrance/dynamic/send-sms/{id}',
    {
      params: { id: token },
      credentials: 'include',
    },
  );

  return (
    <div>
      <NumberButtonGroup {...data} />
      <Instruction>{'SMS로 발송된 인증번호를\n선택해주세요'}</Instruction>
    </div>
  );
}

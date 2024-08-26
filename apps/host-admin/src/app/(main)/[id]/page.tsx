import { Modal } from '@components';
import { type Params, http } from '@swifty/shared-lib';
import type { UserDetailApi } from '@type';

export default async function DetailPage({
  params: { id },
}: Params<{ id: string }>) {
  const data = await http.get<UserDetailApi>(
    '/host/admin/certification/answer/{id}',
    {
      params: { id },
      credentials: 'include',
    },
  );

  return <Modal {...data} />;
}

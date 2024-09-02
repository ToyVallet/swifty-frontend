import { Modal } from '@components';
import { type Params, http } from '@swifty/shared-lib';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import type { UserDetailApi } from '@type';

export default async function DetailPage({
  params: { id },
}: Params<{ id: string }>) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [id],
    queryFn: async () =>
      await http.get<UserDetailApi>('/host/admin/certification/answer/{id}', {
        params: { id },
        credentials: 'include',
      }),
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <Modal id={id} />
    </HydrationBoundary>
  );
}

import { HomeTable, columns } from '@components';
import { getCookie, http } from '@swifty/shared-lib';
import {
  HydrationBoundary,
  QueryClient,
  type QueryFunction,
  dehydrate,
} from '@tanstack/react-query';
import type { TableAPI } from '@type';
import { redirect } from 'next/navigation';

export const fetchTable: QueryFunction<
  TableAPI,
  [string, number, number, string, string],
  number
> = async ({ queryKey }) => {
  const token = await getCookie('accessToken');
  if (!token) redirect('/login');

  const [, size, page, filter, search] = queryKey;

  const table = await http.get<TableAPI>('/host/admin/certification/answer', {
    query: {
      size: `${size}`,
      page: search !== '' ? `${0}` : `${page}`,
      answerStatus: `${filter}`,
      keyword: `${search}`,
    },
    credentials: 'include',
  });
  return table;
};

export default async function MainTable() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['table', 10, 0, '', ''],
    queryFn: fetchTable,
  });
  const dehydratedState = dehydrate(queryClient);
  return (
    <div className="w-full h-full px-10 py-5 flex flex-col">
      <HydrationBoundary state={dehydratedState}>
        <HomeTable columns={columns} />
      </HydrationBoundary>
    </div>
  );
}

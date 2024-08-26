import { HomeTable, columns } from '@components';
import { getCookie, http } from '@swifty/shared-lib';
import type { TableAPI } from '@type';
import { redirect } from 'next/navigation';

export async function fetchTable() {
  const token = await getCookie('accessToken');
  if (!token) redirect('/login');

  const table = await http.get<TableAPI>('/host/admin/certification/answer', {
    query: { size: '10' },
    credentials: 'include',
  });
  return table;
}

export default async function MainTable() {
  const table = await fetchTable();
  return (
    <div className="w-full h-full px-10 py-5 flex flex-col">
      <HomeTable
        columns={columns}
        data={table.content}
        currentPage={table.page}
        pageCount={table.totalPages}
      />
    </div>
  );
}

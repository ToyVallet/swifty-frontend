import { HomeTable, columns } from '@components';
import { http } from '@swifty/shared-lib';
import type { TableAPI } from '@type';

export default async function MainTable() {
  const table = await http.get<TableAPI>('/host/admin/certification/answer', {
    query: { size: '10' },
    credentials: 'include',
  });

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

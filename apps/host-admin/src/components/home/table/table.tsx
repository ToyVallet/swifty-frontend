'use client';

import { HomeTableHeader, Pagination, TableContent } from '@components';
import { usePagination } from '@hooks';
import { QueryClient, useQuery } from '@tanstack/react-query';
import {
  type ColumnDef,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { fetchTable } from 'src/components/home/home';

import type { Filter } from './header/filter-button-group';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
}

export default function DataTable<TData, TValue>({
  columns,
}: DataTableProps<TData, TValue>) {
  const [filter, setFilter] = useState<Filter>('ALL');
  const [search, setSearch] = useState('');
  const router = useRouter();
  const [queryClient] = React.useState(() => new QueryClient());
  const { pagination, onPaginationChange } = usePagination();

  const {
    data: tableData,
    isLoading,
    error,
  } = useQuery({
    queryKey: [
      'table',
      pagination.pageSize,
      pagination.pageIndex,
      filter === 'ALL' ? '' : filter,
      search,
    ],
    queryFn: fetchTable,
  });

  const table = useReactTable<TData>({
    data: (tableData?.content as TData[]) || [],
    columns,
    pageCount: tableData?.totalPages || 0,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    onPaginationChange,
    state: {
      pagination,
    },
  });

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['table'] });
  }, [router]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <>
      <HomeTableHeader filter={filter} setFilter={setFilter} />

      <div className="mt-5">
        {/* Pagination Controls */}
        <Pagination table={table} />

        {/* TABLE */}
        <TableContent table={table} columns={columns} />
      </div>
    </>
  );
}

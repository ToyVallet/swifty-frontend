'use client';

import { HomeTableHeader, Pagination, TableContent } from '@components';
import { usePagination } from '@hooks';
import { http } from '@swifty/shared-lib';
import {
  type ColumnDef,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import type { AnswerStatus, TableAPI } from '@type';
import React, { useEffect, useState } from 'react';

import type { Filter } from './header/filter-button-group';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageCount: number;
  currentPage: number;
}

export default function DataTable<TData, TValue>({
  columns,
  data,
  pageCount,
}: DataTableProps<TData, TValue>) {
  const [tableData, setData] = useState(data);
  const [filter, setFilter] = useState<Filter>('ALL');
  const [pageCountState, setPageCountState] = useState(pageCount);
  const { pagination, onPaginationChange } = usePagination();
  const table = useReactTable<TData>({
    data: tableData,
    columns,
    pageCount: pageCountState,
    getCoreRowModel: getCoreRowModel(),

    manualPagination: true, // 수동으로 페이지네이션 처리
    onPaginationChange,
    state: {
      pagination,
    },
  });

  useEffect(() => {
    const fetchData = async (page: number) => {
      const query: {
        page: string;
        answerStatus?: AnswerStatus;
        size?: string;
      } = {
        page: page.toString(),
        size: `${table.getState().pagination.pageSize}`,
      };

      if (filter !== 'ALL') {
        query.answerStatus = filter; // 필터 값이 ALL이 아니면 쿼리에 추가
      }

      const result = await http.get<TableAPI>(
        `/host/admin/certification/answer`,
        {
          query,
          credentials: 'include',
        },
      );

      table.setPageIndex(result.page);
      setPageCountState(result.totalPages);
      setData(result.content as TData[]);
    };
    fetchData(pagination.pageIndex);
  }, [pagination.pageIndex, filter, pagination.pageSize]);

  return (
    <>
      <HomeTableHeader filter={filter} setFilter={setFilter} />

      <div className="mt-5">
        {/* TABLE */}
        <TableContent table={table} columns={columns} />
        {/* Pagination Controls */}
        <Pagination table={table} />
      </div>
    </>
  );
}

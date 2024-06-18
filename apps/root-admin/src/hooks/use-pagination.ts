'use client';

import { customFetch } from '@swifty/shared-lib';
import type { Paginaiton } from '@type';
import type { UserRole } from '@type';
import { useState } from 'react';

interface Prop<T> {
  pageSize: number;
  total: number;
  setTableData: React.Dispatch<React.SetStateAction<T[]>>;
  api: (page?: number, size?: number, role?: UserRole) => string;
}

export default function usePagination<T>({
  pageSize,
  total,
  setTableData,
  api,
}: Prop<T>) {
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize,
    total,
  });
  const [loading, setLoading] = useState(false);

  // 페이지 변경에 따른 데이터 업데이트
  const handleTableChange = async (page: number, pageSize: number) => {
    setLoading(true);
    const data = await customFetch<Paginaiton<T>>(api(page - 1, pageSize));
    setTableData(data.content);
    setPagination({
      ...pagination,
      current: page,
      pageSize,
    });
    setLoading(false);
  };
  return { pagination, loading, handleTableChange };
}

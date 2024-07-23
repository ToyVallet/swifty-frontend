'use client';

import { NotificationHandlerContext } from '@components';
import { type Pageable, type RemoteKeys, http } from '@swifty/shared-lib';
import { useContext, useState } from 'react';

interface Prop<T> {
  pageSize: number;
  total: number;
  setTableData: React.Dispatch<React.SetStateAction<T[]>>;
  api: RemoteKeys;
  source?: 'CLIENT' | 'SERVER' | '';
}

export default function usePagination<T>({
  pageSize,
  total,
  setTableData,
  api,
  source = '',
}: Prop<T>) {
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize,
    total,
  });
  const [loading, setLoading] = useState(false);
  const handleNotification = useContext(NotificationHandlerContext);

  // 페이지 변경에 따른 데이터 업데이트
  const handleTableChange = async (page: number, pageSize: number) => {
    setLoading(true);
    try {
      const data = await http.get<Pageable<T>>(api, {
        query: {
          page: `${page - 1}`,
          size: `${pageSize}`,
          source,
        },
        credentials: 'include',
      });
      /* const data = await customFetch<Paginaiton<T>>(api(page - 1, pageSize)); */
      setTableData(data.content);
      setPagination({
        ...pagination,
        current: page,
        pageSize,
      });
    } catch (err) {
      handleNotification(
        {
          message: 'page를 불러오는 것에 실패했습니다!',
          description: '다시 시도해주세요!',
          placement: 'topRight',
        },
        'error',
      );
    } finally {
      setLoading(false);
    }
  };
  return { pagination, loading, handleTableChange };
}

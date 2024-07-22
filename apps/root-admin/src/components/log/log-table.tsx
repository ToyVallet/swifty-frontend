'use client';

import { usePagination } from '@hooks';
import { type BaseErrorLog } from '@swifty/shared-lib';
import type { TableProps } from 'antd';
import { Table } from 'antd';
import { useState } from 'react';

interface Props {
  data: BaseErrorLog[];
  pageSize: number;
  total: number;
}

const columns: TableProps<BaseErrorLog>['columns'] = [
  {
    title: '구분',
    dataIndex: 'source',
    key: 'source',
  },
  { title: '발생 위치', dataIndex: 'path', key: 'path' },
  { title: '메시지', dataIndex: 'message', key: 'message' },
  { title: '시각', dataIndex: 'time', key: 'time' },
  { title: '트래킹 아이디', dataIndex: 'trackingId', key: 'trackingId' },
];

function LogTable({ data, pageSize, total }: Props) {
  const [tableData, setTableData] = useState<BaseErrorLog[]>(data);
  const { pagination, loading, handleTableChange } =
    usePagination<BaseErrorLog>({
      pageSize,
      total,
      setTableData,
      api: '/log',
    });

  return (
    <section>
      <Table
        columns={columns}
        dataSource={tableData}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          showSizeChanger: true,
          size: 'small',
          showTotal: (total) => `Total ${total} items`,
          onChange: (page, pageSize) => handleTableChange(page, pageSize),
        }}
        loading={loading}
        rowKey="trackingId"
      />
    </section>
  );
}

export default LogTable;

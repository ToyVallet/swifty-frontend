'use client';

import type { MultipleLogs } from '@app/(dashboard)/page';
import { usePagination } from '@hooks';
import type { TableProps } from 'antd';
import { Table } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { useState } from 'react';
import { LogBadge } from 'src/components/log';

dayjs.locale('ko');

interface Props {
  data: MultipleLogs[];
  pageSize: number;
  total: number;
}

const columns: TableProps<MultipleLogs>['columns'] = [
  {
    title: '구분',
    dataIndex: 'source',
    key: 'id',
    filters: [
      { text: 'CLIENT', value: 'CLIENT' },
      { text: 'SERVER', value: 'SERVER' },
    ],
    onFilter: (value, record) => record.source === value,
    render: (value, record, index) => (
      <LogBadge key={record.id} value={record.source} />
    ),
  },
  {
    title: '발생 위치',
    dataIndex: 'path',
    key: 'path',
    render: (_, record) => (
      <span>
        {record.host}
        {record.path}
      </span>
    ),
  },
  { title: '메시지', dataIndex: 'message', key: 'message' },
  {
    title: '시각',
    dataIndex: 'time',
    key: 'time',
    sorter: (a, b) => {
      const dateA = new Date(a.time);
      const dateB = new Date(b.time);
      return dateA.getTime() - dateB.getTime();
    },
    render: (value, record) => (
      <div>{dayjs(record.time).format('YYYY. MM. DD ddd HH:mm:ss')}</div>
    ),
  },
  { title: '트래킹 아이디', dataIndex: 'trackingId', key: 'trackingId' },
];

function LogTable({ data, pageSize, total }: Props) {
  const [tableData, setTableData] = useState<MultipleLogs[]>(data);
  const { pagination, loading, handleTableChange } =
    usePagination<MultipleLogs>({
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
        style={{ userSelect: 'text' }}
        loading={loading}
        rowKey="id"
      />
    </section>
  );
}

export default LogTable;

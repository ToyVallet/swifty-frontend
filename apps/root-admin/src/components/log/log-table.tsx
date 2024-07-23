'use client';

import type { MultipleLogs } from '@app/(dashboard)/page';
import { usePagination } from '@hooks';
import { type ErrorLogResponse, http } from '@swifty/shared-lib';
import type { TableProps } from 'antd';
import { Row, Table } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { useRef, useState } from 'react';
import LogSourceToggle from 'src/components/log/log-source-toggle';

import LogBadge from './badge';
import LogDetailDrawer from './log-detail-drawer';
import styles from './log-table.module.css';

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
    render: (value, record, index) => (
      <LogBadge key={record.id} value={record.source} />
    ),
  },
  { title: '메시지', dataIndex: 'message', key: 'message' },
  { title: '트래킹 아이디', dataIndex: 'trackingId', key: 'trackingId' },
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
];

function LogTable({ data, pageSize, total }: Props) {
  const [tableData, setTableData] = useState<MultipleLogs[]>(data);
  const [source, setSource] = useState<'' | 'CLIENT' | 'SERVER'>('');
  const { pagination, loading, handleTableChange } =
    usePagination<MultipleLogs>({
      pageSize,
      total,
      setTableData,
      source,
      api: '/log',
    });
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const detailInfo = useRef<ErrorLogResponse>();

  const onClick = async (id: string) => {
    const data = await http.get<ErrorLogResponse>('/log/{id}', {
      credentials: 'include',
      params: { id },
    });
    showDrawer();
    detailInfo.current = data;
  };

  return (
    <section>
      <Row>
        <LogSourceToggle setSource={setSource} source="" />
      </Row>

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
        rowClassName={styles.row}
        onRow={(record) => ({
          onClick: async () => {
            await onClick(record.id);
          },
        })}
        loading={loading}
        rowKey="id"
      />
      <LogDetailDrawer
        open={open}
        onClose={onClose}
        detailLogInfo={detailInfo.current}
      />
    </section>
  );
}

export default LogTable;

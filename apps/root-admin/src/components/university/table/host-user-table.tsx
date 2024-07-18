'use client';

import type { UniversityHostUser } from '@type';
import type { TableProps } from 'antd';
import { Table } from 'antd';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import styles from './host-user-table.module.css';

interface Props {
  data: UniversityHostUser[];
}

const columns: TableProps<UniversityHostUser>['columns'] = [
  {
    title: '아이디',
    dataIndex: 'userFormId',
    key: 'userFormId',
  },
  {
    title: '휴대폰',
    dataIndex: 'phone',
    key: 'phone',
  },
];

function HostUserTable({ data }: Props) {
  const [tableData, setTableData] = useState<UniversityHostUser[]>(data);
  const router = useRouter();

  const onClickRow = (record: UniversityHostUser) => {
    router.push(`/user/${record.subUserId}`);
  };

  useEffect(() => {
    setTableData(data);
  }, [data]);

  return (
    <section>
      <Table
        columns={columns}
        dataSource={tableData}
        rowKey="id"
        onRow={(record) => ({
          onClick: () => onClickRow(record),
        })}
        rowClassName={styles.row}
        pagination={false}
      />
    </section>
  );
}

export default HostUserTable;

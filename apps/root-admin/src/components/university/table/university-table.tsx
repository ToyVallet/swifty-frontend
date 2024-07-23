'use client';

import { usePagination } from '@hooks';
import School from '@icons/school.svg';
import type { University } from '@type';
import type { TableProps } from 'antd';
import { Avatar, Table } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import styles from './university-table.module.css';

interface Props {
  data: University[];
  pageSize: number;
  total: number;
}

const columns: TableProps<University>['columns'] = [
  {
    title: '로고',
    dataIndex: 'logo',
    key: 'logo',
    render: (_, record) => (
      <Avatar
        src={
          record.logo && (
            <Image src={record.logo} alt="avatar" width={50} height={50} />
          )
        }
        icon={!record.logo && <School />}
      />
    ),
  },
  {
    title: '이름',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '주소',
    dataIndex: 'addr',
    key: 'addr',
  },
];

function UniversityTable({ data, pageSize, total }: Props) {
  const router = useRouter();
  const [tableData, setTableData] = useState<University[]>(data);
  const { pagination, loading, handleTableChange } = usePagination<University>({
    pageSize,
    total,
    setTableData,
    api: '/root/admin/university',
  });
  const onClickRow = (record: University) => {
    router.push(`/university/${record.id}`);
  };

  useEffect(() => {
    setTableData(data);
  }, [data]);

  return (
    <section>
      <Table
        rowClassName={styles.row}
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
        onRow={(record) => ({
          onClick: (e) => {
            e.stopPropagation();
            e.preventDefault();
            onClickRow(record);
          },
        })}
        rowKey="id"
      />
    </section>
  );
}

export default UniversityTable;

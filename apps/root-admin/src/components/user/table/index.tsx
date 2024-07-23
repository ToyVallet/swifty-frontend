'use client';

import { DefaultTag, GenderTag, LoginTag, StatusTag } from '@components';
import { usePagination } from '@hooks';
import type { User, UserEnrolled, UserGender, UserStatus } from '@type';
import type { TableProps } from 'antd';
import { Table } from 'antd';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import styles from './table.module.css';

interface Props {
  data: User[];
  pageSize: number;
  total: number;
}

const columns: TableProps<User>['columns'] = [
  {
    title: '이름',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '전화번호',
    dataIndex: 'phoneNumber',
    key: 'phoneNumber',
  },
  {
    title: '아이디',
    dataIndex: 'loginId',
    key: 'loginId',
  },
  {
    title: '생일',
    dataIndex: 'dateOfBirth',
    key: 'dateOfBirth',
  },
  {
    title: '성별',
    dataIndex: 'gender',
    key: 'gender',
    render: (value: UserGender) => <GenderTag gender={value} />,
  },
  {
    title: '권한',
    dataIndex: 'userRole',
    key: 'userRole',
    render: (value: string) => <DefaultTag value={value} />,
  },
  {
    title: '로그인 타입',
    dataIndex: 'enrolled',
    key: 'enrolled',
    render: (value: UserEnrolled) => <LoginTag type={value} />,
  },
  {
    title: '유저 상태',
    dataIndex: 'status',
    key: 'status',
    render: (value: UserStatus) => <StatusTag status={value} />,
  },
];

function UserTable({ data, pageSize, total }: Props) {
  const router = useRouter();
  const [tableData, setTableData] = useState<User[]>(data);
  const { pagination, loading, handleTableChange } = usePagination<User>({
    pageSize,
    total,
    setTableData,
    api: '/root/admin/user',
  });

  const onClickRow = (record: User) => {
    router.push(`user/${record.id}`);
  };

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
        onRow={(record) => ({
          onClick: () => onClickRow(record),
        })}
        rowClassName={styles.row}
        rowKey="userId"
      />
    </section>
  );
}

export default UserTable;

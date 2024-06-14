'use client';

import { DefaultTag, GenderTag, LoginTag, StatusTag } from '@components';
import { API_CLIENT } from '@lib';
import type { User, UserEnrolled, UserGender, UserStatus } from '@type';
import type { TableProps } from 'antd';
import { Table } from 'antd';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import usePagination from 'src/hook/usePagination';

import styles from './table.module.css';

interface Props {
  data: User[];
  pageSize: number;
  total: number;
}

const columns: TableProps<User>['columns'] = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Phone',
    dataIndex: 'phoneNumber',
    key: 'phoneNumber',
  },
  {
    title: 'ID',
    dataIndex: 'userFormId',
    key: 'userFormId',
  },
  {
    title: 'Birth Of Date',
    dataIndex: 'bod',
    key: 'bod',
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    key: 'gender',
    render: (value: UserGender) => <GenderTag gender={value} />,
  },
  {
    title: 'User Role',
    dataIndex: 'userRole',
    key: 'userRole',
    render: (value: string) => <DefaultTag value={value} />,
  },
  {
    title: 'Login Type',
    dataIndex: 'enrolled',
    key: 'enrolled',
    render: (value: UserEnrolled) => <LoginTag type={value} />,
  },
  {
    title: 'User Status',
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
    api: API_CLIENT.users,
  });

  const onClickRow = (record: User) => {
    router.push(`user/${record.userSubId}`);
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
        rowKey="userSubId"
      />
    </section>
  );
}

export default UserTable;

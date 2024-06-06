'use client';

import { customFetch } from '@/app/api';
import { User, UserApi } from '@/app/types/user';
import { API_CLIENT } from '@/constant';
import { Table } from 'antd';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

interface Props {
  data: User[];
  pageSize: number;
  total: number;
}

function CustomTable({ data, pageSize, total }: Props) {
  const columns = Object.keys(data[0])
    .map((name) => ({
      title: name.toUpperCase(),
      dataIndex: name,
      key: name,
    }))
    .filter((obj) => obj.key !== 'userSubId');
  const router = useRouter();
  const [tableData, setTableData] = useState<User[]>(data);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize,
    total,
  });
  const [loading, setLoading] = useState(false);

  const handleTableChange = async (page: number, pageSize: number) => {
    setLoading(true);
    const data = await customFetch<UserApi>(
      API_CLIENT.hosts(undefined, page - 1, pageSize),
    );
    setTableData(data.content);
    setPagination({
      ...pagination,
      current: page,
      pageSize,
    });
    setLoading(false);
  };

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
        rowKey="userSubId"
      />
    </section>
  );
}

export default CustomTable;

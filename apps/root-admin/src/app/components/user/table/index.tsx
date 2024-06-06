'use client';

import { customFetch } from '@/app/api';
import { User, UserApi } from '@/app/types/user';
import { API_CLIENT } from '@/constant';
import { Pagination, Table } from 'antd';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import styles from './table.module.css';

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
      API_CLIENT.hosts(undefined, page - 1),
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
    <section className={styles.container}>
      <Table
        columns={columns}
        dataSource={tableData}
        pagination={false}
        loading={loading}
        onRow={(record) => ({
          onClick: () => onClickRow(record),
        })}
        rowKey="userSubId"
      />
      <Pagination
        className={styles.pagenation}
        current={pagination.current}
        pageSize={pagination.pageSize}
        total={pagination.total}
        onChange={handleTableChange}
        showSizeChanger
        size="small"
        showQuickJumper
        showTotal={(total) => `Total ${total} items`}
        responsive
      />
    </section>
  );
}

export default CustomTable;

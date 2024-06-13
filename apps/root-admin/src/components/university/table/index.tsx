'use client';

import { DrawerButton } from '@components/ui';
import {
  UniversityLogoUpdateForm,
  UniversityUpdateForm,
} from '@components/university';
import { API_UNIVERSITY } from '@lib/constant/api';
import { customFetch, revalidate } from '@swifty/shared-lib';
import type { University } from '@type/university';
import type { TableProps } from 'antd';
import { Button, Popconfirm, Table } from 'antd';
import Link from 'next/link';
import { useState } from 'react';
import usePagination from 'src/hook/usePagination';

interface Props {
  data: University[];
  pageSize: number;
  total: number;
}

const columns: TableProps<University>['columns'] = [
  {
    title: '이름',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '대학 정보 수정',
    dataIndex: 'patch',
    key: 'patch',
    render: (_, record) => (
      <DrawerButton variant="university-update">
        <UniversityUpdateForm university={record} />
      </DrawerButton>
    ),
  },
  {
    title: '대학 로고 수정',
    dataIndex: 'logo_patch',
    key: 'logo_patch',
    render: (_, record) => (
      <DrawerButton variant="university-logo-update">
        <UniversityLogoUpdateForm university={record} />
      </DrawerButton>
    ),
  },
  {
    title: '상세 페이지',
    dataIndex: 'detail',
    key: 'detail',
    render: (_, record) => (
      <Button>
        <Link href={`/university/${record.subId}`}>상세 페이지</Link>
      </Button>
    ),
  },
  {
    title: '삭제',
    dataIndex: 'delete',
    key: 'delete',
    render: (_, record) => (
      <Popconfirm
        title="계정 삭제"
        description="해당 계정을 삭제하시겠습니까?"
        okText="확인"
        okType="danger"
        cancelText="취소"
        onConfirm={async () => {
          await customFetch(API_UNIVERSITY.detail_universiry(record.subId), {
            method: 'DELETE',
          });
          await revalidate('university');
        }}
      >
        <Button type="primary" danger>
          대학 삭제
        </Button>
      </Popconfirm>
    ),
  },
];

function UniversityTable({ data, pageSize, total }: Props) {
  const [tableData, setTableData] = useState<University[]>(data);
  const { pagination, loading, handleTableChange } = usePagination<University>({
    pageSize,
    total,
    setTableData,
    api: API_UNIVERSITY.get_univiresity,
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
        rowKey="userSubId"
      />
    </section>
  );
}

export default UniversityTable;

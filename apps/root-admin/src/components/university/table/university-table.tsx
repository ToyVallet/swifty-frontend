'use client';

import {
  DeleteButton,
  DrawerButton,
  UniversityLogoUpdateForm,
  UniversityUpdateForm,
} from '@components';
import School from '@icons/school.svg';
import { API_UNIVERSITY } from '@lib';
import { customFetch, revalidate } from '@swifty/shared-lib';
import type { University } from '@type';
import type { TableProps } from 'antd';
import { Avatar, Button, Table } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import usePagination from 'src/hook/usePagination';

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
      <DeleteButton
        title="계정 삭제"
        description="해당 계정을 삭제하시겠습니까?"
        onConfirm={async () => {
          await customFetch(
            API_UNIVERSITY.patch_delete_universiry(record.subId),
            {
              method: 'DELETE',
            },
          );
          await revalidate('university');
        }}
      >
        삭제
      </DeleteButton>
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

  useEffect(() => {
    setTableData(data);
  }, [data]);

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
        rowKey="subId"
      />
    </section>
  );
}

export default UniversityTable;

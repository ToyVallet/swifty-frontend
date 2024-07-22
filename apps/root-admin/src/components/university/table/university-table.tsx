'use client';

import {
  DeleteButton,
  DrawerButton,
  UniversityLogoUpdateForm,
  UniversityUpdateForm,
} from '@components';
import { usePagination } from '@hooks';
import School from '@icons/school.svg';
import { http, revalidate } from '@swifty/shared-lib';
import type { University } from '@type';
import type { TableProps } from 'antd';
import { Avatar, Button, Table } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import styles from './university-table.module.css';

interface Props {
  data: University[];
  pageSize: number;
  total: number;
}

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
      title: '삭제',
      dataIndex: 'delete',
      key: 'delete',
      render: (_, record) => (
        <DeleteButton
          title="계정 삭제"
          description="해당 대학을 삭제하시겠습니까?"
          onConfirm={async () => {
            await http.delete('/root/admin/university/{id}', {
              credentials: 'include',
              params: { id: record.id },
            });

            await revalidate('university');
          }}
        >
          삭제
        </DeleteButton>
      ),
    },
    {
      title: '상세페이지',
      dataIndex: 'link',
      key: 'link',
      render: (_, record) => (
        <Button
          onClick={() => {
            onClickRow(record);
          }}
        >
          상세 페이지
        </Button>
      ),
    },
  ];

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
        /*         onRow={(record) => ({
          onClick: (e) => {
            e.stopPropagation();
            e.preventDefault();
            onClickRow(record);
          },
        })} */
        rowKey="id"
      />
    </section>
  );
}

export default UniversityTable;

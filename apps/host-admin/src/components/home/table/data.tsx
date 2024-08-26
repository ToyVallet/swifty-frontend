'use client';

import type { ColumnDef } from '@tanstack/react-table';
import { type Table } from '@type';
import Link from 'next/link';
import CertificationStatus from 'src/components/home/table/certification-status';

export const columns: ColumnDef<Table>[] = [
  {
    accessorKey: 'ocrNameData',
    header: '이름',
  },
  {
    accessorKey: 'ocrStudentIdData',
    header: '학번',
  },
  {
    accessorKey: 'ocrMajorData',
    header: '학과',
  },
  {
    accessorKey: 'ocrStudentStatusData',
    header: '재학 상태',
    cell: ({ row }) => {
      if (row.original.ocrStudentStatusData === 'STUDENT') return '재학생';
      if (row.original.ocrStudentStatusData === 'DROP_OUT') return '휴학생';
      if (row.original.ocrStudentStatusData === 'GRADUATE') return '졸업생';
      if (row.original.ocrStudentStatusData === 'POST_GRADUATE')
        return '대학원생';
    },
  },
  {
    accessorKey: 'id',
    header: '서류 확인',
    cell: ({ row }) => <LinkDetail id={row.original.id} />,
  },
  {
    accessorKey: 'answerStatus',
    header: '인증 처리',
    cell: ({ row }) => (
      <CertificationStatus status={row.original.answerStatus} />
    ),
  },
];

function LinkDetail({ id }: { id: string }) {
  return (
    <Link
      className="py-2 px-4 text-16 text-white font-bold rounded-xl bg-primary"
      href={`/detail/${id}`}
    >
      서류 확인
    </Link>
  );
}

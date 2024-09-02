'use client';

import { cn } from '@swifty/shared-lib';
import type { ComponentPropsWithoutRef } from 'react';
import { toast } from 'sonner';

function FilterButton({
  className,
  text,
  ...props
}: ComponentPropsWithoutRef<'button'> & {
  text: string;
}) {
  return (
    <button
      className={cn(
        'w-[82px] h-[31px] text-center text-14 text-swifty-color-400 font-semibold rounded-2xl border-[0.5px] border-swifty-color-400',
        className,
      )}
      {...props}
    >
      {text}
    </button>
  );
}

export type Filter = 'PENDING' | 'ALL' | 'APPROVED' | 'REJECTED';
type Props = {
  filter: Filter;
  setFilter: (filter: Filter) => void;
  setSearch: (value: string) => void;
};

const ButtonText: { [key in Filter]: string } = {
  ALL: '전체',
  APPROVED: '승인완료',
  REJECTED: '반려처리',
  PENDING: '대기중',
};
export default function FilterButtonGroup({
  filter,
  setFilter,
  setSearch,
}: Props) {
  const onClick = async (key: Filter) => {
    setFilter(key);
    // 테이블 api 업로드
  };

  return (
    <div className="flex gap-2.5">
      {Object.entries(ButtonText).map(([key, text]) => (
        <FilterButton
          onClick={async () => {
            await onClick(key as Filter);
          }}
          key={key}
          text={text}
          className={key === filter ? 'text-white border-none bg-primary' : ''}
        />
      ))}
      <FilterButton
        onClick={() => {
          setSearch('');
          toast.info('검색어가 초기화 되었습니다.');
        }}
        text={'검색 초기화'}
        className="w-[100px]"
      />
    </div>
  );
}

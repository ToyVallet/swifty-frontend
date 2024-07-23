'use client';

import useDebounce from '@hooks/use-debounce';
import { APIError } from '@swifty/shared-lib';
import { Input } from '@swifty/ui';
import { AnimatePresence } from 'framer-motion';
import type { ChangeEvent, ReactNode } from 'react';
import { useState } from 'react';

// API 함수 타입 정의
type ApiFunction = (term: string) => Promise<any[]>;

type SearchProps<T extends { [key in string]: string }> = {
  fetchSearchResults: ApiFunction;
  children: (
    searchList: T[],
    selectSearchValue: (value: string) => void,
  ) => ReactNode;
};

export default function Search<T extends { [key in string]: any }>({
  fetchSearchResults,
  children,
}: SearchProps<T>) {
  const [value, setValue] = useState('');
  const [searchList, setSearchList] = useState<T[]>([]);
  const [open, setOpen] = useState(false);

  const handleSearch = useDebounce(async (term: string) => {
    try {
      const results = await fetchSearchResults(term);
      setSearchList(results);
      setOpen(true);
    } catch (e) {
      if (APIError.isAPIError(e)) {
        console.error(e.statusCode, e.message);
      }
    }
  }, 500);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    handleSearch(e.target.value);
  };

  const selectSearchValue = (value: string) => {
    setValue(value); // 필요한 경우 수정
    setOpen(false);
  };

  const onBlur = () => {
    setOpen(false);
  };

  return (
    <div
      className="flex flex-col gap-2.5"
      onBlur={onBlur}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <Input
        label="학교명"
        placeholder="OO대학교"
        name="search"
        value={value}
        onChange={handleChange}
      />
      <AnimatePresence>
        {open && children(searchList, selectSearchValue)}
      </AnimatePresence>
    </div>
  );
}

'use client';

import { Icon } from '@swifty/assets';
import { http } from '@swifty/shared-lib';
import { Button, If, Input, transition } from '@swifty/ui';
import { useDebounce } from '@toss/react';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SearchInput() {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState('');
  const [autocompleteList, setAutocompleteList] = useState<string[]>([]);

  const autocomplete = useDebounce(async () => {
    const list = await http.get<string[]>('/festival/auto-complete', {
      query: {
        keyword: searchValue,
      },
    });
    setAutocompleteList(list);
  }, 500);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchValue(value);
    if (value === '') {
      setAutocompleteList([]);
      return;
    }
    autocomplete();
  };

  const search = (value: string) => {
    router.replace(`/search?keyword=${value}`);
  };

  useEffect(() => {
    if (searchValue === '') {
      setAutocompleteList([]);
    }
  }, [searchValue]);

  return (
    <div className="flex flex-col gap-2.5 absolute top-[77px] left-5 right-5">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          search(searchValue);
        }}
      >
        <Input
          name="search"
          type="text"
          label="검색"
          placeholder="학교명을를 입력하세요"
          value={searchValue}
          onChange={handleChange}
        />
      </form>
      <AnimatePresence>
        <If condition={autocompleteList.length > 0}>
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
            }}
            transition={transition}
            className="text-white bg-swifty-color-800 rounded-xl py-3 flex flex-col items-center justify-center w-full"
          >
            {autocompleteList.map((item) => (
              <Button
                block
                key={item}
                className="py-3 px-5 w-full flex items-center justify-between"
                onClick={() => {
                  setSearchValue(item);
                  setAutocompleteList([]);
                  search(item);
                }}
                suffix={<Icon name="search" width={30} height={30} />}
              >
                {item}
              </Button>
            ))}
          </motion.div>
        </If>
      </AnimatePresence>
    </div>
  );
}

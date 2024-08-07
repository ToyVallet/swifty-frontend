'use client';

import { Search } from '@components/common';
import type {
  ApiCertification,
  UniversitySearch,
} from '@lib/types/certification';
import { Icon } from '@swifty/assets';
import { http } from '@swifty/shared-lib';
import { transition } from '@swifty/ui';
import { motion } from 'framer-motion';
import { useFormContext } from 'react-hook-form';

const listVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: { opacity: 1, height: 'auto' },
  exit: { opacity: 0, height: 0 },
};

type Props = {
  onChange?: (value: string) => void;
};

export default function UnivSearch({ onChange }: Props) {
  const form = useFormContext();

  const searchApi = async (keyword: string) => {
    const result = await http.get<ApiCertification>(
      '/certification/university',
      {
        query: { keyword, page: `0`, size: `20` },
        credentials: 'include',
      },
    );

    return result.content;
  };
  return (
    <Search<UniversitySearch> fetchSearchResults={searchApi}>
      {(searchList, selectSearchValue) => (
        <motion.ul
          variants={listVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={transition}
          className="w-full h-full flex flex-col rounded-xl dark:bg-swifty-color-800 bg-swifty-color-200"
        >
          {searchList.length === 0 && (
            <div className="text-center text-16 p-5">
              검색 결과가 존재하지 않습니다.
            </div>
          )}
          {searchList.map((item) => (
            <Item
              value={item.name}
              key={item.name}
              onClick={() => {
                selectSearchValue(item.name);
                onChange?.(item.id);
                form.setValue('exampleImage', item.exampleImage.url, {
                  shouldValidate: true,
                  shouldDirty: true,
                });
              }}
            />
          ))}
        </motion.ul>
      )}
    </Search>
  );
}

type ItemProps = {
  value: string;
  onClick: () => void;
};
function Item({ value, onClick }: ItemProps) {
  return (
    <li
      className="w-full text-16 font-medium py-3.5 px-5 rounded-xl hover:dark:bg-swifty-color-600 hover:bg-swifty-color-300"
      onMouseDown={onClick}
    >
      <span>{value}</span>
    </li>
  );
}

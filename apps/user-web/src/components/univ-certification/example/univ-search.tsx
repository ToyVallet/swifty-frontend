'use client';

import { Search } from '@components/common';
import Magnifier from '@icons/magnifier.svg';
import { API_CERTIFICATION } from '@lib/constants';
import type {
  ApiCertification,
  UniversitySearch,
} from '@lib/types/certification';
import { customFetch } from '@swifty/shared-lib';
import { motion } from 'framer-motion';
import { useFormContext } from 'react-hook-form';

const listVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: { opacity: 1, height: 'auto' },
  exit: { opacity: 0, height: 0 },
};

export default function UnivSearch() {
  const form = useFormContext();

  const searchApi = async (term: string) => {
    const result = await customFetch<ApiCertification>(
      API_CERTIFICATION.search(encodeURIComponent(term)),
      {
        method: 'get',
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
          transition={{ duration: 0.3 }}
          className="w-full h-full flex flex-col rounded-xl bg-swifty-color-800"
        >
          {searchList.length === 0 && (
            <div className="text-center text-16 p-5">
              검색 결과가 존재하지 않습니다.
            </div>
          )}
          {searchList.map((item) => (
            <Item
              value={item.universityName}
              key={item.universityName}
              onClick={() => {
                selectSearchValue(item.universityName);
                form.setValue('universityId', item.universityId, {
                  shouldValidate: true,
                  shouldDirty: true,
                });
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
      className="flex justify-between items-center text-16 font-medium py-3.5 px-5 rounded-xl hover:bg-swifty-color-600"
      onMouseDown={onClick}
    >
      <span>{value}</span>
      <Magnifier />
    </li>
  );
}

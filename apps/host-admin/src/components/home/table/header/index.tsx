'use client';

import FilterButtonGroup, { type Filter } from './filter-button-group';

type Props = {
  filter: Filter;
  setFilter: (filter: Filter) => void;
  setSearch: (value: string) => void;
};

export default function MainTableHeader({
  filter,
  setFilter,
  setSearch,
}: Props) {
  return (
    <>
      <div className="flex justify-between w-full items-center">
        <div className="flex items-center gap-5">
          <h1 className="text-24 font-bold">인증 요청자 명단</h1>
          <FilterButtonGroup
            filter={filter}
            setFilter={setFilter}
            setSearch={setSearch}
          />
        </div>
      </div>
    </>
  );
}

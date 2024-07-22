import { http } from '@swifty/shared-lib';
import { Choose, Otherwise, When } from '@swifty/ui';

import Item from './item';

export type SearchResult = {
  id: string;
  name: string;
  addr: string;
  startDate: string;
  endDate: string;
  description: string;
  thumbnailImagePath: string;
};

export default async function SearchResult({ keyword }: { keyword: string }) {
  const result = await http.get<SearchResult[]>('/festival/search', {
    query: {
      name: keyword,
    },
  });

  return (
    <div className="flex flex-col mt-[150px]">
      <Choose value={keyword != null && result.length === 0}>
        <When value={true}>
          <p className="text-16 font-bold text-white w-full text-center">
            {keyword}에 대한 검색 결과가 없어요
          </p>
        </When>
        <Otherwise>
          {result.map((item) => (
            <Item key={item.id} item={item} />
          ))}
        </Otherwise>
      </Choose>
    </div>
  );
}

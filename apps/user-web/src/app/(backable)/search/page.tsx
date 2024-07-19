import { Navigation } from '@components/common';
import { SearchInput, SearchResult } from '@components/search';
import { type SearchParams } from '@swifty/shared-lib';

export default function SearchPage({
  searchParams: { keyword },
}: SearchParams<{ keyword: string }>) {
  return (
    <>
      <Navigation title="검색" />
      <section className="px-2.5 pt-[27px] relative">
        <SearchInput />
        <SearchResult keyword={keyword} />
      </section>
    </>
  );
}

import { Icon } from '@swifty/assets';
import { getCookie } from '@swifty/shared-lib';
import { Choose, Otherwise, When } from '@swifty/ui';
import Link from 'next/link';

import IconLink from './icon-link';

export default async function GlobalNavigation() {
  const user = await getCookie('accessToken');

  return (
    <nav className="z-999 fixed bottom-0 left-0 right-0 flex items-center justify-evenly shadow-gnb bg-swifty-color-100 dark:bg-swifty-color-dark-bg dark:shadow-dark-gnb">
      <IconLink label="홈" link="/" iconName="home" />
      <IconLink label="카테고리" link="/category" iconName="category" />

      <div>
        <Link
          href="/ticket"
          className="w-[50px] h-[50px] rounded-full bg-primary flex items-center justify-center mx-[14px] -translate-y-2"
        >
          <Icon name="ticket" width={28} height={24.4} />
        </Link>
      </div>

      <IconLink label="검색" link="/search" iconName="search" />
      <Choose value={user}>
        <When value={undefined}>
          <IconLink label="로그인" link="/login" iconName="lock" />
        </When>
        <Otherwise>
          <IconLink label="마이페이지" link="/mypage" iconName="user" />
        </Otherwise>
      </Choose>
    </nav>
  );
}

import { Icon } from '@swifty/assets';
import { COOKIE_KEYS, getCookieValue } from '@swifty/shared-lib';
import { Choose, Otherwise, When } from '@swifty/ui';
import Link from 'next/link';

import IconButton from './icon-button';

export default async function GlobalNavigation() {
  const user = await getCookieValue(COOKIE_KEYS.accessToken);

  return (
    <nav className="fixed bottom-0 left-0 right-0 flex items-center justify-evenly bg-black shadow-[0px_-5px_7px_0px_rgba(0, 0, 0, 0.4)]">
      <IconButton label="홈" link="/" iconName="home" />
      <IconButton label="카테고리" link="/category" iconName="category" />

      <div>
        <Link
          href="/ticket"
          className="w-[50px] h-[50px] rounded-full bg-primary flex items-center justify-center mx-[14px] -translate-y-2"
        >
          <Icon name="ticket" width={28} height={24.4} />
        </Link>
      </div>

      <IconButton label="검색" link="/search" iconName="search" />
      <Choose value={user}>
        <When value={null}>
          <IconButton label="로그인" link="/login" iconName="lock" />
        </When>
        <Otherwise>
          <IconButton label="마이페이지" link="/mypage" iconName="user" />
        </Otherwise>
      </Choose>
    </nav>
  );
}

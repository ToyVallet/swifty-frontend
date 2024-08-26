'use clinet';

import { Icon } from '@swifty/assets';
import { cn, removeAllCookies } from '@swifty/shared-lib';
import { Button } from '@swifty/ui';
import { useRouter } from 'next/navigation';

type NavMenu = {
  title: string;
  href?: string;
  icon: JSX.Element;
};

export default function Sidebar() {
  const navMenu: NavMenu[] = [
    {
      title: '재학인증 관리',
      href: '/',
      icon: <Icon name="host-admin/home" />,
    },
    {
      title: '로그아웃',
      icon: (
        <Icon
          name="host-admin/profile"
          className="fill-black dark:fill-white"
        />
      ),
    },
  ];
  return (
    <div>
      <div className="h-[100px] flex flex-col items-center justify-center bg-white">
        <Icon name="host-admin/swifty-logo-small" width={133} height={44} />
      </div>
      <nav className="h-full w-full py-[14px]">
        <ul className="h-full w-full flex flex-col gap-5">
          {navMenu.map((item) => (
            <NavItem key={item.title} {...item} />
          ))}
        </ul>
      </nav>
    </div>
  );
}

function NavItem({ title, icon, href }: NavMenu) {
  const router = useRouter();
  const onClick = async () => {
    if (href) router.push(href);
    else {
      console.log('logout');
      await removeAllCookies();
    }
  };

  return (
    <li className="h-full w-full">
      <Button onClick={onClick} className="h-full w-full">
        <div
          className={cn(
            'flex items-center justify-center text-18 font-semibold py-[15px] gap-5 w-full',
            href === '/' && 'text-primary border-l-4 border-primary',
          )}
        >
          {icon}
          {title}
        </div>
      </Button>
    </li>
  );
}

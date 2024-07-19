import { Icon } from '@swifty/assets';
import NextLink from 'next/link';

import Header from './header';

type VerificationLink = {
  href: string;
  title: string;
  icon: React.ReactNode;
};

const verificationLinks: ReadonlyArray<VerificationLink> = [
  {
    href: '/verification/student',
    title: '재학생 인증',
    icon: <Icon name="shield" width={70} height={70} />,
  },
  {
    href: '/verification/status',
    title: '재학생 인증 상태',
    icon: <Icon name="runner" width={70} height={70} />,
  },
  {
    href: '/verification/face',
    title: '안면 인증 관리',
    icon: <Icon name="face-id" width={70} height={70} />,
  },
] as const;

export default function VerificationSection() {
  return (
    <section className="w-full">
      <Header>안증 및 등록 관리</Header>
      <div className="w-full flex gap-[10px] h-[118px] items-center justify-center">
        {verificationLinks.map((props) => (
          <Link {...props} />
        ))}
      </div>
    </section>
  );
}

function Link({ href, title, icon }: VerificationLink) {
  return (
    <NextLink
      href={href}
      className="rounded-lg bg-swifty-color-900 flex flex-col gap-[6px] items-center justify-center text-white w-full h-full text-13 font-semibold"
    >
      {icon}
      {title}
    </NextLink>
  );
}

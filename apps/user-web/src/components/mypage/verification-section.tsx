'use client';

import type { UserInfoApi } from '@lib/types';
import type { VerficationAPI } from '@lib/types/certification';
import { openToast } from '@lib/utils';
import { Icon } from '@swifty/assets';
import { getOS, http } from '@swifty/shared-lib';
import { Button } from '@swifty/ui';
import { useRouter } from 'next/navigation';

import Header from './header';

type VerificationLink = {
  href: '/verification/status' | '/verification/student' | '/facepass/start';
  title: string;
  icon: React.ReactNode;
  status?: VerficationAPI['certificationStatus'];
};

type Props = {
  user: UserInfoApi;
  certification: VerficationAPI;
};

export default function VerificationSection({ user, certification }: Props) {
  const certificationStatus = certification.certificationStatus;

  const verificationLinks: ReadonlyArray<VerificationLink> = [
    {
      href: '/verification/student',
      title: '재학생 인증',
      icon: <Icon name="user-web/mypage/shield" width={70} height={70} />,
      status: certificationStatus,
    },
    {
      href: '/verification/status',
      title: '재학생 인증 상태',
      icon: <Icon name="user-web/mypage/runner" width={70} height={70} />,
    },
    {
      href: '/facepass/start',
      title: '안면 인증 관리',
      icon: <Icon name="user-web/mypage/face-id" width={70} height={70} />,
    },
  ] as const;

  return (
    <section className="w-full">
      <Header>인증 및 등록 관리</Header>
      <div className="w-full flex gap-[10px] h-[118px] items-center justify-center">
        {verificationLinks.map((props) => (
          <Link {...props} key={props.title} />
        ))}
      </div>
    </section>
  );
}

function Link({ href, title, icon, status }: VerificationLink) {
  const router = useRouter();

  const onClick = async () => {
    if (href === '/verification/student') {
      if (status === 'APPROVED') {
        openToast('학적 인증이 완료되었습니다.');
      } else if (status === 'PENDING') {
        openToast('학적 인증이 진행 중 입니다.');
      } else {
        router.push(href);
      }
    } else if (href === '/facepass/start') {
      const { result } = await http.get<{ result: boolean }>(
        '/facepass/check/facepass',
      );
      const type = getOS();
      if (result) {
        openToast('이미 안면인식을 등록하였습니다.');
      } else if (type === 'server' || type === 'desktop') {
        openToast('모바일 환경에서만 가능합니다.');
      } else {
        router.push(href);
      }
    } else {
      router.push(href);
    }
  };
  return (
    <div className="rounded-lg bg-swifty-color-200 dark:bg-swifty-color-900 w-full h-full text-13 font-semibold">
      <Button
        onClick={onClick}
        className="flex flex-col gap-[6px] items-center justify-center w-full h-full"
      >
        {icon}
        {title}
      </Button>
    </div>
  );
}

import { BackButton, Link } from '@components/common';
import LogoLink from '@components/common/navigation/logo-link';
import Magnifier from '@icons/magnifier.svg';
import { cn } from '@lib/utils';
import { IoArrowBackOutline } from 'react-icons/io5';

type Props = {
  variant: 'main' | 'back' | 'back-with-logo';
  title?: string;
};

export default function Navigation({ title, variant }: Props) {
  return (
    <nav
      className={cn(
        'z-50 flex w-full justify-between items-center px-5 h-[50px] py-[11px] bg-gradient-header fixed top-0 lg:w-[430px] max-w-[430px]',
      )}
    >
      {variant === 'main' && (
        <>
          <LogoLink />
          <Link href="#" className="w-auto h-auto flex items-center">
            <Magnifier className="scale-90" fill="white" />
          </Link>
        </>
      )}

      {(variant === 'back' || variant === 'back-with-logo') && (
        <BackButton className="text-white font-bold text-base flex items-center gap-0.5">
          <IoArrowBackOutline size={25} className="text-white" />
          {title}
        </BackButton>
      )}
      {variant === 'back-with-logo' && (
        <LogoLink className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      )}
    </nav>
  );
}

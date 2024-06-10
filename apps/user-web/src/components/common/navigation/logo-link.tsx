import { Link } from '@components/common';
import Logo from '@icons/logo.svg';
import { cn } from '@swifty/shared-lib';

interface Prop {
  className?: string;
}

export default function LogoLink({ className }: Prop) {
  return (
    <Link href="/" className={cn('w-auto h-auto items-center', className)}>
      <Logo />
    </Link>
  );
}

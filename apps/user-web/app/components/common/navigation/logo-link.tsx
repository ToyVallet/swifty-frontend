import { Link } from '@/app/components/common/';
import { cn } from '@/app/lib/utils';
import Logo from '@icons/logo.svg';

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

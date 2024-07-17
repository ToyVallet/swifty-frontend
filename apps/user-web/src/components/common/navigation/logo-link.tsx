import Logo from '@icons/logo.svg';
import Link from 'next/link';

export default function LogoLink() {
  return (
    <Link href="/" className="w-auto h-auto items-center">
      <Logo />
    </Link>
  );
}

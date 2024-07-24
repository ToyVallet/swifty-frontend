import { Icon } from '@swifty/assets';
import Link from 'next/link';

export default function LogoLink() {
  return (
    <Link href="/" className="w-auto h-auto items-center">
      <Icon
        name="swifty-full-logo"
        width={121}
        height={28}
        className="fill-white"
      />
    </Link>
  );
}

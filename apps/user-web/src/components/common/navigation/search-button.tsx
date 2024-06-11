import Magnifier from '@icons/magnifier.svg';

import Link from '../link';

export default function SearchButton() {
  return (
    <Link href="/search" className="flex items-center justify-end">
      <Magnifier size={25} color="white" className="fill-white" />
    </Link>
  );
}

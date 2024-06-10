import Magnifier from '@icons/magnifier.svg';

import Link from '../link';

export default function SearchButton() {
  return (
    <Link
      href="/search"
      className="text-white font-bold text-base flex items-center gap-0.5"
    >
      <Magnifier />
    </Link>
  );
}
